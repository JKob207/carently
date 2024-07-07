import { getDownloadURL, ref } from 'firebase/storage';

import { storage } from './firebase-config';

export const getImage = async (fileName: string) => {
    try {
        const imageRef = ref(storage, fileName);
        return await getDownloadURL(imageRef);
    } catch (error) {
        console.error(error);
        throw error;
    }
};