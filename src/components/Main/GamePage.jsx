import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import StyledText from '../StyledText';
import CardList from '../CardGame/CardList';
import { useHeaderHeight } from '@react-navigation/elements';

const GamePageHeader = () => {
    return (
        <View style={styles.header}>
            <Image source={require('../../img/adventure_icon.png')} style={styles.pageIcon} />
            <View>
                <StyledText fontSize='heading' fontWeight='bold'> > Caza</StyledText>
                <StyledText fontSize='heading'>del</StyledText>
                <StyledText fontSize='heading'>tesoro</StyledText>
            </View>
        
        </View>
    )
}



const GamePage = ({navigation}) => {

    const GamePageBody = () => {
        return (
            <View style={styles.bodyContainer}>
                <View style={styles.bodyTop}>
                    <Image style={styles.tornillos} source={require('../../img/tornillo.png')} />
                    <Image style={styles.tornillos} source={require('../../img/tornillo.png')} />
                </View>
                <CardList navigation={navigation}/>
            </View>
        )
    }

    return (
        <View style={[styles.container, {paddingTop: useHeaderHeight() - 20}]}>
            <GamePageHeader />
            <GamePageBody />
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
        backgroundColor : '#FFEBD3',
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

export default GamePage;