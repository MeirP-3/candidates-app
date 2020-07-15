import { StorageService } from "../shared/services/storage.service";

const TOKEN_KEY = 'token';

export class TokenProvider {

    private static _token: string | null;

    static get token() {

        if (this._token) {
            return this._token;
        }
        
        const token = StorageService.getString(TOKEN_KEY);

        this._token = token;

        return token;
    }

    static set token(token: string | null) {
        if (token) {
            StorageService.setString(TOKEN_KEY, token);
        } else {
            StorageService.removeItem(TOKEN_KEY);
        }

        this._token = token;
    }
}