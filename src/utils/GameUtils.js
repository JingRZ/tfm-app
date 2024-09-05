import { Platform } from 'react-native';

const StorageManager = Platform.select({
    web: () => require('./StorageManager.web').default,
    default: () => require('./StorageManager.native').default,
})();


const fetchProgress = async (cardCode, step) => {
    let progress = await StorageManager.getItem(cardCode);
    console.log("[BottomTabs]", cardCode, step, progress);

    if (!progress) {
        const initialProgress = { step: 1, finish: false };
        console.warn("Storing initial progress: ", JSON.stringify(initialProgress));
        await StorageManager.storeItem(cardCode, JSON.stringify(initialProgress));
        progress = initialProgress;
    } else {
        progress = JSON.parse(progress);

        if (progress.step < step) {
            progress.step = step;
            console.log("Storing updated progress: ", JSON.stringify(progress));
            await StorageManager.storeItem(cardCode, JSON.stringify(progress));
        }
    }
    return progress;
};


const resetProgress = async (cardCode) => {
    const initialProgress = { step: 1, finish: false };
    await StorageManager.storeItem(cardCode, JSON.stringify(initialProgress));
}

export default {fetchProgress, resetProgress};