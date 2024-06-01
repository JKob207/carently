const Alert = ({isOpen, title, message}: AlertProps) => {

    return (
        isOpen ? (
        <div className='mt-6 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
            <span className='font-medium'>{title}</span> {message}
        </div>
        ) : null
    );
};

type AlertProps = {
    isOpen: boolean,
    title: string,
    message: string,
}

export default Alert;