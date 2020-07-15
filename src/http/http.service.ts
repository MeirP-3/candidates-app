import Axios, { AxiosError } from 'axios';
import { apiBaseUrl } from './http.config';
import { TokenProvider } from '../authentication/token-provider';
import { signOut } from '../authentication/sign-out';

declare const location: Location;

const axios = Axios.create({
    baseURL: apiBaseUrl
});

axios.interceptors.request.use(config => {

    const token = TokenProvider.token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

axios.interceptors.response.use(
    response => {
        return response.data;
    },
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            signOut();
            location.reload();
        }
        return error;
    }
);

export const HttpApiService = axios;