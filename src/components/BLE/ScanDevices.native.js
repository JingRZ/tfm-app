import React, { useRef, useEffect, useState, useCallback } from 'react';
import { View, Text, Platform, PermissionsAndroid } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { useFocusEffect } from '@react-navigation/native';
import CONFIG from '../../utils/constants';
import BLEService from '../../services/BLEService';
import LogService from '../../services/LogService';

const manager = new BleManager();

const requestBluetoothPermissions = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            ]);

            if (
                granted['android.permission.ACCESS_FINE_LOCATION'] !== PermissionsAndroid.RESULTS.GRANTED ||
                (Platform.Version >= 31 && granted['android.permission.BLUETOOTH_CONNECT'] !== PermissionsAndroid.RESULTS.GRANTED) ||
                (Platform.Version >= 31 && granted['android.permission.BLUETOOTH_SCAN'] !== PermissionsAndroid.RESULTS.GRANTED)
            ) {
                Alert.alert(
                    'Permission Required',
                    'Bluetooth permissions are required for this app to function correctly.'
                );
            } else {
                console.log('Bluetooth permissions granted');
            }
        } catch (err) {
            console.warn(err);
        }
    }
};

const handleDeviceUpdate = async (setDevices, device, setAdv) => {
    
    const registerDevice = async () => {
        BLEService.getServicesAndCharacteristics(manager, device, setAdv)
        setDevices(prevDevices => [
            ...prevDevices,
            { id: device.id, name: device.name, rssiValues: [device.rssi], lastSeen: now }
        ]);
    }

    const now = Date.now();
    setDevices(prevDevices => {
        const deviceIndex = prevDevices.findIndex(d => d.id === device.id);
        if (deviceIndex === -1) {
            // New device, we need to fetch services and characteristics
           registerDevice();

        } else {
            // Device found, update the existing device in the list
            const updatedDevices = [...prevDevices];
            const updatedDevice = { ...updatedDevices[deviceIndex] };
            updatedDevice.rssiValues.push(device.rssi);
            updatedDevice.lastSeen = now;
            updatedDevices[deviceIndex] = updatedDevice;
            return updatedDevices;
        }
        return prevDevices;
    });
};

const ScanDevices = ({onDevicesRefresh}) => {

    const [devices, setDevices] = useState([]);
    const [data, setData] = useState([]);
    const [adv, setAdv] = useState([]);

    const devicesRef = useRef(devices);
    const scanningRef = useRef(false);

    useEffect(() => {
        console.log("Requesting permissions...");
        requestBluetoothPermissions();
    }, []);

    useEffect(() => {
        console.log("Adv: ", adv);
    }, [adv]);
    
    useEffect(() => {
        devicesRef.current = devices;
        onDevicesRefresh({dev:devices, dat:data, ads:adv});
    }, [devices]);

    const TAG = "ScanDevices";

    const namePrefix = 'ESP32';
    const deviceTimeout = 10000; // 10 seconds

    useFocusEffect(
        useCallback(() => {
            let n_retry = 0;
            
            const startScanning = async () => {
                if(scanningRef.current) {
                    LogService.log(TAG, "Already scanning");
                    return;
                }
                const permission = await BLEService.requestPermissions();
                if (!permission) return;
            
                LogService.log(TAG, "Scanning...");
                scanningRef.current = true;
                manager.startDeviceScan(null, null, (error, device) => {
                    if(error) {
                        LogService.error(TAG, "startDeviceScan" + JSON.stringify(error));
                        scanningRef.current = false;
                        n_retry++;
                        if(n_retry < CONFIG.BLE_RETRY){
                            startScanning();
                        }
                        return;
                    }
            
                    if(device && device.name && device.name.startsWith(namePrefix)){
                        handleDeviceUpdate(setDevices, device, setAdv);
                    }
                });
                
            };

            startScanning();

            const intervalId = setInterval(async() => {
                let now = new Date();
                //Timeout filter
                const timeoutFilter = devicesRef.current.filter(device => now - device.lastSeen < deviceTimeout);
                setDevices(timeoutFilter);
                const res = await BLEService.whereami(devicesRef.current);
                if(!res)
                    return;
                
                const { updatedDevices, data2send } = res;
                
                setData(data2send);
                setDevices(updatedDevices);

            }, 5000); 

            return () => {
                scanningRef.current = false;
                manager.stopDeviceScan();
                clearInterval(intervalId);
            }

        }, [manager])
    );
}


export default ScanDevices;
