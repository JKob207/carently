import { configureStore } from '@reduxjs/toolkit';

import carReducerSlice from './reducers/car-reducer-slice';
import userReducerSlice from './reducers/user-reducer-slice';

export const store = configureStore({
    reducer: {
        user: userReducerSlice,
        car: carReducerSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;