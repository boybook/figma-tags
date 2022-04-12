import {exportCover} from "../provider/CoverProvider";

type ReloadEntry = {
    status: 'REQUESTING' | 'COMPLETE' | 'FAILED',
    cover?: string
}

const coverReloadMap: { [id: string] : ReloadEntry } = {}

export default (fileId: string, nodeId: string, nodeWidth: number, accessToken?: string) : Promise<ReloadEntry> => {
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
                }, 1);
            } else {
                if (entry.status === "COMPLETE") {
                    console.log("reloadCover", "[reuse][COMPLETE]", entry);
                    resolve(entry);
                } else if (entry.status === "FAILED") {
                    console.log("reloadCover", "[reuse][FAILED]", entry);
                    reject(entry);
                }
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
                    console.log("reloadCover", "[new][COMPLETE]", entry)
                })
                .catch(_ => {
                    entry.status = "FAILED";
                    reject(entry);
                    console.log("reloadCover", "[new][FAILED]", entry)
                });
        }
    }));
}