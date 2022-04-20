const exportCover = (fileId: string, nodeId: string, nodeWidth: number, accessToken?: string) : Promise<string> => (
    new Promise<string>(async (resolve, reject) => {
        if (accessToken) {
            try {
                const scale = nodeWidth ? Math.min(4, 512 / nodeWidth) : 0.5;
                const result = await fetch("https://api.figma.com/v1/images/" + fileId + "?ids=" + nodeId + "&scale=" + scale, {
                    headers: {
                        'X-FIGMA-TOKEN': accessToken
                    }
                });
                if (result.ok) {
                    const json = await result.json();
                    if (json.err) {
                        resolve("export cover failed: " + json.err);
                    } else {
                        const url = json.images[nodeId];
                        resolve(url);
                    }
                } else {
                    resolve(result.status + ": " + result.statusText);
                }
                console.log(result);
            } catch (e) {
                reject(e);
            }
        } else {
            resolve(""); // 如果没有token，将会在Search列表进行获取
        }
    })
);

export { exportCover }