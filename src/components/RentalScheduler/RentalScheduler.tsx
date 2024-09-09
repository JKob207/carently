import { createViewMonthGrid, createViewWeek, viewMonthGrid } from '@schedule-x/calendar';
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';

import { RentEvent } from '../../types';

import '@schedule-x/theme-default/dist/calendar.css';
import './rentalScheduler.css';

const RentalScheduler = ({ events }: RentalSchedulerProps) => {

    const config = useCalendarApp({
        views: [
            createViewMonthGrid(),
            createViewWeek(),
        ],
        events: events,
        defaultView: viewMonthGrid.name
    });

    return (
        <ScheduleXCalendar calendarApp={config} />
    );
};

type RentalSchedulerProps = {
    events: RentEvent[],
}

export default RentalScheduler;