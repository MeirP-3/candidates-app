export const StorageService = {
    getString: (key: string) => localStorage.getItem(key),
    setString: (key: string, value: string) => localStorage.setItem(key, value),
    removeItem: (key: string) => localStorage.removeItem(key)
};