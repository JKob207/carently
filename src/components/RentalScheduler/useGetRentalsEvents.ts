import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getUser } from '../../reducers/user-reducer-slice';
import { getCarById } from '../../services/carsData';
import { getUserRentals } from '../../services/rentals';
import { RentEvent } from '../../types';
import { formatEventDate } from '../../utils/dateUtils';

const useGetRentalsEvents = () => {
    const [rentalsEvents, setRentalEvents] = useState<RentEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const userData = useSelector(getUser);

    useEffect(() => {
        const getEvents = async () => {
            try {
                const rentals = await getUserRentals(userData.uid);

                const rentalsObject: RentEvent[] = await Promise.all(
                    rentals.map(async (rental) => {
                        const carData = await getCarById(rental.car_id);
                        return {
                            id: rental.id ?? '',
                            title: `Car rent: ${carData.name}`,
                            start: formatEventDate(rental.date_start),
                            end: formatEventDate(rental.date_end)
                        };
                    })
                );

                setRentalEvents(rentalsObject);
            } catch (error) {
                console.error('Error fetching rental events:', error);
            } finally {
                setIsLoading(false);
            }

        };

        if(rentalsEvents.length === 0) getEvents();
    }, [userData.uid, rentalsEvents.length]);

    return {
        rentalsEvents,
        isLoading
    };
};

export default useGetRentalsEvents;