import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CarsGrid from '../../components/CarsGrid';
import { PaymentTypes } from '../../enums';
import { getUser } from '../../reducers/user-reducer-slice';
import { getCarById } from '../../services/carsData';
import { addPayment, getPaymentHistoryForUserById } from '../../services/payments';
import { getRentalById } from '../../services/rentals';
import { getAvatar, getImage } from '../../services/storageAPI';
import { updateUser } from '../../services/userData';
import { Car, GroupedPayments, Payment, Rental, User } from '../../types';
import { formatDate } from '../../utils/dateUtils';

const UserPanel = () => {
    const userData = useSelector(getUser);

    const [currentRent, setCurrentRent] = useState<Rental>();
    const [currentCar, setCurrentCar] = useState<Car>();
    const [paymentHistoryMonths, setPaymentHistoryMonths] = useState<string[]>();
    const [paymentHistory, setPaymentHistory] = useState<GroupedPayments>();
    const [monthRentCost, setMonthRentCost] = useState(0);
    const [monthFineCost, setMonthFineCost] = useState(0);
    const [carPreviewImage, setCarPreviewImage] = useState('https://firebasestorage.googleapis.com/v0/b/carently-94153.appspot.com/o/assets%2Fempty_current.png?alt=media&token=900bdd85-63ee-4bdb-89f1-93990d8fb1f1');
    const [avatar, setAvatar] = useState('https://placehold.co/45');

    const navigate = useNavigate();

    const sumMonthPrice = (selectedMonth: string) => {
        if(!paymentHistory) return; 
        const monthData = paymentHistory[selectedMonth];
        
        const rentSum = monthData
          ?.filter((payment) => payment.type === PaymentTypes.rent)
          ?.reduce((acc, payment) => acc + parseFloat(payment.price), 0);
  
          const fineSum = monthData
              ?.filter((payment) => payment.type === PaymentTypes.fine)
              ?.reduce((acc, payment) => acc + parseFloat(payment.price), 0);
  
          setMonthRentCost(rentSum ?? '0');
          setMonthFineCost(fineSum ?? '0');
    };

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

    useEffect(() => {
        const getAvatarUrl = async () => {
            try {
                const avatar = await getAvatar(userData.avatar);
                setAvatar(avatar);
            } catch (error) {
                console.log(error);
            }
        };

        getAvatarUrl();
    }, []);

    useEffect(() => {
        const getPaymentHistory = async () => {
            if(!userData.uid) return;

            try {
                const paymentData = await getPaymentHistoryForUserById(userData.uid);
                
                setPaymentHistoryMonths(Object.keys(paymentData));
                setPaymentHistory(paymentData);
            } catch (error) {
                console.error(error);
                return;
            }
        };

        getPaymentHistory();
    }, []);

    useEffect(() => {
        if(!paymentHistoryMonths) return;
        sumMonthPrice(paymentHistoryMonths[0]);
    }, [paymentHistoryMonths]);

    useEffect(() => {
        const getPreviewImage = async () => {
            const previewImage = await getImage(currentCar?.preview_image ?? '');
            setCarPreviewImage(previewImage);
        };

        getPreviewImage();
    }, [currentCar?.preview_image]);

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
            date: new Date().toString(),
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
                date: new Date().toString(),
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

    const changePaymentHistory = (event: ChangeEvent<HTMLSelectElement>) => {
      const selectedMonth = event.target.value;
      sumMonthPrice(selectedMonth);
    };

    const paymentHistoryMonthsOptions = useMemo(() => paymentHistoryMonths?.map((month) => <option value={month}>{month}</option>), [paymentHistoryMonths]);

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
                        <img className='rounded-full w-[150px]' src={avatar} alt='user-avatar' />
                        <div className='ml-8 text-center'>
                            <p className='text-xl'>{userData.name} {userData.surname}</p>
                            <p className='text-lg'>{userData.company}</p>
                        </div>
                    </div>
                </div>
                <div className='w-1/3'>
                    <div className='w-3/4 bg-primary p-4 shadow-[8px_6px_3px_2px_rgba(32,81,214,0.38)]'>
                        <h3 className='font-semibold text-2xl mb-4 text-white'>Current rental</h3>
                        <img className='w-[400px]' src={carPreviewImage} alt='car-image' />
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
                        <select 
                            className='py-2 px-6 border border-gray-300 rounded-lg bg-gray-50 font-medium'
                            onChange={changePaymentHistory}
                        >
                            {
                                paymentHistoryMonthsOptions?.length === 0 ? (
                                    <option>No months</option>
                                ) : paymentHistoryMonthsOptions
                            }
                        </select>
                    </div>
                    <div className='flex justify-between border-b-2 border-gray-200 mb-6'>
                        <p className='font-light'>Rent</p>
                        <p className='font-semibold'>{monthRentCost}$</p>
                    </div>
                    <div className='flex justify-between border-b-2 border-gray-200'>
                        <p className='font-light'>Fines</p>
                        <p className='font-semibold'>{monthFineCost}$</p>
                    </div>
                </div>
            </div>
            <hr/>
            <div className='mt-4'>
                <h3 className='font-semibold text-2xl'>Favourite cars</h3>
                <div>
                    <CarsGrid 
                        type='favourite'
                    />
                </div>
            </div>
        </div>
    );
};

export default UserPanel;