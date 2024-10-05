import { FaCalendarAlt, FaCar, FaUser  } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { Link, Outlet } from 'react-router-dom';

import { logoutUser } from '../services/authorization';

const Layout = () => {
    return (
        <div className='flex flex-row h-screen'>
            <aside className='basis-1/6 border-r-2 border-gray-100 bg-primary text-white font-medium overflow-hidden'>
                <Link to='/dashboard'>
                    <div className='logo-container pt-7 pb-2 flex justify-center'>
                        <img className='w-[75px]' src='https://firebasestorage.googleapis.com/v0/b/carently-94153.appspot.com/o/assets%2FCarently_logo_white_cropped.png?alt=media&token=d55f06bc-1e4d-445f-979f-96c3d9f45f63' alt='logo' />
                    </div>
                </Link>
                <div className='menu h-4/5 flex flex-col justify-evenly'>
                    <Link to='cars-list' className='text-center flex flex-col items-center'>
                        <FaCar size='50px' />
                        <p className='text-lg'>Cars list</p>
                    </Link>
                    <Link to='calendar' className='text-center flex flex-col items-center'>
                        <FaCalendarAlt size='50px' />
                        <p className='text-lg'>Calendar</p>
                    </Link>
                    <Link to='user-panel' className='text-center flex flex-col items-center'>
                        <FaUser size='50px' />
                        <p className='text-lg'>Profile</p>
                    </Link>
                    <button onClick={logoutUser} className='text-center flex flex-col items-center'>
                        <MdLogout size='50px' />
                        <p className='text-lg'>Logout</p>
                    </button>
                </div>
            </aside>
            <main className='main-container basis-5/6 overflow-auto'>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;