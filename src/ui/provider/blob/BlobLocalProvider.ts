import { dispatch, handleEvent } from "../../uiMessageHandler";

type Result = {
    listeners: number, // 同时多少监视（如果为1，才可移除）
    got: boolean,
    result: any
}
// Local Data Provider
handleEvent('client-storage-get', (data: Transfer.ClientStorageGetResult) => {
    const result = promiseClientStorageGet.get(data.key);
    if (result) {
        result.got = true;
        result.result = data.result
    } else {
        throw "client-storage-get: unable to find storage-get key";
    }
});

handleEvent('client-storage-set', (data: Transfer.ClientStorageSetResult) => {
    const result = promiseClientStorageSet.get(data.key);
    if (result) {
        result.got = true;
        result.result = data.suc
    } else {
        throw "client-storage-set: unable to find storage-set key";
    }
});

const promiseClientStorageGet: Map<string, Result> = new Map();
const promiseClientStorageSet: Map<string, Result> = new Map();

const storageGet = (key: string) => {
    if (!promiseClientStorageGet.has(key)) {
        promiseClientStorageGet.set(key, {
            listeners: 1,
            got: false,
            result: undefined
        });
        dispatch('client-storage-get', {
            key: key
        });
    } else {
        promiseClientStorageGet.get(key).listeners++;
    }
    return new Promise((resolve, reject) => {
        let timeout = 5000;
        const interval = setInterval(() => {
            const result = promiseClientStorageGet.get(key);
            if (result?.got) {
                if (--result.listeners <= 0) {
                    promiseClientStorageGet.delete(key);
                }
                resolve(result.result);
                clearInterval(interval);
            } else if (timeout-- <= 0) {
                reject("client-storage-get `" + key + "` timeout");
                clearInterval(interval);
            }
        }, 1);
    });
}

const storageSet = (key: string, data: any) => {
    if (!promiseClientStorageSet.has(key)) {
        promiseClientStorageSet.set(key, {
            listeners: 1,
            got: false,
            result: undefined
        });
        dispatch('client-storage-set', {
            key: key,
            data: data
        });
    } else {
        promiseClientStorageSet.get(key).listeners++;
    }
    return new Promise<void>((resolve, reject) => {
        let timeout = 5000;
        const interval = setInterval(() => {
            const result = promiseClientStorageSet.get(key);
            if (result?.got) {
                if (--result.listeners <= 0) {
                    promiseClientStorageSet.delete(key);
                }
                resolve();
                clearInterval(interval);
            } else if (timeout-- <= 0) {
                reject("client-storage-set `" + key + "` timeout");
                clearInterval(interval);
            }
        }, 1);
    });
}

export default { storageGet, storageSet }


