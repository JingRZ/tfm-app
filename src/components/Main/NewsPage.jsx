import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import StyledText from '../StyledText';
import { useHeaderHeight } from '@react-navigation/elements';
import ScanDeviceList from '../BLE/ScanDeviceList';
import Toast from "react-native-toast-message";


const NewsPageHeader = () => {
    return (
        <View style={styles.header}>
            <Image source={require('../../img/news_icon.png')} style={styles.pageIcon} />
            <View>
                <StyledText fontSize='heading' fontWeight='bold'>> Tablón</StyledText>
                <StyledText fontSize='heading'>de</StyledText>
                <StyledText fontSize='heading'>noticias</StyledText>
            </View>
        
        </View>
    )
}

const NewsPageBody = () => {
    return (
        <View style={styles.bodyContainer}>
            <View style={styles.bodyTop}>
                <Image style={styles.tornillos} source={require('../../img/tornillo.png')} />
                <Image style={styles.tornillos} source={require('../../img/tornillo.png')} />
            </View>
            <ScanDeviceList />
        </View>
    )
}

const NewsPage = () => {
    return (
        <View style={[styles.container, {paddingTop: useHeaderHeight() - 20}]}>
            <NewsPageHeader />
            <NewsPageBody />
            <Toast swipeable={true} />

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
        backgroundColor : '#E0E8EC',
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
        
    }
});

export default NewsPage;