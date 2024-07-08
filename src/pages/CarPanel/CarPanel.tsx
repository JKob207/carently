import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import GoogleMap from '../../components/GoogleMap';
import { getCar } from '../../reducers/car-reducer-slice';
import { checkIfCarAvailable, getCarByName } from '../../services/carsData';
import { getMinEndDate } from '../../utils/dateUtils';


const CarPanel = () => {
    const { carName } = useParams();
    const carData = useSelector(getCar);
    const [car, setCar] = useState(carData);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date((new Date).setDate((new Date).getDate() + 7)));

    const [carAvailable, setCarAvailable] = useState<boolean | undefined>(undefined);
    const rentingButton = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const checkCarData = async () => {
            console.log('Checking!');
            if(!car.id) {
                const carData = await getCarByName(carName ?? '');
                setCar(carData);
            }
        };

        checkCarData();
    }, []);
    
    const checkAvailability = async () => {
        const isAvailable = await checkIfCarAvailable(startDate, endDate, car.id);

        setCarAvailable(isAvailable);

        if (rentingButton?.current?.innerText) {
            rentingButton.current.innerText = isAvailable ? 'Rent' : 'Not available';
        }
    };

    const rentCar = () => {
        console.log('Renting...');
    };

    if(!car?.id) {
        return <h1>Page loading...</h1>;
    }

    return (
        <div className='py-6 mx-4'>
            <h1 className='text-2xl font-bold py-4'>{car.name}</h1>
            <div className='upper-panel grid grid-cols-3 gap-6'>
                <img src='https://placehold.co/400x300' alt='car-full' />
                <div className='car-info-panel'>
                    <div className='flex justify-between border-b-2 my-4'>
                        <p className='font-light'>Mileage</p>
                        <p className='font-semibold'>{car.mileage} km</p>
                    </div>
                    <div className='flex justify-between border-b-2 my-4'>
                        <p className='font-light'>Year</p>
                        <p className='font-semibold'>{car.year}</p>
                    </div>
                    <div className='flex justify-between border-b-2 my-4'>
                        <p className='font-light'>Fuel type</p>
                        <p className='font-semibold'>{car.fuel_type}</p>
                    </div>
                    <div className='flex justify-between border-b-2 my-4'>
                        <p className='font-light'>Fuel tank capacity</p>
                        <p className='font-semibold'>{car.fuel_capacity} l</p>
                    </div>
                    <div className='flex justify-between border-b-2 my-4'>
                        <p className='font-light'>Doors</p>
                        <p className='font-semibold'>{car.doors}</p>
                    </div>
                    <div className='flex justify-between border-b-2 my-4'>
                        <p className='font-light'>Seates</p>
                        <p className='font-semibold'>{car.seates}</p>
                    </div>
                </div>
                <div className='car-type'>
                    <h2 className='font-medium text-xl'>Car type</h2>
                    <div className='grid grid-cols-2 grid-rows-2 gap-8 mt-4'>
                        <div className='bg-primary p-4 text-white rounded-lg flex flex-col items-center'>
                            <img src='https://placehold.co/50' alt='car-brand' />
                            <p className='font-semibold'>{car.brand}</p>
                        </div>
                        <div className='bg-primary p-4 text-white rounded-lg flex flex-col items-center'>
                            <img src='https://placehold.co/50' alt='car-brand' />
                            <p className='font-semibold'>{car.type}</p>
                        </div>
                        <div className='bg-primary p-4 text-white rounded-lg flex flex-col items-center'>
                            <img src='https://placehold.co/50' alt='car-brand' />
                            <p className='font-semibold'>{car.gearbox}</p>
                        </div>
                        <div className='bg-primary p-4 text-white rounded-lg flex flex-col items-center'>
                            <img src='https://placehold.co/50' alt='car-brand' />
                            <p className='font-semibold'>{car.rating}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='lower-panel grid grid-cols-3 gap-6 pt-4'>
                <div className='pickup-map'>
                    <h2 className='font-medium text-xl pb-2'>Pickup map</h2>
                    <GoogleMap />
                </div>
                <div className='biling'>
                    <h2 className='font-medium text-xl'>Biling</h2>
                    <div className='flex justify-between border-b-2 my-4'>
                        <p className='font-light'>Start</p>
                        <p className='font-semibold'>{car.start_cost} $</p>
                    </div>
                    <div className='flex justify-between border-b-2 my-4'>
                        <p className='font-light'>Cost per km</p>
                        <p className='font-semibold'>{car.cost_per_km} $</p>
                    </div>
                    <div className='flex justify-between border-b-2 my-4'>
                        <p className='font-light'>Delay fine</p>
                        <p className='font-semibold'>{car.delay_fine} $</p>
                    </div>
                </div>
                <div className='rental-picker'>
                    <div className='p-4 bg-secondary rounded-2xl'>
                        <h3 className='text-center text-lg text-white font-bold mb-4'>Rent now</h3>
                        <div>
                            <div className='flex items-center justify-between py-2'>
                                <label className='text-white'>Pickup date</label>
                                <DatePicker
                                    className='block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-200 placeholder:font-extralight sm:text-sm sm:leading-6'
                                    selected={startDate}
                                    minDate={new Date()}
                                    onChange={(date: Date) => setStartDate(date)}
                                />
                            </div>
                            <div className='flex items-center justify-between py-2'>
                                <label className='text-white'>Drop off date</label>
                                <DatePicker
                                    className='block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-200 placeholder:font-extralight sm:text-sm sm:leading-6'
                                    selected={endDate}
                                    minDate={getMinEndDate(startDate)}
                                    onChange={(date: Date) => setEndDate(date)}
                                />
                            </div>
                        </div>
                        <button 
                            className='w-full py-2 font-medium text-md text-white bg-primary rounded-md cursor-pointer my-4'
                            ref={rentingButton}
                            onClick={() => typeof carAvailable === 'undefined' ? checkAvailability() : rentCar()}
                        >
                            Check availability
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarPanel;