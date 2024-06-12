type LoginData = {
    email: string;
    password: string;
};

type RegisterData = LoginData & {
    confirmPassword: string;
    terms: boolean;
};

type FirstLoginData = {
    name: string;
    surname: string;
    company?: string;
    phone?: string;
}

type AlertTypes = 'danger' | 'success';

type ErrorTypes = {
    isOpen: boolean,
    type: AlertTypes,
    title: string,
    message: string,
};

type User = {
    uid: string,
    client_id: string,
    email: string,
    phone: string,
    name: string,
    surname: string,
    company: string,
    current_rent_id: string,
    favourite_cars: string[],
    payment_card_id: string,
    payment_info_id: string,
};

export type {
    LoginData,
    RegisterData,
    FirstLoginData,
    AlertTypes,
    ErrorTypes,
    User
};