import { useState } from "react";

type StorageItem = any

const useLocalStorage = (itemName: string) => {
    const storageItem: StorageItem = JSON.parse(localStorage.getItem(itemName) || '{}');

    const [item, setItem] = useState(storageItem);

    const setStorageItem = (data: StorageItem): void => {
        setItem(data);
        localStorage.setItem(itemName, JSON.stringify(data));
    }

    return [item, setStorageItem];
}

export { useLocalStorage };