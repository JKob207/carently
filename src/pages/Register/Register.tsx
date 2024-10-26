import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { FirebaseError } from 'firebase/app';
import typia from 'typia';
import { z,ZodType } from 'zod';

import Alert from '../../components/Alert';
import { AlertTypes } from '../../enums';
import { registerUser } from '../../services/authorization';
import { ErrorTypes, RegisterData, User } from '../../types';

const Register = () => {

    const [errorAlert, setErrorAlert] = useState<ErrorTypes>({
        isOpen: false,
        type: AlertTypes.danger,
        title: '',
        message: '',
    });

    const registerSchema: ZodType<RegisterData> = z.object({
        email: z.string().email(),
        password: z.string().min(6).max(30),
        confirmPassword: z.string().min(6).max(30),
        terms: z.boolean(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'] as ['confirmPassword'],
    })
    .refine((data) => data.terms === true, {
        message: 'You have to accept terms',
        path: ['terms'] as ['terms'],
    });

    const {
        register, 
        handleSubmit, 
        formState: { errors },
        reset,
    } = useForm<RegisterData>({resolver: zodResolver(registerSchema)});

    const submitRegister = async (data: RegisterData) => {
        const result = registerSchema.safeParse(data);
        if(result.success)
            {
                try {
                    const registerResult = await registerUser(data.email, data.password);
                    if(typia.is<User>(registerResult)) {
                        setErrorAlert({
                            isOpen: true,
                            type: AlertTypes.success,
                            title: 'User registered!',
                            message: 'You can login now',
                        });
                    } else throw Error('Register result error!');
                } catch (e) {
                    if (e instanceof FirebaseError) {
                        console.error('Authentication error:', e.message);
                        setErrorAlert({
                            isOpen: true,
                            type: AlertTypes.danger,
                            title: 'Authentication error',
                            message: e.message,
                        });
                      } else if(e instanceof Error) {
                        console.error('An unexpected error occurred:', e);
                        setErrorAlert({
                            isOpen: true,
                            type: AlertTypes.danger,
                            title: 'Authentication error',
                            message: e.message,
                        });
                      }
                }
                reset();
            }
    };

    return (
        <>
        <main className='register-section bg-primary h-screen flex flex-row'>
            <section className='register-hero-section w-1/2 flex flex-col p-4 justify-center items-center'>
                <img className='pb-4' src='https://firebasestorage.googleapis.com/v0/b/carently-94153.appspot.com/o/assets%2FCarently_logo_white_cropped.png?alt=media&token=d55f06bc-1e4d-445f-979f-96c3d9f45f63' alt='logo' />
                <h2 className='text-lg text-center font-medium text-white'>New way of car renting</h2>
            </section>
            <section className='register-panel bg-white w-1/2 rounded-l-3xl p-8 flex flex-col justify-evenly'>
                <h3 className='text-2xl font-bold text-center'>Create account</h3>
                <Alert
                    {...errorAlert}
                />
                <form 
                    className='register-form flex flex-col items-center'
                    onSubmit={handleSubmit(submitRegister)}
                >
                    <div className='register-email-box w-full block text-sm font-medium leading-6 text-dark pt-2'>
                    <label htmlFor='email'>Email</label>
                        <input 
                            id='email'
                            type='email'
                            {...register('email')}
                            placeholder='Enter you email'
                            className='block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-200 placeholder:font-extralight sm:text-sm sm:leading-6'
                        />
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>
                    <div className='register-password-box w-full block text-sm font-medium leading-6 text-dark pt-6'>
                        <label htmlFor='password' className='text-green-800'>Password</label>
                        <input
                            id='password'
                            type='password'
                            {...register('password')}
                            placeholder='Enter your password'
                            className='block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-200 placeholder:font-extralight sm:text-sm sm:leading-6'
                        />
                        {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
                    </div>
                    <div className='register-confirm-password-box w-full block text-sm font-medium leading-6 text-dark pt-6'>
                        <label htmlFor='confirmPassword'>Confirm password</label>
                        <input
                            id='confirmPassword'
                            type='password'
                            {...register('confirmPassword')}
                            placeholder='Confirm your password'
                            className='block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-200 placeholder:font-extralight sm:text-sm sm:leading-6'
                        />
                        {errors.confirmPassword && <span className='text-red-500'>{errors.confirmPassword.message}</span>}
                    </div>
                    <div className='register-terms-box w-full flex flex-col pt-6'>
                        <div className='flex items-center'>
                            <input
                                id='terms'
                                type='checkbox'
                                className='w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                {...register('terms')}
                            />
                            <label className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300' htmlFor='terms'>
                                I agree to <span className='text-primary font-bold'>terms of service</span> and <span className='text-primary font-bold'>privacy policy</span>.
                            </label>
                        </div>
                        {errors.terms && <span className='text-red-500 text-sm font-medium'>{errors.terms.message}</span>}
                    </div>
                    <div className='w-3/4 pt-8 flex flex-col items-center justify-center'>
                        <input 
                            type='submit'
                            className='w-full py-2 font-medium text-md text-white bg-secondary rounded-md cursor-pointer'
                            value='Register'
                        />
                        <div className='relative w-full flex py-5 items-center'>
                            <div className='flex-grow border-t border-gray-300'></div>
                            <span className='flex-shrink mx-4 text-gray-600'>OR</span>
                            <div className='flex-grow border-t border-gray-300'></div>
                        </div>
                        <div className='register-external-methods'>
                            <button
                                className='w-full my-1 border-secondary border-2 py-2 font-medium text-md rounded-md'
                                type='button'
                            >Continue with Google</button>
                            <button
                                className='w-full my-1 border-secondary border-2 py-2 font-medium text-md rounded-md'
                                type='button'
                            >Continue with Microsoft</button>
                        </div>
                    </div>
                </form>
                <h4 className='text-center'>Already have an account? <Link to='/' className='font-bold text-primary'>Login here</Link></h4>
            </section>
        </main>
        </>
    );
};

export default Register;