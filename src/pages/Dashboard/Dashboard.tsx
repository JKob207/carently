import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';

import CarsGrid from '../../components/CarsGrid';
import { getMinEndDate } from '../../utils/dateUtils';

import 'react-datepicker/dist/react-datepicker.css';

const Dashboard = () => {
    const navigator = useNavigate();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date((new Date).setDate((new Date).getDate() + 7)));

    const handleSearchCar = () => {
        navigator('cars-list', { state: { type: 'date-range', startDate: startDate, endDate: endDate } } );
    };

    return (
        <div>
            <div className='hero-section flex items-center justify-around'>
                <div>
                    <h2 className='font-medium text-5xl text-center'>
                        Lorem ipsum <span className='text-secondary'>dolor</span> <br/>
                        sit amet consectetur <br/>
                        adipiscing <span className='text-secondary'>elit</span>
                    </h2>
                </div>
                <div>
                    <img src='https://placehold.co/300' alt='Hero' />
                </div>
            </div>
            <div className='p-4 grid gap-6 md:grid-cols-3 w-3/4 relative left-[15%] shadow-2xl '>
                <div className='w-full block text-sm font-medium leading-6 text-dark pt-2'>
                    <label>Pickup date</label>
                    <div className='block'>
                        <DatePicker
                            className='block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-200 placeholder:font-extralight sm:text-sm sm:leading-6'
                            selected={startDate}
                            minDate={new Date()}
                            onChange={(date: Date) => setStartDate(date)}
                        />
                    </div>
                </div>
                <div className='w-full block text-sm font-medium leading-6 text-dark pt-2'>
                <label>Drop off date</label>
                    <div className='block'>
                        <DatePicker
                            className='block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-200 placeholder:font-extralight sm:text-sm sm:leading-6'
                            selected={endDate}
                            minDate={getMinEndDate(startDate)}
                            onChange={(date: Date) => setEndDate(date)}
                        />
                    </div>
                </div>
                <div className='w-full block text-sm font-medium leading-6 text-dark pt-2 flex items-center justify-center content-center'>
                    <button
                        className='w-3/4 py-2 font-medium text-md text-white bg-secondary rounded-md cursor-pointer'
                        onClick={handleSearchCar}
                    >Search car</button>
                </div>
            </div>
            <div className='p-8'>
                <h3 className='font-semibold text-2xl mt-4'>The top rented cars</h3>
                <CarsGrid
                    type='top-favourite' 
                    limit={4} 
                />
            </div>
        </div>
    );
};

export default Dashboard;