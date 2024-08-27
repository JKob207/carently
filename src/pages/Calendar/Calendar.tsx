import { useEffect, useState } from 'react';
import { FaCalendarCheck, FaCar } from 'react-icons/fa';
import { FaCalendarXmark } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

import { getUser } from '../../reducers/user-reducer-slice';
import { getCarById } from '../../services/carsData';
import { getRentalById } from '../../services/rentals';
import { Car, Rental } from '../../types';
import { formatDate } from '../../utils/dateUtils';

const Calendar = () => {
    const userData = useSelector(getUser);
    const [currentRent, setCurrentRent] = useState<Rental>();
    const [currentCar, setCurrentCar] = useState<Car>();
    
    useEffect(() => {
        const getCurrentRental = async () => {
            try {
                const rental = await getRentalById(userData?.current_rent_id);
                setCurrentRent(rental);

                const car = await getCarById(rental.car_id);
                setCurrentCar(car);
            } catch (error) {
                console.error(error);
            }
        };

        if(userData?.current_rent_id) {
            getCurrentRental();
        }
    }, []);

    return (
       <div className='calendar px-6 my-8'>
            <h2 className='text-2xl font-semibold'>Your calendar</h2>
            <div className='pt-6 current-rental'>
                <h3 className='text-xl pb-4'>Current rental</h3>
                {
                    currentRent ? (
                        <div className='w-2/4 flex items-center content-between justify-between'>
                            <div className='flex'>
                                <FaCalendarCheck size='60px' className='mr-4' />
                                <div className='text-center'>
                                    <p className='font-light'>Pickup date</p>
                                    <p className='text-lg pt-1'>{formatDate(currentRent.date_start)}</p>
                                </div>
                            </div>
                            <div className='flex'>
                                <FaCalendarXmark size='60px' className='mr-4' />
                                <div className='text-center'>
                                    <p className='font-light'>Drop off date</p>
                                    <p className='text-lg pt-1'>{formatDate(currentRent.date_end)}</p>
                                </div>
                            </div>
                            <div className='flex'>
                                <FaCar size='60px' className='mr-4' />
                                <div className='text-center'>
                                    <p className='font-light'>Car</p>
                                    <p className='text-lg pt-1'>{currentCar?.name}</p>
                                </div>
                            </div>
                        </div>
                    ) : <div>No current rent</div>
                }
            </div>
            <hr className='my-8 h-0.5 border-t-0 bg-neutral-200 dark:bg-white/10' />
       </div>
    );
};

export default Calendar;