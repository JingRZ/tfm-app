import { useCallback, useContext, useEffect, useRef } from 'react';
import nfcClient from '../../utils/nfcClient';
import { ActionsContext } from "../../context/NFCContext";

const checkGameIdIsPresent = (code, jsonArray) => {
    if (jsonArray === undefined) {
        console.error(code, 'No jsonArray found');
        return false;
    }
    return jsonArray.find(item => item.gameid === code);
};

const ScanNative = ({props}) => {
    const { navigation, cardValue } = props;
    const { cardCode, step } = cardValue;
    const started = useRef(false);
    const { setScanStateText, setErrTxt, setTagDetails, setScanInProgress } = useContext(ActionsContext);

    const startScan = useCallback(async() => {
        const nfc = new nfcClient(navigation);

        if (started.current){
            //nfc.stop();
            return;
        }

        setScanStateText("Put the tag near the phone to scan it")
        started.current = true;
        const res = await nfc.readNdef();
        if(res){
            const {jsonArray} = res;
            const found = checkGameIdIsPresent(cardCode, jsonArray);
            if (found) {
                if(step === found.step){
                    const step = found.step;
                    const gameid = found.gameid;
                    setTagDetails({gameid, step})
                    setErrTxt(null);
                }
                else{
                    setErrTxt("This tag doesn't belong to this step");
                }
            }
            else{
                setErrTxt("This tag doesn't belong to this game");
            }
        } 
        setScanStateText("Press to scan a tag"); 
        setScanInProgress(false);
    }, [setScanInProgress]);

    useEffect(() => {
        startScan();
    }, [startScan]);

};

export default ScanNative;