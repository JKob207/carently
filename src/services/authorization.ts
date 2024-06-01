import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,UserCredential } from 'firebase/auth';

import { auth } from './firebase-config';

export const registerUser = async (email: string, password: string): Promise<UserCredential> => {
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = async (email: string, password: string): Promise<UserCredential> => {
    return await signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async () => {
    await signOut(auth);
};