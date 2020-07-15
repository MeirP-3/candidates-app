import { HttpEndPoint } from "../http/http.config";
import { SignInRequestData, SignInResponseData, SignUpRequestData, SignUpResponseData } from "./authentication.types";
import { HttpApiService } from "../http/http.service";
import { TokenProvider } from "./token-provider";
import { signOut } from "./sign-out";


export const AuthenticationService = {

    isLoggedIn() {
        return !!TokenProvider.token;
    },

    async post<T, R>(endPoint: HttpEndPoint, body: T) {
        return HttpApiService.post<any, R>(
            `${endPoint}`,
            body,
            { responseType: 'json' }
        )
    },

    async signIn({
        username,
        password
    }: SignInRequestData) {
        return (
            this.post<SignInRequestData, SignInResponseData>(
                HttpEndPoint.signin, { username, password }
            )
                .then(({ success, token = '', msg }) => {
                    if (!success) {
                        throw new Error(msg);
                    }

                    TokenProvider.token = token;
                })
        );
    },

    async signUp({
        username,
        email,
        password,
    }: SignUpRequestData) {
        return (
            this.post<SignUpRequestData, SignUpResponseData>(HttpEndPoint.signup, { username, email, password })
                .then(({ success, token = '', msg }) => {
                    if (!success) {
                        throw new Error(msg);
                    }

                    TokenProvider.token = token;
                })
        );
    },
    signOut: signOut
};