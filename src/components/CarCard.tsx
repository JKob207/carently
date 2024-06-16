import { BsSpeedometer2 } from 'react-icons/bs';
import { CiHeart } from 'react-icons/ci';
import { PiSteeringWheel } from 'react-icons/pi';
import { TbGasStation } from 'react-icons/tb';

const CarCard = () => {
    return (
        <div className='car-card block bg-gray-100 border border-gray-200 rounded-lg shadow sm:p-6 md:p-4 dark:bg-gray-800 dark:border-gray-700'>
            <div className='favourite-car-icon relative left-[90%] bottom-[2%] w-min'>
                <CiHeart
                    size='20px'
                />
            </div>
            <div className='car-image flex justify-center'>
                <img src='https://placehold.co/200x150' alt='Car' />
            </div>
            <div className='car-info w-full pt-4'>
                <div className='p-4 bg-white rounded-lg shadow-md'>
                    <div className='flex justify-between items-center mb-2'>
                        <div>
                            <span className='font-semibold'>Hyundai C6</span>
                            <sup className='text-gray-400 text-sm'>2018</sup>
                        </div>
                        <span className='font-semibold'>$250 / day</span>
                    </div>
                    <div className='flex justify-around'>
                        <div className='flex flex-col items-center'>
                            <BsSpeedometer2 size='25px' />
                            <span className='mt-2 text-sm'>20k</span>
                        </div>
                        <div className='flex flex-col items-center'>
                            <PiSteeringWheel size='25px' />
                            <span className='mt-2 text-sm'>Auto</span>
                        </div>
                        <div className='flex flex-col items-center'>
                            <TbGasStation size='25px' />
                            <span className='mt-2 text-sm'>Diesel</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarCard;