import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { FirebaseError } from 'firebase/app';
import { z, ZodType } from 'zod';

import Alert from '../../components/Alert';
import { AlertTypes } from '../../enums';
import { getUser, setExtraLoginUserData } from '../../reducers/user-reducer-slice';
import { updateUser } from '../../services/userData';
import { ErrorTypes, FirstLoginData } from '../../types';

const FirstLogin = () => {

    const user = useSelector(getUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [errorAlert, setErrorAlert] = useState<ErrorTypes>({
        isOpen: false,
        type: AlertTypes.danger,
        title: '',
        message: '',
    });

    const firstLoginSchema: ZodType<FirstLoginData> = z.object({
        name: z.string().min(3),
        surname: z.string().min(3),
        company: z.string().optional(),
        phone: z.string().optional(),
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<FirstLoginData>({resolver: zodResolver(firstLoginSchema)});

    const submitFirstLogin = async (data: FirstLoginData) => {
        const result = firstLoginSchema.safeParse(data);
        if(result.success) {
            const updatedUserData = {
                ...user,
                ...data,
            };
            try {
                const updateResult = await updateUser(updatedUserData.uid, updatedUserData);
                if(updateResult) {
                    dispatch(setExtraLoginUserData(data));
                    setErrorAlert({
                        isOpen: false,
                        type: AlertTypes.danger,
                        title: '',
                        message: '',
                    });
                    navigate('/dashboard');
                } else {
                    setErrorAlert({
                        isOpen: true,
                        type: AlertTypes.danger,
                        title: 'Update error!',
                        message: 'Try again later',
                    });
                    throw Error('Update failed!');
                }
            } catch (error) {
                if (error instanceof FirebaseError) {
                    console.error('Firebase error:', error.message);
                    setErrorAlert({
                        isOpen: true,
                        type: AlertTypes.danger,
                        title: 'Authentication error',
                        message: error.message,
                    });
                  } else if(error instanceof Error) {
                    console.error('An unexpected error occurred:', error);
                    setErrorAlert({
                        isOpen: true,
                        type: AlertTypes.danger,
                        title: 'Unexpected error',
                        message: error.message,
                    });
                  }
            }
        }
        reset();
    };

    useEffect(() => {
        if(user.name) navigate('/dashboard');
    }, []);

    return (
        <main className='h-screen flex flex-row'>
            <section className='first-login-hero-section w-1/3 flex flex-col justify-end'>
                <div className='bg-primary pl-4 rounded-tr-full'>
                    <img src='https://firebasestorage.googleapis.com/v0/b/carently-94153.appspot.com/o/assets%2Ffirst-login-car.png?alt=media&token=74c2ec26-3af8-4007-b897-ca0d3ab47d1a' alt='first-login' />
                </div>
            </section>
            <section className='w-2/3 p-9'>
                <h3 className='text-2xl font-bold text-center mt-6'>Let's get started</h3>
                <Alert
                    {...errorAlert}
                />
                <form
                    onSubmit={handleSubmit(submitFirstLogin)}
                >
                    <div className='grid gap-6 mb-6 md:grid-cols-2'>
                        <div className='first-login-name-box w-full block text-sm font-medium leading-6 text-dark pt-2'>
                            <label htmlFor='name'>First name</label>
                            <input 
                                type='text' 
                                id='name'
                                className='block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-200 placeholder:font-extralight sm:text-sm sm:leading-6' 
                                placeholder='John'
                                {...register('name')}
                                required 
                            />
                            {errors.name && <span>{errors.name.message}</span>}
                        </div>
                        <div className='first-login-surname-box w-full block text-sm font-medium leading-6 text-dark pt-2'>
                            <label htmlFor='surname'>Last name</label>
                            <input 
                                type='text'
                                id='surname'
                                className='block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-200 placeholder:font-extralight sm:text-sm sm:leading-6'
                                placeholder='Doe'
                                {...register('surname')}
                                required 
                            />
                            {errors.surname && <span>{errors.surname.message}</span>}
                        </div>
                        <div className='first-login-company-box w-full block text-sm font-medium leading-6 text-dark pt-2'>
                            <label htmlFor='company'>Company (optional)</label>
                            <input 
                                type='text'
                                id='company'
                                className='block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-200 placeholder:font-extralight sm:text-sm sm:leading-6' 
                                placeholder='Company inc.'
                                {...register('company')} 
                            />
                            {errors.company && <span>{errors.company.message}</span>}
                        </div>  
                        <div className='first-login-phone-box w-full block text-sm font-medium leading-6 text-dark pt-2'>
                            <label htmlFor='phone'>Phone number (optional)</label>
                            <input 
                                type='tel'
                                id='phone'
                                className='block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-200 placeholder:font-extralight sm:text-sm sm:leading-6' 
                                placeholder='123-456-789' 
                                pattern='[0-9]{3}-[0-9]{3}-[0-9]{3}' 
                                {...register('phone')} 
                            />
                            {errors.phone && <span>{errors.phone.message}</span>}
                        </div>
                    </div>
                    <input 
                        type='submit'
                        className='w-full py-2 font-medium text-md text-white bg-secondary rounded-md cursor-pointer'
                        value='Get started'
                    />
                </form>
            </section>
        </main>
    );
};

export default FirstLogin;