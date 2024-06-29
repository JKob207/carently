import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { getAllAvailableCars, getAllCars } from '../services/carsData';
import { Car } from '../types';

import CarCard from './CarCard';

const CarsGrid = (props: CarsGridProps) => {
    
    const [carsData, setCarsData] = useState<Car[]>([]);

    const location = useLocation();

    useEffect(() => {
        const fetchTopFavouriteCars = async () => {
            const carsData = await getAllCars();
            const sortedCars = carsData.sort((a, b) => parseFloat(b.rating.replace(',', '.')) - parseFloat(a.rating.replace(',', '.')));
            const topCars = sortedCars.slice(0, props.limit);

            setCarsData(topCars);
        };

        const fetchCarsList = async () => {
            const carsData = await getAllCars();
            setCarsData(carsData);
        };

        const fetchAvailableCars = async () => {
            const carsData = await getAllAvailableCars(location.state?.startDate, location.state?.endDate);
            setCarsData(carsData);
        };

        switch(props.type) {
            case 'list': fetchCarsList(); break;
            case 'date-range': fetchAvailableCars(); break;
            case 'top-favourite': fetchTopFavouriteCars(); break;
        }
        
    }, [props.limit, props.type]);

    
    const filteredCarsData = carsData.filter((car: Car) => car.name.toLowerCase().trim().includes(props.searchValue?.toLowerCase()?.trim() ?? ''));
    
    const mapCarsToCards = useMemo(() => filteredCarsData.map((car: Car) => {
        console.log(car);
        return (
            <CarCard
                id={car.id}
                name={car.name}
                year={car.year}
                cost_per_km={car.cost_per_km}
                mileage={car.mileage}
                gearbox={car.gearbox}
                fuel_type={car.fuel_type}
                thumbnail_image={car.thumbnail_image}
            />
        );
    }), [filteredCarsData]);
    
    return (
        <div className='favourite-cars grid gap-4 grid-cols-4 mt-4'>
            {mapCarsToCards}
        </div>
    );
};

type CarsGridProps = {
    type: string,
    limit?: number,
    searchValue?: string,
};

export default CarsGrid;