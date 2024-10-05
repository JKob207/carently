import { GeoPoint } from 'firebase/firestore';

import { AlertTypes, PaymentTypes } from './enums';

type LoginData = {
    email: string;
    password: string;
};

type RegisterData = LoginData & {
    confirmPassword: string;
    terms: boolean;
};

type FirstLoginData = {
    name: string;
    surname: string;
    company?: string;
    phone?: string;
}

type ErrorTypes = {
    isOpen: boolean,
    type: AlertTypes,
    title: string,
    message: string,
};

type User = {
    uid: string,
    client_id: string,
    email: string,
    phone: string,
    name: string,
    surname: string,
    company: string,
    current_rent_id: string,
    favourite_cars: string[],
    payment_card_id: string,
    payment_info_id: string,
};

type Car = {
    id: string,
    name: string,
    brand: string,
    type: string,
    year: number,
    delay_fine: number,
    doors: number,
    fuel_type: string,
    fuel_capacity: string,
    gearbox: string,
    mileage: number,
    pickup_map: GeoPoint,
    rating: string,
    seates: number,
    start_cost: number,
    cost_per_day: string,
    thumbnail_image: string,
    preview_image: string,
};

type Rental = {
    id?: string,
    car_id: string,
    user_id: string,
    date_start: string | Date,
    date_end: string | Date,
};

type DatePickerType = {
    startDate: Date,
    endDate: Date,
};

type Filters = {
    brand: string[],
    type: string[],
    gearbox: string[],
};

type RentEvent = {
    id: string,
    title: string,
    start: string,
    end: string
};

type Payment = {
    id?: string,
    date: Date | string,
    price: string,
    type: PaymentTypes,
    user_id: string,
};

type GroupedPayments = {
    [key: string]: Payment[];
};

export type {
    LoginData,
    RegisterData,
    FirstLoginData,
    ErrorTypes,
    User,
    Car,
    DatePickerType,
    Rental,
    Filters,
    RentEvent,
    Payment,
    GroupedPayments
};