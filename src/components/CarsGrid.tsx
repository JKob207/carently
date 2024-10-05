import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { setCar } from '../reducers/car-reducer-slice';
import { getUser } from '../reducers/user-reducer-slice';
import { getAllAvailableCars, getAllCars } from '../services/carsData';
import { Car, Filters } from '../types';

import CarCard from './CarCard';

const CarsGrid = (props: CarsGridProps) => {
    
    const userData = useSelector(getUser);

    const [carsData, setCarsData] = useState<Car[]>([]);

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const filterCars = () => {
        const filters = props?.filters || { brand: [], type: [], gearbox: [] };

        return carsData.filter((car) => {
            return Object.entries(filters).every(([key, values]) => {
              if (values.length === 0) return true;
              return values.includes(car[key.toLowerCase() as keyof Car] as unknown as string);
            });
          });
    };

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

        const fetchFavouriteCars = async () => {
            const carsData = await getAllCars();
            const favouriteCars = carsData.filter((car) => userData.favourite_cars.includes(car.id));
            setCarsData(favouriteCars);
        };

        switch(props.type) {
            case 'list': fetchCarsList(); break;
            case 'date-range': fetchAvailableCars(); break;
            case 'top-favourite': fetchTopFavouriteCars(); break;
            case 'favourite': fetchFavouriteCars(); break;
        }
        
    }, [props.limit, props.type, userData.favourite_cars]);

    const handleCarClick = (id: string) => {
        const carData = carsData.filter((car) => car.id === id)[0];
        dispatch(setCar(carData));
        navigate(`/dashboard/car/${carData.name}`);
    };

    const filteredCarsData = filterCars();
    const searchedCarsData = filteredCarsData.filter((car: Car) => car.name.toLowerCase().trim().includes(props.searchValue?.toLowerCase()?.trim() ?? ''));
    
    const mapCarsToCards = useMemo(() => searchedCarsData.map((car: Car) => {
        return (
            <CarCard
                id={car.id}
                name={car.name}
                year={car.year}
                cost_per_day={car.cost_per_day}
                mileage={car.mileage}
                gearbox={car.gearbox}
                fuel_type={car.fuel_type}
                thumbnail_image={car.thumbnail_image}
                click={() => handleCarClick(car.id)}
            />
        );
    }), [searchedCarsData]);
    
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
    filters?: Filters
};

export default CarsGrid;