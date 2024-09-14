import { useEffect, useState } from 'react';
import { BsSpeedometer2 } from 'react-icons/bs';
import { CiHeart } from 'react-icons/ci';
import { PiSteeringWheel } from 'react-icons/pi';
import { TbGasStation } from 'react-icons/tb';

import { getImage } from '../services/storageAPI';

const CarCard = (props: CarCardProps) => {

    const [cardThumbnail, setCardThumbnail] = useState('');

    useEffect(() => {
        const getThumbnail = async () => {
            const thumbnail = await getImage(props.thumbnail_image);
            setCardThumbnail(thumbnail);
        };

        getThumbnail();
    }, [props.thumbnail_image]);

    return (
        <div
            className='car-card block bg-gray-100 border border-gray-200 rounded-lg shadow sm:p-6 md:p-4 dark:bg-gray-800 dark:border-gray-700'
        >
            <div className='favourite-car-icon relative left-[90%] bottom-[2%] w-min'>
                <CiHeart
                    size='20px'
                />
            </div>
            <div className='hover:cursor-pointer'  onClick={props.click}>
                <div className='car-image flex justify-center'>
                    <img src={cardThumbnail} alt='Car' />
                </div>
                <div className='car-info w-full pt-4'>
                    <div className='p-4 bg-white rounded-lg shadow-md'>
                        <div className='flex justify-between items-center mb-2'>
                            <div>
                                <span className='font-semibold'>{props.name}</span>
                                <sup className='text-gray-400 text-sm'>{props.year}</sup>
                            </div>
                            <span className='font-semibold'>${props.cost_per_day} / day</span>
                        </div>
                        <div className='flex justify-around'>
                            <div className='flex flex-col items-center'>
                                <BsSpeedometer2 size='25px' />
                                <span className='mt-2 text-sm'>{props.mileage} km</span>
                            </div>
                            <div className='flex flex-col items-center'>
                                <PiSteeringWheel size='25px' />
                                <span className='mt-2 text-sm'>{props.gearbox}</span>
                            </div>
                            <div className='flex flex-col items-center'>
                                <TbGasStation size='25px' />
                                <span className='mt-2 text-sm'>{props.fuel_type}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

type CarCardProps = {
    id: string,
    name: string,
    year: number,
    cost_per_day: string,
    mileage: number,
    gearbox: string,
    fuel_type: string,
    thumbnail_image: string,
    click: () => void,
};

export default CarCard;