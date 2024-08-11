import { collection, doc, getDocs } from 'firebase/firestore';

import { Car } from '../types';

import { db } from './firebase-config';
import { getUnavailableCarsInRange } from './rentals';

const carsCollectionRef = collection(db, 'cars');

export const getAllCars = async () => {
    try {
        const data = await getDocs(carsCollectionRef);
        const mapCars = data.docs.map(doc => ({...doc.data(), id: doc.id} as Car));
        return mapCars;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAllAvailableCars = async (startDate: Date, endDate: Date) => {
    try {
        const carsUnavailable = await getUnavailableCarsInRange(startDate, endDate);
        const carsData = await getAllCars();

        return carsData.filter((car) => !carsUnavailable.includes(car.id));
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const checkIfCarAvailable = async (startDate: Date, endDate: Date, carId: string) => {
    try {
        const availableCarsData = await getAllAvailableCars(startDate, endDate);
        return availableCarsData.filter((car) => car.id === carId ).length !== 0;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getCarByName = async (name: string) => {
    try {
        const carsData = await getAllCars();
        return carsData.filter((car) => car.name === name)[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
};