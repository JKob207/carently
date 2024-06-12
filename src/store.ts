import { configureStore } from '@reduxjs/toolkit';

import userReducerSlice from './reducers/user-reducer-slice';

export const store = configureStore({
    reducer: {
        user: userReducerSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;