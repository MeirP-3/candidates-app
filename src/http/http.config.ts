declare const location: Location;

const envType = process.env.REACT_APP_ENV;
console.log('envType:', envType)
export const apiBaseUrl = envType === 'production' ? `${location.origin}/api` : `http://localhost:8080/api`;

export enum HttpEndPoint {
    signin = '/auth/signin',
    signup = '/auth/signup',
    candidates = '/candidates'
};