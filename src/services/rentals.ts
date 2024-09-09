import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import typia from 'typia';

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

export const addRentCar = async (newRentalData: Rental) => {
    try {
        return await addDoc(rentalsCollectionRef, newRentalData);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getRentalById = async (rentalId: string) => {
    try {
        const rentalRef = await doc(db, 'rentals', rentalId);
        const renatalSnap = await getDoc(rentalRef);
        
        if(renatalSnap.exists())
        {
            const rental = {...renatalSnap.data()};
            if(typia.is<Rental>(rental)) {
                return rental;
            } else {
                console.log(rental);
                throw Error('Wrong rental data!');
            }
        }else {
            throw Error('No rental found!');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getUserRentals = async (userId: string) => {
    try {
        const data = await getDocs(rentalsCollectionRef);
        const rentalsMap = data.docs.map(doc => ({...doc.data(), id: doc.id} as Rental));

        return rentalsMap.filter((rental) => rental.user_id === userId);
    } catch (error) {
        console.error(error);
        throw error;
    }
};
