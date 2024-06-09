import { doc, getDoc, setDoc } from 'firebase/firestore';
import typia from 'typia';

import { User } from '../types';

import { db } from './firebase-config';

export const addUser = async (newUser: User) => {
    try {
        const uid = newUser.uid;
        await setDoc(doc(db, 'users',uid), newUser);
        console.log('New user added to db!');
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
                console.log('OK');
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

getUserById('nmGX8yG8owURXMwgTcEfgvZGVhF3');