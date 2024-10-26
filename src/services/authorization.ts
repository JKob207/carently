import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut,UserCredential } from 'firebase/auth';

import { User } from '../types';
import generateClientId from '../utils/generateClientId';

import { auth, googleProvider } from './firebase-config';
import { addUser } from './userData';

const createUserData = async (userCredential: UserCredential): Promise<User> => {
    const user = {
        uid: userCredential.user.uid,
        client_id: generateClientId(userCredential.user.uid),
        email: userCredential.user.email ?? '',
        phone: '',
        name: '',
        surname: '',
        company: '',
        current_rent_id: '',
        favourite_cars: [],
        payment_card_id: '',
        payment_info_id: '',
        avatar: '',
    };

    // Saving user to Firebase collection
    await addUser(user);

    return user;
};

export const registerUser = async (email: string, password: string): Promise<User | FirebaseError> => {
    try {
        const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);

        if(!userCredential) throw Error('User credential missing!');

        return createUserData(userCredential);
    } catch (error) {
        if (error instanceof FirebaseError) {
            console.error('Authentication error:', error.message);
            return error;
        }
        throw error;
    }
};

const signInWithGoogle = async () => {
    try {
        const userCredential = await signInWithPopup(auth, googleProvider);

        if(!userCredential) throw Error('User credential missing!');

        createUserData(userCredential);

        return userCredential;
    } catch (error) {
        if (error instanceof FirebaseError) {
            console.error('Authentication error:', error.message);
            return {} as UserCredential;
        }
        throw {} as UserCredential;
    }
};

export const loginUser = async (email: string, password: string, method: string): Promise<UserCredential> => {
    if(method === 'GOOGLE') return signInWithGoogle();
    return await signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        if (error instanceof FirebaseError) {
            console.error('Authentication error:', error.message);
            return error;
        }
        throw error;
    }
};