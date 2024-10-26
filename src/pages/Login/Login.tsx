import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { FirebaseError } from 'firebase/app';
import { z,ZodType } from 'zod';

import GoogleIcon from '../../../public/Google.svg';
import Alert from '../../components/Alert';
import { AlertTypes } from '../../enums';
import { loginUser } from '../../services/authorization';
import { ErrorTypes, LoginData } from '../../types';

const Login = () => {

    const navigate = useNavigate();

    const [errorAlert, setErrorAlert] = useState<ErrorTypes>({
        isOpen: false,
        type: AlertTypes.danger,
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

    const submitLogin = async (data: LoginData, method: string) => {
        const result = loginSchema.safeParse(data);
        if(result.success || method === 'GOOGLE')
            {
                try {
                    const loginResult = await loginUser(data.email, data.password, method);
                    if(loginResult?.user?.uid) {
                        setErrorAlert({
                            isOpen: false,
                            type: AlertTypes.danger,
                            title: '',
                            message: '',
                        });
                        navigate('/first-login');
                    }
                } catch (error) {
                    if (error instanceof FirebaseError) {
                        console.error('Authentication error:', error.message);
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
                reset();
            }
    };

    return (
        <main className='login-section bg-primary h-screen flex flex-row'>
            <section className='login-hero-section w-1/2 flex flex-col p-4 justify-center items-center'>
                <img className='pb-4' src='https://firebasestorage.googleapis.com/v0/b/carently-94153.appspot.com/o/assets%2FCarently_logo_white_cropped.png?alt=media&token=d55f06bc-1e4d-445f-979f-96c3d9f45f63' alt='logo' />
                <h2 className='text-lg text-center font-medium text-white'>New way of car renting</h2>
            </section>
            <section className='login-panel bg-white w-1/2 rounded-l-3xl p-8 flex flex-col justify-evenly'>
                <h3 className='text-2xl font-bold text-center pt-8'>Log in</h3>
                <Alert
                    {...errorAlert}
                />
                <form 
                    className='login-form flex flex-col items-center'
                    onSubmit={handleSubmit((data: LoginData) => submitLogin(data, 'EMAIL'))}
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
                        <div className='login-external-methods w-1/2'>
                            <button
                                className='w-full my-1 border-secondary border-2 py-2 font-medium text-md rounded-md flex justify-evenly'
                                type='button'
                                onClick={() => submitLogin({email: '', password: ''}, 'GOOGLE')}
                            ><img src={GoogleIcon} alt='Google icon'/>Continue with Google</button>
                        </div>
                    </div>
                </form>
                <h4 className='text-center'>Don't have an account? <Link to='register' className='font-bold text-primary'>Register here</Link></h4>
            </section>
        </main>
    );
};

export default Login;