import { Text, View, TouchableOpacity, StyleSheet, Platform, Image, Vibration } from "react-native";
import { useState, useEffect } from 'react';
import Icon from "react-native-vector-icons/FontAwesome";
import { ActionsContext } from "../../context/NFCContext.js";
import Scan from "./NFCScanner.web.js";
import ScanNative from "./NFCScanner.native.js";
import StyledButton from "../StyledButton.jsx";
import StyledText from "../StyledText.jsx";
import Toast from "react-native-toast-message";

const NFCView = ({ route, navigation }) => {
    const {cardCode, step} = route.params;
    const [scanStateText, setScanStateText] = useState("Press to Scan");
    const [errTxt, setErrTxt] = useState(null);
    const [tagDetails, setTagDetails] = useState(null);
    const [scanInProgress, setScanInProgress] = useState(false);
    //const [scanCallback, setScanCallback] = useState(null);

    const actions = {setScanStateText, setErrTxt, setTagDetails, setScanInProgress };
    const cardValue = {cardCode, step};

    const onScanPress = async() => {
        setScanInProgress(!scanInProgress);
        Vibration.vibrate(100);
        console.log("scanInProgress");
    }

    // Timer to clear the error message
    useEffect(() => {
        if (errTxt) {
            Toast.show({
                type: 'error',
                text1: 'Not this one!',
                text2: errTxt,
                onHide: () => setErrTxt(null),
            });
        }
    }, [errTxt]);


    useEffect(() => {
        return () => {
            // This gets executed whhen the component is unmounted
            console.log("Unmounting NFCView");
        }
    }, []);

    const NFCIcon = () => {
        if (scanInProgress){
            return <Image source={require('../../img/nfcActive.png')} style={styles.nfcIcon} />
        }
        return <Image source={require('../../img/nfcInactive.png')} style={styles.nfcIcon} />
    }

    const onQuestPress = () => {
        navigation.navigate('QuestView', { tagDetails });
        setTagDetails(null);
    }

    if(Platform.OS === 'web'){
        return (
            <View style={styles.wrapper}>
                <TouchableOpacity onPress={onScanPress} style={styles.iconContainer}>
                    <Icon name="qrcode" size={100} color="#000" />
                    <Text>{scanStateText}</Text>
                </TouchableOpacity>

                <ActionsContext.Provider value={actionsValue}>
                    {scanInProgress && <Scan props={{navigation, route, cardValue}}/>}
                </ActionsContext.Provider>
            </View>
        )

    } else {
        return (
            <View style={styles.wrapper}>
                <TouchableOpacity onPress={onScanPress} style={styles.iconContainer} >
                    <NFCIcon />
                    <Text>{scanStateText}</Text>
                </TouchableOpacity>
                <View style={styles.btnContainer}>
                    { tagDetails && 
                        <StyledButton onPress={onQuestPress} style={styles.btn} navigation={navigation} align='center'  fontSize='heading'>
                            <StyledText>See Quest</StyledText>
                        </StyledButton>
                    }
                </View>
                <ActionsContext.Provider value={actions}>
                    {scanInProgress && <ScanNative props={{navigation, cardValue}}/>}
                </ActionsContext.Provider>

                <Toast swipeable={true} />
            </View>
        )
    }

}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'space-around',
        alignContent: 'center',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 150,
        flex: 2
    },
    btnContainer: {
        flex: 1,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        borderRadius: 10,
        height: 50,
        backgroundColor: '#F28F2B',
    },
    nfcIcon: {
        height: 80,
        resizeMode: 'contain',
    },
  });
  

export default NFCView;