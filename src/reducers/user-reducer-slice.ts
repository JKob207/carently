import { createSlice,PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { User } from '../types';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        uid: '',
        client_id: '',
        email: '',
        name: '',
        surname: '',
        company: '',
        current_rent_id: '',
        favourite_cars: [],
        payment_card_id: '',
        payment_info_id: '',
    } as User,
    reducers: {
        setUser(state, { payload }: PayloadAction<User>) {
            state.uid = payload.uid;
            state.client_id = payload.uid;
            state.email = payload.email;
            state.name = payload.name;
            state.surname = payload.surname;
            state.company = payload.company;
            state.current_rent_id = payload.current_rent_id;
            state.favourite_cars = payload.favourite_cars;
            state.payment_card_id = payload.payment_card_id;
            state.payment_info_id = payload.payment_info_id;
        },
    },
});

export const { setUser } = userSlice.actions;

export const getUser = (state: RootState) => ({
    uid: state.user.uid,
    email: state.user.email,
});

export default userSlice.reducer;