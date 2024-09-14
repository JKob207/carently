import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { PaymentTypes } from '../../enums';
import { getUser } from '../../reducers/user-reducer-slice';
import { getCarById } from '../../services/carsData';
import { addPayment } from '../../services/payments';
import { getRentalById } from '../../services/rentals';
import { updateUser } from '../../services/userData';
import { Car, Payment, Rental, User } from '../../types';
import { formatDate } from '../../utils/dateUtils';

const UserPanel = () => {
    const userData = useSelector(getUser);

    const [currentRent, setCurrentRent] = useState<Rental>();
    const [currentCar, setCurrentCar] = useState<Car>();

    const navigate = useNavigate();

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

    const endRent = async () => {
        if(!currentRent?.car_id || !currentCar?.id) return;

        const endDate = new Date();

        const costPerDay = new Date().getTime() < new Date(currentRent.date_start).getTime() ? 0 : (
            Math.round((endDate.getTime() - new Date(currentRent.date_start).getTime()) / (1000 * 3600 * 24)) 
            * parseFloat(currentCar?.cost_per_day)
        );

        const rentPrice = currentCar?.start_cost + costPerDay;

        const payment: Payment = {
            user_id: userData.uid,
            date: new Date(),
            price: rentPrice.toString(),
            type: PaymentTypes.rent
        };

        try {
            await addPayment(payment);
        } catch (error) {
            console.error(error);
        }

        if(endDate.getTime() > new Date(currentRent.date_end).getTime()) {
            const fine: Payment = {
                user_id: userData.uid,
                date: new Date(),
                price: currentCar.delay_fine.toString(),
                type: PaymentTypes.fine
            };

            try {
                await addPayment(fine);
            } catch (error) {
                console.error(error);
            }
        }

        try {
            const userWithRemovedCurrentRent: User = {
                ...userData,
                current_rent_id: ''
            };

            await updateUser(userWithRemovedCurrentRent.uid, userWithRemovedCurrentRent);

            navigate(0);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='m-12'>
            <div className='user-info-data flex w-2/5'>
                <h2 className='font-semibold text-2xl'>#{userData.client_id}</h2>
                <p className='ml-12 bg-gray-100 py-2 px-5 rounded-2xl font-light'>{formatDate(new Date())}</p>
            </div>
            <div className='py-8 flex'>
                <div className='w-1/3'>
                    <h3 className='font-semibold text-2xl'>Customer info</h3>
                    <div className='flex py-8 items-center'>
                        <img className='rounded-full' src='https://placehold.co/150' alt='user-avatar' />
                        <div className='ml-8 text-center'>
                            <p className='text-xl'>{userData.name} {userData.surname}</p>
                            <p className='text-lg'>{userData.company}</p>
                        </div>
                    </div>
                </div>
                <div className='w-1/3'>
                    <div className='w-3/4 bg-primary p-4 shadow-[8px_6px_3px_2px_rgba(32,81,214,0.38)]'>
                        <h3 className='font-semibold text-2xl mb-4 text-white'>Current rental</h3>
                        <img src='https://placehold.co/400x150' alt='car-image' />
                        {
                            currentRent?.car_id && (
                                <div>
                                    <h4 className='font-semibold text-white py-4'>Start date: {formatDate(currentRent?.date_start)}</h4>
                                    <h4 className='font-semibold text-white pb-4'>End date: {formatDate(currentRent?.date_end)}</h4>
                                    <button onClick={endRent} className='w-full py-2 font-medium text-md text-white bg-secondary rounded-md cursor-pointer'>End rent and pay</button>
                                </div>
                            ) 
                        }
                    </div>
                </div>
                <div className='w-1/3'>
                    <div className='flex justify-between mb-8'>
                        <h3 className='font-semibold text-2xl'>Payment history</h3>
                        <select className='py-2 px-6 border border-gray-300 rounded-lg bg-gray-50 font-medium'>
                            <option>May</option>
                        </select>
                    </div>
                    <div className='flex justify-between border-b-2 border-gray-200 mb-6'>
                        <p className='font-light'>Rent</p>
                        <p className='font-semibold'>130 $</p>
                    </div>
                    <div className='flex justify-between border-b-2 border-gray-200'>
                        <p className='font-light'>Fines</p>
                        <p className='font-semibold'>0$</p>
                    </div>
                </div>
            </div>
            <hr/>
            <div className='mt-4'>
                <h3 className='font-semibold text-2xl'>Favourite cars</h3>
            </div>
        </div>
    );
};

export default UserPanel;