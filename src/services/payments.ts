import { addDoc, collection } from 'firebase/firestore';

import { Payment } from '../types';

import { db } from './firebase-config';

const paymentsCollectionRef = collection(db, 'payments');

export const addPayment = async (newPayment: Payment) => {
    try {
        return await addDoc(paymentsCollectionRef, newPayment);
    } catch (error) {
        console.error(error);
        throw error;
    }
};