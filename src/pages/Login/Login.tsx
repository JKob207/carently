import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { FirebaseError } from 'firebase/app';
import { z,ZodType } from 'zod';

import Alert from '../../components/Alert';
import { loginUser } from '../../services/authorization';
import { LoginData } from '../../types';

const Login = () => {

    const [errorAlert, setErrorAlert] = useState({
        isOpen: false,
        title: '',
        message: '',
    });

    const loginSchema: ZodType<LoginData> = z.object({
        email: z.string().email(),
        password: z.string().min(6).max(30),
    });

    const {
        register, 
        handleSubmit, 
        formState: { errors },
        reset,
    } = useForm<LoginData>({resolver: zodResolver(loginSchema)});

    const submitLogin = async (data: LoginData) => {
        const result = loginSchema.safeParse(data);
        if(result.success)
            {
                try {
                    const loginResult = await loginUser(data.email, data.password);
                    if(loginResult?.user?.uid) {
                        console.log('User login');
                        setErrorAlert({
                            isOpen: false,
                            title: '',
                            message: '',
                        });
                    }
                } catch (e) {
                    if (e instanceof FirebaseError) {
                        console.error('Authentication error:', e.message);
                        setErrorAlert({
                            isOpen: true,
                            title: 'Authentication error',
                            message: e.message,
                        });
                      } else if(e instanceof Error) {
                        console.error('An unexpected error occurred:', e);
                        setErrorAlert({
                            isOpen: true,
                            title: 'Unexpected error',
                            message: e.message,
                        });
                      }
                }
                reset();
            }
    };

    return (
        <main className='login-section bg-primary h-screen flex flex-row'>
            <section className='login-hero-section w-1/2 flex flex-col p-4 justify-center items-center'>
                <img src='https://placehold.co/300' alt='logo' />
                <h2 className='text-lg text-center font-medium text-white'>Lorem ipsum sit dolor ets spiritum ets</h2>
            </section>
            <section className='login-panel bg-white w-1/2 rounded-l-3xl p-8 flex flex-col justify-evenly'>
                <h3 className='text-2xl font-bold text-center pt-8'>Log in</h3>
                <Alert
                        {...errorAlert}
                />
                <form 
                    className='login-form flex flex-col items-center'
                    onSubmit={handleSubmit(submitLogin)}
                >
                    <div className='login-email-box w-full block text-sm font-medium leading-6 text-dark pt-2'>
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
                    <div className='login-password-box w-full block text-sm font-medium leading-6 text-dark pt-6'>
                        <label htmlFor='email'>Password</label>
                        <input
                            id='password'
                            type='password'
                            {...register('password')}
                            placeholder='Enter your password'
                            className='block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-200 placeholder:font-extralight sm:text-sm sm:leading-6'
                        />
                        {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
                        <div className='text-end'>
                            <small className='font-semibold text-right'>Forgot password?</small>
                        </div>
                    </div>
                    <div className='w-3/4 pt-8 flex flex-col items-center justify-center'>
                        <input 
                            type='submit'
                            className='w-full py-2 font-medium text-md text-white bg-secondary rounded-md cursor-pointer'
                            value='Login'
                        />
                        <div className='relative w-full flex py-5 items-center'>
                            <div className='flex-grow border-t border-gray-300'></div>
                            <span className='flex-shrink mx-4 text-gray-600'>OR</span>
                            <div className='flex-grow border-t border-gray-300'></div>
                        </div>
                        <div className='login-external-methods'>
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
                <h4 className='text-center'>Don't have an account? <Link to='register' className='font-bold text-primary'>Register here</Link></h4>
            </section>
        </main>
    );
};

export default Login;