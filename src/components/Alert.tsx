import classNames from 'classnames';

import { AlertTypes } from '../enums';

const Alert = ({isOpen, type, title, message}: AlertProps) => {

    const typeClass = classNames({
        'text-blue-800 bg-blue-50': type === AlertTypes.info,
        'text-green-800 bg-green-50': type === AlertTypes.success,
        'text-red-800 bg-red-50':  type === AlertTypes.danger,
        'text-yellow-800 bg-yellow-50': type === AlertTypes.warning,
    });

    return (
        isOpen ? (
        <div className={classNames(typeClass, 'mt-6 p-4 mb-4 text-sm rounded-lg')} role='alert'>
            <span className='font-medium'>{title}</span> {message}
        </div>
        ) : null
    );
};

type AlertProps = {
    isOpen: boolean,
    type: AlertTypes,
    title: string,
    message: string,
}

export default Alert;