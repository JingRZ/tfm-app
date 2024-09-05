
class StorageManager {

    static async storeItem(key, value) {
        try {
            localStorage.setItem(
                key, 
                value
            );
        } catch (error) {
            console.error(`Error setting ${key} in StorageManager:`, error);
            throw error;
        }
    }

    static async getItem(key) {
        try {
            const item = localStorage.getItem(key);
            if (item !== undefined) {
                return item
            }

        } catch (error) {
            console.error(`Error getting ${key} from StorageManager:`, error);
            throw error;
        }
    }


    static async removeItem(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing ${key} from StorageManager:`, error);
            throw error;
        }
    }


    static async clearStorage() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing storage:', error);
            throw error;
        }
    }

}

export default StorageManager;