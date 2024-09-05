import EncryptedStorage from 'react-native-encrypted-storage';

class StorageManager {

    static async storeItem(key, value) {
        try {
            await EncryptedStorage.setItem(
                key, 
                value
            );
            
            console.log(`Stored ${key} in StorageManager`);
        } catch (error) {
            console.error(`Error setting ${key} in StorageManager:`, error);
            throw error;
        }
    }

    static async getItem(key) {
        try {
            const item = await EncryptedStorage.getItem(key);
            if (item != undefined || item != null) {
                console.log(`Got ${key} from StorageManager: ${item}`);
                return item
            }

        } catch (error) {
            console.error(`Error getting ${key} from StorageManager:`, error);
            throw error;
        }
    }


    static async removeItem(key) {
        try {
            await EncryptedStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing ${key} from StorageManager:`, error);
            throw error;
        }
    }


    static async clearStorage() {
        try {
            await EncryptedStorage.clear();
        } catch (error) {
            console.error('Error clearing storage:', error);
            throw error;
        }
    }

}

export default StorageManager;