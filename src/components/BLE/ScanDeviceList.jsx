import { View, Text, FlatList, StyleSheet, Linking, TouchableHighlight } from 'react-native';
import { useState } from 'react';
import ScanDevices from './ScanDevices.native';
import CardImage from '../CardGame/CardImage';
import useAd from '../../hooks/useAd';
import StyledText from '../StyledText';
import Toast from "react-native-toast-message";


const ScanDeviceCard = ({deviceId, adv}) => {
    const aux = adv.find(obj => obj.id === deviceId);
    if(!aux){
        return <Text>Loading...</Text>
    }
    const adCode = aux.adv;
    const {ad, loading} = useAd(adCode);

    if(loading || !ad){ 
        return <Text>Loading...</Text>
    }

    const openLink = (url) => {
        console.log(url);

        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
                Toast.show({
                    type: 'error',
                    text1: 'Unable to open this link!',
                    text2: url,
                });
            }
        });
    }

    return (
        <TouchableHighlight 
            style={styles.cardContainer}
            underlayColor="#E5E5E5" 
            onPress={() => openLink(ad.url)}>
            <>
            <CardImage style={styles.adImage} img={ad.image} />
            <View style={styles.adCard}>
                <StyledText style={styles.tag} fontSize='subsubheading' fontWeight='light'>{ad.tag}</StyledText>
                <StyledText style={styles.adTitle} fontSize='heading'>{ad.title}</StyledText>
                <StyledText fontSize='subsubheading'>{ad.location}</StyledText>
            </View>
            </>
        </TouchableHighlight>
    );
}

const ScanDeviceList = () => {
    const [devices, setDevices] = useState([]);
    const [aux, setData] = useState([]);
    const [adv, setAdv] = useState([]);

    const TAG = "ScanDeviceList";

    const onDevicesRefresh = ({dev, dat, ads}) => {
        setDevices(dev);
        setData(dat);
        setAdv(ads);
    };

    return (
        <View style={styles.container}>
            <ScanDevices onDevicesRefresh={onDevicesRefresh} />
             <FlatList
                data={aux}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ScanDeviceCard deviceId={item.id} adv={adv}/>
                )}
            />
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 5,
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
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        paddingVertical: 10,
    },
    adImage: {
        flex: 2,
        borderRadius: 10,
        marginStart: 10,
    },
    adCard: {
        flex: 3,
        marginLeft: 10,
        marginRight: 20,
        height: 150,
        width: 160,
    },
    tag: {
        color: '#747474',
    },
    adTitle: {
        marginVertical: 5,
    }

});

export default ScanDeviceList;