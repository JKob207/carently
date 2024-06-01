type LoginData = {
    email: string;
    password: string;
};

type RegisterData = LoginData & {
    confirmPassword: string;
    terms: boolean;
};

type AlertTypes = 'danger' | 'success';

type ErrorTypes = {
    isOpen: boolean,
    type: AlertTypes,
    title: string,
    message: string,
};

export type {
    LoginData,
    RegisterData,
    AlertTypes,
    ErrorTypes
};