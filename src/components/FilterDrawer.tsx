import { useState } from 'react';

import { Filters } from '../types';

const FilterDrawer = ({ isOpen, handleClose, apply, clear }: FilterDrawerProps) => {
    const [filters, setFilters] = useState<Filters>({
        brand: [],
        type: [],
        gearbox: [],
    });

    const handleFilters = (category: keyof Filters, value: string) => {
        setFilters((prevFilters) => {
          const updatedCategory = prevFilters[category].includes(value)
            ? prevFilters[category].filter((item) => item !== value)
            : [...prevFilters[category], value];
    
          return {
            ...prevFilters,
            [category]: updatedCategory,
          };
        });
    };

    return (
        <div id='drawer-navigation' className={`translate-x-${isOpen ? '0' : 'full'} fixed top-0 right-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800`} tabIndex={-1} aria-labelledby='drawer-navigation-label'>
            <h5 id='drawer-navigation-label' className='text-base font-semibold text-gray-500 uppercase dark:text-gray-400'>Filters</h5>
            <button type='button' onClick={handleClose} data-drawer-hide='drawer-navigation' aria-controls='drawer-navigation' className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white' >
                <svg aria-hidden='true' className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd'></path></svg>
                <span className='sr-only'>Close menu</span>
            </button>
            <div className='py-4 overflow-y-auto'>
                <ul className='space-y-2 font-medium'>
                    <li>
                        <p className='py-2'>Brand</p>
                        <div className='flex items-center pl-2 py-1'>
                            <input 
                                id='Audi-checkbox' 
                                type='checkbox' 
                                value='Audi' 
                                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                onChange={(e) => handleFilters('brand', e.target.value)}
                                checked={filters.brand.includes('Audi')}
                            />
                            <label htmlFor='Audi-checkbox' className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Audi</label>
                        </div>
                        <div className='flex items-center pl-2 py-1'>
                            <input 
                                id='Opel-checkbox' 
                                type='checkbox'
                                value='Opel'
                                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                onChange={(e) => handleFilters('brand', e.target.value)}
                                checked={filters.brand.includes('Opel')}
                            />
                            <label htmlFor='Opel-checkbox' className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Opel</label>
                        </div>
                    </li>
                    <li>
                        <p className='py-2'>Type</p>
                        <div className='flex items-center pl-2 py-1'>
                            <input 
                                id='Family-checkbox' 
                                type='checkbox' 
                                value='Family' 
                                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                onChange={(e) => handleFilters('type', e.target.value)}
                                checked={filters.type.includes('Family')}
                            />
                            <label htmlFor='Family-checkbox' className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Family</label>
                        </div>
                        <div className='flex items-center pl-2 py-1'>
                            <input 
                                id='Casual-checkbox' 
                                type='checkbox' 
                                value='Casual' 
                                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' 
                                onChange={(e) => handleFilters('type', e.target.value)}
                                checked={filters.type.includes('Casual')}    
                            />
                            <label htmlFor='Casual-checkbox' className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Casual</label>
                        </div>
                        <div className='flex items-center pl-2 py-1'>
                            <input 
                                id='Electric-checkbox' 
                                type='checkbox' 
                                value='Electric' 
                                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                onChange={(e) => handleFilters('type', e.target.value)}
                                checked={filters.type.includes('Electric')}   
                            />
                            <label htmlFor='Electric-checkbox' className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Electric</label>
                        </div>
                    </li>
                    <li>
                        <p className='py-2'>Gearbox</p>
                        <div className='flex items-center pl-2 py-1'>
                            <input 
                                id='Manual-checkbox' 
                                type='checkbox' 
                                value='Manual' 
                                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                onChange={(e) => handleFilters('gearbox', e.target.value)}
                                checked={filters.gearbox.includes('Manual')}   
                            />
                            <label htmlFor='Manual-checkbox' className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Manual</label>
                        </div>
                        <div className='flex items-center pl-2 py-1'>
                            <input
                                id='Automatic-checkbox' 
                                type='checkbox' 
                                value='Automatic' 
                                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                onChange={(e) => handleFilters('gearbox', e.target.value)}
                                checked={filters.gearbox.includes('Automatic')}  
                            />
                            <label htmlFor='Automatic-checkbox' className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Automatic</label>
                        </div>
                    </li>
                </ul>
                <div className='py-4'>
                    <button
                        onClick={() => apply(filters)}
                        className='w-full my-2 py-2 font-medium text-md text-white bg-secondary rounded-md cursor-pointer'
                    >Apply</button>
                    <button
                        onClick={() => {
                            setFilters({
                                brand: [],
                                type: [],
                                gearbox: [],
                            });
                            clear();
                        }}
                        className='w-full my-2 text-center justify-center border-secondary border-2 py-2 px-9 font-medium text-md rounded-md flex'
                    >Clear</button>
                </div>
            </div>
        </div>
    );
};

type FilterDrawerProps = {
    isOpen: boolean,
    handleClose: () => void,
    apply: (filters: Filters) => void,
    clear: () => void,
};

export default FilterDrawer;