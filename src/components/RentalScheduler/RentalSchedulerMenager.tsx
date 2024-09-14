import { RentEvent } from '../../types';

import RentalScheduler from './RentalScheduler';

const RentalSchedulerMenager = (props: RentalSchedulerMenagerProps) => {
    if(props.events.length === 0) {
        return null;
    }

    return (
        <div>
            <RentalScheduler events={props.events}/>
        </div>
    );
};

type RentalSchedulerMenagerProps = {
    events: RentEvent[],
}

export default RentalSchedulerMenager;