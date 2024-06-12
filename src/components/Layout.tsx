import { FaCalendarAlt, FaCar, FaUser  } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className='flex flex-row h-screen'>
            <aside className='basis-1/6 border-r-2 border-gray-100 bg-primary text-white font-medium'>
                <div className='logo-container py-5 flex justify-center'>
                    <img src='https://placehold.co/75' alt='logo' />
                </div>
                <div className='menu h-4/5 flex flex-col justify-evenly'>
                    <a href='#' className='text-center flex flex-col items-center'>
                        <FaCar size='50px' />
                        <p className='text-lg'>Cars list</p>
                    </a>
                    <a href='#' className='text-center flex flex-col items-center'>
                        <FaCalendarAlt size='50px' />
                        <p className='text-lg'>Calendar</p>
                    </a>
                    <a href='#' className='text-center flex flex-col items-center'>
                        <FaUser size='50px' />
                        <p className='text-lg'>Profile</p>
                    </a>
                    <a href='#' className='text-center flex flex-col items-center'>
                        <MdLogout size='50px' />
                        <p className='text-lg'>Logout</p>
                    </a>
                </div>
            </aside>
            <main className='main-container basis-5/6'>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;