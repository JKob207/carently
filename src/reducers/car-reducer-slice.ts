import { createSlice,PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { Car } from '../types';

export const carSlice = createSlice({
    name: 'car',
    initialState: {
        id: '',
        name: '',
        brand: '',
        type: '',
        year: 0,
        delay_fine: 0,
        doors: 0,
        fuel_type: '',
        fuel_capacity: '',
        gearbox: '',
        mileage: 0,
        pickup_map: {},
        rating: '',
        seates: 0,
        start_cost: 0,
        cost_per_day: '',
        thumbnail_image: '',
        preview_image: '',
    } as Car,
    reducers: {
        setCar(state, { payload }: PayloadAction<Car>) {
            state.id = payload.id;
            state.brand = payload.brand;
            state.name = payload.name;
            state.type = payload.type;
            state.year = payload.year;
            state.delay_fine = payload.delay_fine;
            state.doors = payload.doors;
            state.fuel_type = payload.fuel_type;
            state.fuel_capacity = payload.fuel_capacity;
            state.gearbox = payload.gearbox;
            state.mileage = payload.mileage;
            state.pickup_map = payload.pickup_map;
            state.rating = payload.rating;
            state.seates = payload.seates;
            state.start_cost = payload.start_cost;
            state.cost_per_day = payload.cost_per_day;
            state.thumbnail_image = payload.thumbnail_image;
            state.preview_image = payload.preview_image;
        }
    }
});

export const { setCar } = carSlice.actions;

export const getCar = (state: RootState): Car => ({
    id: state.car.id,
    name: state.car.name,
    brand: state.car.brand,
    type: state.car.type,
    year: state.car.year,
    delay_fine: state.car.delay_fine,
    doors: state.car.doors,
    fuel_type: state.car.fuel_type,
    fuel_capacity: state.car.fuel_capacity,
    gearbox: state.car.gearbox,
    mileage: state.car.mileage,
    pickup_map: state.car.pickup_map,
    rating: state.car.rating,
    seates: state.car.seates,
    start_cost: state.car.start_cost,
    cost_per_day: state.car.cost_per_day,
    thumbnail_image: state.car.thumbnail_image,
    preview_image: state.car.preview_image
});

export default carSlice.reducer;