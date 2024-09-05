import React from 'react';
import { View, Text, FlatList, StyleSheet} from 'react-native';
import { useState } from 'react';
import LocationForm from '../components/BLE/LocationForm';
import useRoute from '../hooks/useRoute';
import useRouteInstr from '../hooks/useRouteInstr';
import CurrentLocationForm from '../components/BLE/CurrentLocationForm';

const BLENavigationView = () => {
    const [destination, setDestination] = useState('');
    const { fetchData, route, loading, error } = useRoute();
    const {fetchInstr, instr, instrLoading, instrError} = useRouteInstr();

    const onSubmit = ({start, end}) => {
        console.log('onSubmit', start, end);
        setDestination(end);
        fetchData(start, end);
    }

    onCurrentSubmit = ({start}) => {
        const end = destination;
        console.log('onCurrentSubmit', start, end);
        fetchInstr(start, end);
    }

    return (
        <View style={styles.container}>
            {loading && <Text>Loading...</Text>}
            {error && <Text>Error: {error.message}</Text>}
            <LocationForm onSubmit={onSubmit}/>
            <CurrentLocationForm onSubmit={onCurrentSubmit}/>
            {instr && (
                <View style={styles.resultsContainer}>
                    <Text>{instr}</Text>
                </View>
            )}
            {route && (
                <View style={styles.resultsContainer}>
                    <FlatList
                        data={route}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.routeItem}>
                                <Text>{item}</Text>
                            </View>
                        )}
                    />
                </View>
            )}
        </View>
    );
}

/*
<Text>Discovered devices:</Text>
            <FlatList
                data={devices}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                <View style={styles.deviceContainer}>
                    <Text style={styles.deviceName}>{item.name}</Text>
                    <Text style={styles.deviceRssi}>RSSI: {item.rssiValues[item.rssiValues.length - 1]}</Text>
                </View>
                )}
            />
*/

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
    },
    deviceContainer: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    deviceName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    deviceRssi: {
      fontSize: 16,
      color: '#555',
    },
});
  

export default BLENavigationView;
