//Put here the NFC related functions in GameStart
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import { Alert } from 'react-native';


class nfcClient {
    static instance = null;
    static started = false;

    constructor(navigation) {
        if (nfcClient.instance) {
            return nfcClient.instance;
        }
        nfcClient.instance = this;
        // Pre-step, call this before any NFC operations
        NfcManager.start();
        this.nav = navigation;
        this.checkNFCEnabled();
        nfcClient.started = true;
    }

    bytesToString(arr) {
        const charList = arr.map(elem => String.fromCharCode(elem));
        return charList.join('');
    }

    async checkNFCEnabled() {
        try {
            const enabled = await NfcManager.isEnabled();
            if (!enabled) {
                this.showNFCAlert();
            }
        } catch (error) {
            console.error('Error al verificar NFC:', error);
        }
    }

    showNFCAlert() {
        Alert.alert(
            'NFC desactivado',
            'Necesitas activar el NFC. Thats the whole point of this app. ¿Deseas ir a la configuración para activarlo?',
            [
            {
                text: 'Cancelar',
                style: 'cancel',
                onPress: () => this.nav.goBack()
            },
            {
                text: 'Ir a configuración',
                onPress: () => NfcManager.goToNfcSetting()
            }
            ],
            { cancelable: false }
        );
    };

    async readNdef() {
        try {
            //if(!nfcClient.started){
                await NfcManager.requestTechnology(NfcTech.Ndef);
            //}
            const tag = await NfcManager.getTag();
            const tagContent = this.bytesToString(tag.ndefMessage[0].payload).substring(3)
            const jsonArray = JSON.parse(tagContent);
            console.log(jsonArray)
            return {jsonArray};

        } catch (ex) {
            console.warn('Oops!', ex);
        } finally {
            // stop the nfc scanning
            NfcManager.cancelTechnologyRequest();
        }
    }

    async stop() {
        try {
            await NfcManager.cancelTechnologyRequest();
            nfcClient.started = false;

        } catch (ex) {
            console.warn('Oops!', ex);
        }
    }
}

export default nfcClient;