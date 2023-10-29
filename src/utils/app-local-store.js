const TOKEN = 'token';

export const AppLocalStore = {
    setToken: (token) => {
        localStorage.setItem(TOKEN, token);
    },
    getToken: () => {
        return localStorage.getItem(TOKEN) || null;
    }
}