import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import typia from 'typia';

import { User } from '../types';

import { db } from './firebase-config';

export const addUser = async (newUser: User) => {
    try {
        const uid = newUser.uid;
        await setDoc(doc(db, 'users',uid), newUser);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getUserById = async (uid: string): Promise<User> => {
    try {
        const userRef = await doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);
        
        if(userSnap.exists())
        {
            const user = {...userSnap.data()};
            if(typia.is<User>(user)) {
                return user;
            } else {
                console.log(user);
                throw Error('Wrong user data!');
            }
        }else {
            throw Error('No user found!');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateUser = async (uid: string, newUserData: User) => {
    const userDoc = doc(db, 'users', uid);
    try {
        await updateDoc(userDoc, newUserData);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};