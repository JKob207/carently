import { createSlice,PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { FirstLoginData, User } from '../types';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        uid: '',
        client_id: '',
        email: '',
        phone: '',
        name: '',
        surname: '',
        company: '',
        current_rent_id: '',
        favourite_cars: [],
        payment_card_id: '',
        payment_info_id: '',
        avatar: '',
    } as User,
    reducers: {
        setUser(state, { payload }: PayloadAction<User>) {
            state.uid = payload.uid;
            state.client_id = payload.client_id;
            state.email = payload.email;
            state.phone = payload.phone;
            state.name = payload.name;
            state.surname = payload.surname;
            state.company = payload.company;
            state.current_rent_id = payload.current_rent_id;
            state.favourite_cars = payload.favourite_cars;
            state.payment_card_id = payload.payment_card_id;
            state.payment_info_id = payload.payment_info_id;
            state.avatar = payload.avatar;
        },
        setExtraLoginUserData(state, {payload}: PayloadAction<FirstLoginData>) {
            state.name = payload.name;
            state.surname = payload.surname;
            state.company = payload.company ?? '';
            state.phone = payload.phone ?? '';
            state.avatar = payload.avatar ?? '';
        },
    },
});

export const { setUser, setExtraLoginUserData } = userSlice.actions;

export const getUser = (state: RootState): User => ({
    uid: state.user.uid,
    client_id: state.user.client_id,
    email: state.user.email,
    phone: state.user.phone,
    name: state.user.name,
    surname: state.user.surname,
    company: state.user.company,
    current_rent_id: state.user.current_rent_id,
    favourite_cars: state.user.favourite_cars,
    payment_card_id: state.user.payment_card_id,
    payment_info_id: state.user.payment_info_id,
    avatar: state.user.avatar,
});

export default userSlice.reducer;