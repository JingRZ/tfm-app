import React, { useState } from 'react';
import { Text } from 'react-native';
import StyledButton from '../StyledButton';

const ScanDevices = () => {
  const [devices, setDevices] = useState([]);

  const scanForDevices = async () => {
/*
    const isBluetoothAvailable = await navigator.bluetooth.getAvailability();
    if (!isBluetoothAvailable) {
        alert('Bluetooth is not available');
        return;
    }
*/
    try {
        const options = {
            acceptAllDevices: true,
            //optionalServices: ['battery_service'],
            //filters : [{
            //    namePrefix: 'ESP32'
            //}]
        };
        console.log('Scanning...');

        //const devices = await navigator.bluetooth.getDevices();
        const device = await navigator.bluetooth.requestDevice(options);


        // Process and filter devices based on your group ID logic here
        // For example, you can use device.name, device.id, or advertised services

        setDevices((...prevDevices) => [...prevDevices, device]);

    } catch (error) {
        alert('Error scanning for devices:', error);
        console.error('Error scanning for devices:', error);
    }
  };
  /*
   <ul>
            {devices.map((device, index) => (
            <li key={index}>{device.name || device.id}</li>
            ))}
        </ul>
        */

  return (
    <>
        <StyledButton onPress={scanForDevices}>
            <Text>Scan for devices</Text>
        </StyledButton>
        <Text>Discovered devices:</Text>
       
    </>
  );
}

export default ScanDevices;
