import { collection, getDocs } from 'firebase/firestore';

import { Rental } from '../types';

import { db } from './firebase-config';

const rentalsCollectionRef = collection(db, 'rentals');

export const getUnavailableCarsInRange = async (start: Date, end: Date): Promise<string[]> => {
    try {
        const data = await getDocs(rentalsCollectionRef);
        const rentalsMap = data.docs.map(doc => ({...doc.data(), id: doc.id} as Rental));
        return new Promise((resolve) => {
            const carsExluded = rentalsMap
            .filter((rent) => {
                const dateStart = new Date(rent.date_start);
                const dateEnd = new Date(rent.date_end);
                return !(dateEnd < start || dateStart > end);
            })
            .map(rent => rent.car_id);

            resolve(carsExluded);
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};
