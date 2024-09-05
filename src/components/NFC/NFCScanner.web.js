import React, { useCallback, useContext, useEffect, useState, useRef } from 'react';
import { ActionsContext } from '../../context/NFCContext.js';
import { Alert, Text, View, StyleSheet } from 'react-native';
import StyledButton from '../StyledButton.jsx';
import StyledText from '../StyledText.jsx';

const checkGameIdIsPresent = (code, jsonArray) => {
    if (jsonArray === undefined) {
        console.error(code, 'No jsonArray found');
        return false;
    }
    return jsonArray.find(item => item.gameid === code);
};


const Scan = ({props}) => {
    const { navigation, cardValue } = props;
    const { cardCode, step } = cardValue;
    const { setActions, setScanStateText } = useContext(ActionsContext);

    const [belongErr, setBelongErr] = useState("");
    const [tagDetails, setTagDetails] = useState(null);
    const stepRef = useRef(step);

    useEffect(() => {
        stepRef.current = step;
    }, [step]);

    useEffect(() => {
        let timer;
        if (belongErr) {
        timer = setTimeout(() => {
            setBelongErr(null);
        }, 5000);
        }
        return () => clearTimeout(timer);
    }, [belongErr]);

    const scan = useCallback(async() => {

        if ('NDEFReader' in window) { 
            try {
                const ndef = new window.NDEFReader();
                await ndef.scan();
                
                ndef.onreadingerror = () => {
                    console.log("Cannot read data from the NFC tag. Try another one?");
                };
                
                ndef.onreading = event => {
                    console.log("NDEF message read.");
                    onReading(event);
                    setActions({
                        scan: 'scanned',
                        write: null
                    });
                };

            } catch(error){
                console.log(`Error! Scan failed to start: ${error}.`);
            };
        }
        else{
            Alert.alert('Error', 'NDEFReader not supported.');
        }
    },[setActions]);

    const onReading = ({message}) => {

        for (const record of message.records) {
            switch (record.recordType) {
                case "text":
                    const textDecoder = new TextDecoder(record.encoding);
                    const data = JSON.parse(textDecoder.decode(record.data));
                    const found = checkGameIdIsPresent(cardCode, data);
                    if (found) {
                        if(stepRef.current === found.step){
                            const st = found.step;
                            const gid = found.gameid;
                            setTagDetails({gameid:gid, step:st})
                            setBelongErr(null);
                        }
                        else{
                            setBelongErr("This tag is not the one you are curently looking for");
                        }
                    }
                    else{
                        setBelongErr("This tag doesn't belong to this game");
                        setTagDetails(null);
                    }
                    setScanStateText("Press to scan a tag"); 
                    break;
                default:
                    // TODO: Handle other records with record data.
                }
        }
    };

    useEffect(() => {
        scan();
    }, [scan]);

    const onPress = () => {
        navigation.navigate('QuestView', { tagDetails });
        setTagDetails(null);
    }

    return(
        <View>
            { belongErr && <StyledText>{belongErr}</StyledText> }
            { tagDetails && 
                <StyledButton onPress={onPress} style={styles.btn} navigation={navigation} align='center' fontSize='heading'>
                    <Text>To QuestView</Text>
                </StyledButton>
            }
        </View>
    );
};


const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: 'space-around',
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#F28F2B',
    },
  });

export default Scan;