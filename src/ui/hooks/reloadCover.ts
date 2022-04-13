import {exportCover} from "../provider/CoverProvider";
import {ref} from "vue";

type ReloadEntry = {
    status: 'REQUESTING' | 'COMPLETE' | 'FAILED',
    cover?: string
}

const requestCount = ref(0);
const coverReloadMap: { [id: string] : ReloadEntry } = {}

const updateRequestingCount = () => {
    requestCount.value = Object.values(coverReloadMap).filter(e => e.status === "REQUESTING").length;
};

const reloadCover = (fileId: string, nodeId: string, nodeWidth: number, accessToken?: string) : Promise<ReloadEntry> => {
    return new Promise<ReloadEntry>(((resolve, reject) => {
        if (coverReloadMap[fileId + "#" + nodeId]) {
            const entry = coverReloadMap[fileId + "#" + nodeId];
            console.log("reloadCover", "[reuse]", entry);
            if (entry.status === "REQUESTING") {
                const interval = setInterval(() => {
                    if (entry.status === "COMPLETE") {
                        console.log("reloadCover", "[reuse][COMPLETE]", entry);
                        resolve(entry);
                        clearInterval(interval);
                    } else if (entry.status === "FAILED") {
                        console.log("reloadCover", "[reuse][FAILED]", entry);
                        reject(entry);
                        clearInterval(interval);
                    }
                    updateRequestingCount();
                }, 1);
            } else {
                if (entry.status === "COMPLETE") {
                    console.log("reloadCover", "[reuse][COMPLETE]", entry);
                    resolve(entry);
                } else if (entry.status === "FAILED") {
                    console.log("reloadCover", "[reuse][FAILED]", entry);
                    reject(entry);
                }
                updateRequestingCount();
            }
        } else {
            console.log("reloadCover", "[new]", fileId, nodeId)
            const entry: ReloadEntry = {
                status: "REQUESTING"
            }
            coverReloadMap[fileId + "#" + nodeId] = entry;
            exportCover(fileId, nodeId, nodeWidth, accessToken)
                .then(re => {
                    entry.status = "COMPLETE";
                    entry.cover = re;
                    resolve(entry);
                    console.log("reloadCover", "[new][COMPLETE]", entry);
                    updateRequestingCount();
                })
                .catch(_ => {
                    entry.status = "FAILED";
                    reject(entry);
                    console.log("reloadCover", "[new][FAILED]", entry);
                    updateRequestingCount();
                });
        }
    }));
}

export { requestCount, reloadCover }