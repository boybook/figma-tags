import { dispatch, handleEvent } from "../../uiMessageHandler";

// Local Data Provider
handleEvent('client-storage-get', (data: Transfer.ClientStorageGetResult) => {
    promiseClientStorageGet.set(data.key, data.result);
});

handleEvent('client-storage-set', (data: Transfer.ClientStorageSetResult) => {
    promiseClientStorageSet.set(data.key, data.suc);
});

const promiseClientStorageGet: Map<string, undefined | any> = new Map();
const promiseClientStorageSet: Map<string, undefined | boolean> = new Map();

const storageGet = (key: string) => {
    dispatch('client-storage-get', {
        key: key
    });
    return new Promise((resolve, reject) => {
        let timeout = 5000;
        setInterval(() => {
            const result = promiseClientStorageGet.get(key);
            if (result) {
                promiseClientStorageGet.delete(key);
                resolve(result);
            } else if (timeout-- <= 0) {
                reject("timeout");
            }
        }, 1);
    });
}

const storageSet = (key: string, data: any) => {
    dispatch('client-storage-set', {
        key: key,
        data: data
    });
    return new Promise<void>((resolve, reject) => {
        let timeout = 5000;
        setInterval(() => {
            const result = promiseClientStorageSet.get(key);
            if (result) {
                promiseClientStorageSet.delete(key);
                resolve();
            } else if (timeout-- <= 0) {
                reject("timeout");
            }
        }, 1);
    });
}

export default { storageGet, storageSet }


