import { ChangeEvent, useEffect, useState } from 'react';
import { HiAdjustments } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';

import CarsGrid from '../../components/CarsGrid';
import FilterDrawer from '../../components/FilterDrawer';
import { Filters } from '../../types';
import { formatDate } from '../../utils/dateUtils';

const CarsList = () => {

    const location = useLocation();

    const [searchValue, setSearchValue] = useState('');
    const [carListType, setCarListType] = useState('');
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [filters, setFilters] = useState<Filters>({
        brand: [],
        type: [],
        gearbox: [],
    });

    useEffect(() => {
        const listType = location.state?.type ? location.state?.type : 'list';
        setCarListType(listType);
    }, [location.state?.type]);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value);

    const openFiltersDrawer = () => setFiltersOpen((prev) => !prev);

    const handleApplyFilters = (filters: Filters) => setFilters(filters);
    const handleClearFilters = () => setFilters({
        brand: [],
        type: [],
        gearbox: [],
    });

    const pageTitle = location.state?.type === 'date-range' ? `Cars available in: ${formatDate(location.state?.startDate)} - ${formatDate(location.state?.endDate)}` : 'Cars list';

    return (
        <div className='cars-list px-6 my-8'>
            <h2 className='text-2xl font-semibold'>{pageTitle}</h2>
            <div className='py-4 grid grid-cols-4'>
                <div className='col-span-3'>
                    <form>   
                        <label htmlFor='search' className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>Search</label>
                        <div className='relative'>
                            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                                <svg className='w-4 h-4 text-gray-200 dark:text-gray-400' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'>
                                    <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'/>
                                </svg>
                            </div>
                            <input 
                                type='search' 
                                id='search'
                                onChange={handleSearch}
                                className='block w-full p-4 ps-10 text-sm text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-200 placeholder:font-extralight sm:text-sm sm:leading-6' 
                                placeholder='Type a car name...' />
                        </div>
                    </form>
                </div>
                <div className='col-span-1 flex items-center justify-center'>
                    <button
                        className='border-secondary border-2 py-2 px-9 font-medium text-md rounded-md flex'
                        onClick={openFiltersDrawer}
                    >
                        Filters
                        <HiAdjustments
                            className='ml-2'
                            size='24px'
                         />
                    </button>
                </div>
            </div>
            <div>
                <CarsGrid
                    type={carListType}
                    searchValue={searchValue}
                    filters={filters}
                />
            </div>
            <FilterDrawer 
                isOpen={filtersOpen}
                handleClose={openFiltersDrawer}
                apply={handleApplyFilters}
                clear={handleClearFilters}
            />
        </div>
    );
};

export default CarsList;