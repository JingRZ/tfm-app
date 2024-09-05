import {PermissionsAndroid, Platform} from 'react-native';
import LogService from './LogService';

const serviceUUID = "693837a4-ed0d-4334-a94b-3a900c68f4b5";
const characteristicUUID = "d03d7aeb-2f3c-4bd0-9900-76654310bde5";

const TAG = "BLEService";

const distances = (rssi) => {
    if(rssi > -50)
        return 'C'; //Close
    if(rssi > -60)
        return 'M'; //Medium
    if(rssi > -80)
        return 'F'; //Far

    return 'U'; //Unknown
}

const requestPermissions = async () => {
    let granted = false;
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.requestMultiple(
        [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT]);

        granted = result['android.permission.ACCESS_FINE_LOCATION'] 
                            && result['android.permission.BLUETOOTH_SCAN'] 
                            === PermissionsAndroid.RESULTS.GRANTED;
    }
    return granted;
};


const getServicesAndCharacteristics = async (manager, device, setAdv) => {
    console.log("Connecting to device...");
    manager.connectToDevice(device.id)
    .then(dev => {
        dev.discoverAllServicesAndCharacteristics()
        .then(dev => {
            console.log("Services and characteristics discovered!");
            dev.readCharacteristicForService(serviceUUID, characteristicUUID)
            .then(characteristic => {
                characteristic.read().then(char => {
                    const value = char.value;
                    //Viene en base64, asi que hay que decodificarlo
                    //https://github.com/auth0/jwt-decode/issues/241
                    //Añadido global.atob = decode; en App.js para que esta función esté disponible
                    const buffer = atob(value);
                    console.log("Decoded Byte Array:", buffer);
                    setAdv(prevAdv => [...prevAdv, { id: device.id, adv: buffer }]);
                    manager.cancelDeviceConnection(device.id)
                    .then(() => {
                        console.log("Disconnected from device");
                    })
                })
            })
        })
        
    }).catch(error => {
        console.error(JSON.stringify(error));
    });
}


const whereami = async (devices) => {
    if (devices.length > 0) {
        let data2send = [];
        let updatedDevices = [];

        for(let i = 0; i < devices.length; i++) {
            const { lastSeen, rssiValues, ...rest } = devices[i];
            if(rssiValues){
                
                const last10rssi = rssiValues.slice(-20);
                const rssi_mean = Math.round(last10rssi.reduce((acc, val) => acc + val, 0) / last10rssi.length);
                const diferenciasCuadradas = last10rssi.map(x => Math.pow(x - rssi_mean, 2));
                const varianza = diferenciasCuadradas.reduce((acc, val) => acc + val, 0) / last10rssi.length;
                const rssi_std = Math.sqrt(varianza);

                const rssi_filtrado = last10rssi.filter(rssi => rssi >= (rssi_mean - 2 * rssi_std));
                const rssi_p = Math.round(rssi_filtrado.reduce((acc, val) => acc + val, 0) / rssi_filtrado.length);

                //Apply kalman filter
                const rssi_cali = -70; // Adjjst this value to calibrate the distance

                let dist;
                if (rssi_p > rssi_cali) {
                    dist = Math.abs((rssi_p / rssi_cali) * 10 - 5);
                } else {
                    dist = (rssi_p / rssi_cali) * (0.9 * 7.71);
                }

                dist = Math.round(dist * 10) / 10;

                let distAprox = distances(rssi_p);
                LogService.log(TAG, "Device: " + rest.id + " RSSI: " + rssi_p + " Distance: " + dist);
                if(distAprox === 'U') continue;
                data2send.push({ id:rest.id, dist });
                updatedDevices.push({
                    ...rest,
                    lastSeen,
                    rssiValues: []
                });
            }
        }
        LogService.log(TAG, "-------------------------------------");

        return { updatedDevices, data2send };
    }
};


const BLEService = {
    requestPermissions,
    getServicesAndCharacteristics,
    whereami
};


export default BLEService;