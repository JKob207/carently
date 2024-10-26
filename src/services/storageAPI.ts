import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { User } from '../types';

import { storage } from './firebase-config';
import { updateUser } from './userData';

export const getImage = async (fileName: string) => {
    try {
        const imageRef = ref(storage, fileName);
        return await getDownloadURL(imageRef);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const uploadImage = async (image: File | undefined, user: User) => {
    if(!image) return '';
    const imageName = `${image.name}_${user.uid}`;
    const imageRef = ref(storage, `avatars/${imageName}`);
    try {
        await uploadBytes(imageRef, image);
        await updateUser(user.uid, {
            ...user,
            avatar: imageName
        });
        return imageName;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAvatar = async (fileName: string) => {
    if(fileName == 'https://placehold.co/150') return fileName;
    try {
        const imageRef = ref(storage, `avatars/${fileName}`);
        return await getDownloadURL(imageRef);
    } catch (error) {
        console.log(error);
        throw error;
    }
};