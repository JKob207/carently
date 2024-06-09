import { Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { setUser } from '../reducers/user-reducer-slice';
import { auth } from '../services/firebase-config';
import { getUserById } from '../services/userData';

const AuthRequired = () => {
    const [action, setAction] = useState<React.ReactNode>();
    const dispatch = useDispatch();

    useEffect(() => {
        const AuthObserver = async () => {
            try {
                auth.onAuthStateChanged(async (user) => {
                    if (!user) {
                        setAction(<Navigate to='/' />);
                    } else {
                        const userData = await getUserById(user.uid);
                        dispatch(setUser(userData));
                        setAction(<Outlet />);
                    }
                });
            } catch (error) {
                console.error(error);
            }
        };

        AuthObserver();
    }, [dispatch]);

    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            { action }
        </Suspense>
    );
};

export default AuthRequired;