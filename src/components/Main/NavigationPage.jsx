import React, { useEffect } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import StyledText from '../StyledText';
import { useState } from 'react';
import { useHeaderHeight } from '@react-navigation/elements';
import { Dropdown } from 'react-native-element-dropdown';
import StyledButton from '../StyledButton';
import useRoute from '../../hooks/useRoute';
import useLocation from '../../hooks/useLocation';
import ScanDevices from '../BLE/ScanDevices.native';

const NavigationPageHeader = () => {

    return (
        <View style={styles.header}>
            <Image source={require('../../img/navigation_icon.png')} style={styles.pageIcon} />
            <View>
                <StyledText fontSize='heading' fontWeight='bold'>> Ya</StyledText>
                <StyledText fontSize='heading'>me</StyledText>
                <StyledText fontSize='heading'>perdí</StyledText>
            </View>
        
        </View>
    )
}


const places = [
    {label: 'Biblioteca', code: 'BIB'},
    {label: 'Aula 1', code: 'A1'},
    {label: 'Aula 2', code: 'A2'},
    {label: 'Aula 3', code: 'A3'},
    {label: 'Aula 4', code: 'A4'},
    {label: 'Aula 5', code: 'A5'},  
    {label: 'Cafetería', code: 'CFT'},
    {label: 'Ascensores', code: 'ASC1'},
    {label: 'Secretaría', code: 'SEC'},
    {label: 'Entrada Principal', code: 'EXT3'},
    {label: 'Entrada 2', code: 'EXT4'},
    {label: 'Entrada 3', code: 'EXT1'},
    {label: 'Entrada 4', code: 'EXT2'},
    {label: 'Hall', code: 'H2'},
];

const NavigationPageBody = ({location}) => {
    const [fromVal, setFromVal] = useState(null);
    const [toVal, setToVal] = useState(null);
    const [userErr, setUserErr] = useState(null);
    const { fetchData, route, loading, error } = useRoute();

    useEffect(() => {
        setFromVal(location);
    }, [location]);


    const onSearch = () => {
        if (!fromVal || !toVal) {
            setUserErr('Por favor, seleccione un lugar de origen y destino');
            return;
        }
        if(fromVal == toVal) {
            setUserErr('Quieres ir de un lugar a sí mismo?');
            return;
        }
        setUserErr(null);

        fetchData(fromVal, toVal);
    }


    return (
        <View style={styles.bodyContainer}>
            <View style={styles.bodyTop}>
                <Image style={styles.tornillos} source={require('../../img/tornillo.png')} />
                <Image style={styles.tornillos} source={require('../../img/tornillo.png')} />
            </View>
            <View style={styles.bodyContent}>

                <Dropdown
                    style={styles.dropdown}
                    search
                    label='Desde'
                    data={places}
                    value={fromVal}
                    labelField='label'
                    valueField='code'
                    placeholder="Desde"
                    onChange={item => {
                        setFromVal(item.code)
                    }}
                />

                <Dropdown
                    style={styles.dropdown}
                    search
                    label='Hasta'
                    data={places}
                    value={toVal}
                    labelField='label'
                    valueField='code'
                    placeholder="Hasta"
                    onChange={item => {
                        setToVal(item.code)
                    }}
                />
                <View >
                    {userErr && <Text style={styles.errText}>{userErr}</Text>}
                    {loading && <Text>Cargando...</Text>}
                    {error && <Text style={styles.errText}>Error: {error.message}</Text>}
                </View>
                

                <StyledButton style={styles.searchBtn} onPress={onSearch}>
                    <StyledText fontSize='subsubheading'>Calcular Ruta</StyledText>
                </StyledButton>

                <View>
                    {route && route.map((r, index) => (
                        <Text key={index}>Paso {index+1}: {r}</Text>
                    ))}
                </View>
            </View> 
            
        </View>
    )
}

const NavigationPage = () => {
    const { fetchLocation, location, loading, error } = useLocation();

    const onDevicesRefresh = ({dat}) => {
        console.log("dat: ", dat);
        if(dat.length > 0)
            fetchLocation(dat);
    };

    return (
        <View style={[styles.container, {paddingTop: useHeaderHeight() - 20}]}>
            <ScanDevices onDevicesRefresh={onDevicesRefresh} />

            <NavigationPageHeader />
            <NavigationPageBody location={location}/>
        </View>

    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor : '#FFE1CC',
    },
    pageIcon: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
    },
    bodyContainer: {
        flex: 4,
        width: '100%',
        marginHorizontal: 20,
        paddingTop: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: '#FFFBF6'
    },
    bodyTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tornillos: {
        height: 20,
        width: 20,
        marginHorizontal: 20,
        marginBottom: 10,
    },
    bodyContent: {
        marginHorizontal: 16,

    },
    dropdown: {
        marginVertical: 16,
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 10,
    },
    searchBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        marginVertical: 20,
        borderRadius: 10,
        backgroundColor: '#F28F2B',
    },
    errText: {
        color: 'red',
    }
});

export default NavigationPage;