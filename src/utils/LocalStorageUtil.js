export class LocalStorageUtil {

    saveToStorage(key, value) {
        const json = JSON.stringify(value);
        localStorage.setItem(key, json);
    }

    getFromStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch(error) {
            console.log(`Ошибка: ${error}`);
            return null;
        }
    }

}