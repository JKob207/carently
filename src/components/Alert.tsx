import classNames from 'classnames';

import { AlertTypes } from '../types';

const Alert = ({isOpen, type, title, message}: AlertProps) => {

    const dangerClassName = classNames('mt-6 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400');
    const successClassName = classNames('mt-6 p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400');

    return (
        isOpen ? (
        <div className={type === 'danger' ? dangerClassName : successClassName} role='alert'>
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