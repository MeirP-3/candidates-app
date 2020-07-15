export type AuthenticationProps = {
    isLoggedIn: boolean,
    setIsLoggedIn: (status: boolean) => void
};

export type SignInRequestData = {
    username: string,
    password: string
};

export interface SignUpRequestData extends SignInRequestData {
    email: string
};

export type SignInResponseData = {

    success: boolean,
    token?: string,
    msg?: string
};

export type SignUpResponseData = SignInResponseData;