import { TokenProvider } from "./token-provider"

export async function signOut() {
    TokenProvider.token = null;
}