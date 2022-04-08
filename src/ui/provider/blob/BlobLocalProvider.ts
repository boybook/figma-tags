import { dispatch, handleEvent } from "../../uiMessageHandler";

type Result = {
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
    promiseClientStorageGet.set(key, {
        got: false,
        result: undefined
    });
    dispatch('client-storage-get', {
        key: key
    });
    return new Promise((resolve, reject) => {
        let timeout = 5000;
        setInterval(() => {
            const result = promiseClientStorageGet.get(key);
            if (result?.got) {
                promiseClientStorageGet.delete(key);
                resolve(result.result);
            } else if (timeout-- <= 0) {
                reject("client-storage-get `" + key + "` timeout");
            }
        }, 1);
    });
}

const storageSet = (key: string, data: any) => {
    promiseClientStorageSet.set(key, {
        got: false,
        result: undefined
    });
    dispatch('client-storage-set', {
        key: key,
        data: data
    });
    return new Promise<void>((resolve, reject) => {
        let timeout = 5000;
        setInterval(() => {
            const result = promiseClientStorageSet.get(key);
            if (result?.got) {
                promiseClientStorageSet.delete(key);
                resolve();
            } else if (timeout-- <= 0) {
                reject("client-storage-set `" + key + "` timeout");
            }
        }, 1);
    });
}

export default { storageGet, storageSet }


