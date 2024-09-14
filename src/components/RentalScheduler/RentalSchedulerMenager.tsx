import { RentEvent } from '../../types';

import RentalScheduler from './RentalScheduler';

const RentalSchedulerMenager = (props: RentalSchedulerMenagerProps) => {
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