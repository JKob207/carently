import { addDoc, collection, getDocs } from 'firebase/firestore';

import { GroupedPayments, Payment } from '../types';
import { sortPaymentsByMonthYear } from '../utils/dateUtils';

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

export const getPaymentHistoryForUserById = async (userId: string) => {
    try {
        const data = await getDocs(paymentsCollectionRef);
        const paymentsMap = data.docs.map(doc => ({...doc.data(), id: doc.id} as Payment));

        const paymentHistory = paymentsMap
            .filter((payment) => payment.user_id === userId)
            .reduce((acc: GroupedPayments, payment: Payment) => {
                const date = new Date(payment.date);
                const monthYear = `${date.toLocaleString('en', { month: 'long' })} ${date.getFullYear()}`;
                
                if (!acc[monthYear]) {
                    acc[monthYear] = [];
                }

                acc[monthYear].push(payment);

                return acc;
            }, {});

            return sortPaymentsByMonthYear(paymentHistory);
    } catch (error) {
        console.error(error);
        throw error;
    }
};