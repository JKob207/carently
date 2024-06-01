type LoginData = {
    email: string;
    password: string;
};

type RegisterData = LoginData & {
    confirmPassword: string;
    terms: boolean;
};

export type {
    LoginData,
    RegisterData
};