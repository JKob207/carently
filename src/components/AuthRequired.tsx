import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { auth } from '../services/firebase-config';

const AuthRequired = () => {
    const [action, setAction] = useState<Element | unknown>();

    useEffect(() => {
        const AuthObserver = async () => {
            try {
                await auth.onAuthStateChanged(async (user) => {
                    console.log('Check!');
                    if(!user) {
                        setAction(<Navigate to='/' />);
                    }else {
                        setAction(<Outlet />);
                    }
                });
            } catch (error) {
                console.error(error);
            }
        };

        AuthObserver();
    }, []);

    return (
        <>
        {
            action === null ?
            <h1>Loading</h1> : action
        }
        </>
    );
};

export default AuthRequired;