import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,UserCredential } from 'firebase/auth';

import { User } from '../types';
import generateClientId from '../utils/generateClientId';

import { auth } from './firebase-config';
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

export const loginUser = async (email: string, password: string): Promise<UserCredential> => {
    return await signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async () => {
    await signOut(auth);
};