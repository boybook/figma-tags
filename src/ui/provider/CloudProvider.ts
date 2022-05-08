import DataProvider from "./DataProvider";

const API_URL = 'https://figma-tags-figma-tags-vnviuyqxwp.cn-hangzhou.fcapp.run';

export class CloudProvider implements DataProvider {

    type = 'cloud';
    autoSave = false;

    private readonly uuid: string;

    private fullTags?: Storage.FullTags;

    constructor(uuid: string) {
        this.uuid = uuid;
    }

    async testError(): Promise<any> {
        try {
            const result = await fetch(API_URL + "/user/init/" + this.uuid, {
                method: 'GET',
                headers: {
                    uuid: this.uuid
                }
            });
            if (result.ok) {
                return undefined;
            } else {
                return result.statusText;
            }
        } catch (e) {
            return e;
        }
    }

    async getFullTags(reload: boolean): Promise<Storage.FullTags> {
        if (!reload && this.fullTags) {
            return this.fullTags;
        }
        const result = await fetch(API_URL + "/tags", {
            method: 'GET',
            headers: {
                uuid: this.uuid
            }
        });
        if (result.ok) {
            const data = await result.json();
            console.log("CloudProvider.getFullTags", data);
            const full = new Map<string, Storage.TagGroup>();
            data.result.forEach(d => full.set(d.name, d));
            this.fullTags = full;
            return this.fullTags;
        } else {
            throw result.statusText;
        }
    }

    async updateFullTags(fullTags: Storage.FullTags, tagRenames: Transfer.TagRenameGroup): Promise<void> {
        const result = await fetch(API_URL + "/tags", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                uuid: this.uuid
            },
            body: JSON.stringify({
                tags: [...fullTags.values()],
                renames: tagRenames
            })
        });
        if (result.ok) {
            const data = await result.json();
            console.log("CloudProvider.updateFullTags", data);
            this.fullTags = fullTags;
        } else {
            throw result.statusText;
        }
    }

    async renameTagType(from: string, to: string): Promise<void> {
        const result = await fetch(API_URL + "/tags/" + from + "/?to=" + to, {
            method: 'PATCH',
            headers: {
                uuid: this.uuid
            },
        });
        if (result.ok) {
            const data = await result.json();
            console.log("CloudProvider.renameTagType", data);
        } else {
            throw result.statusText;
        }
    }

    encodeNodeKey(fileId: string, nodeId: string) {
        return fileId + (nodeId ? ("@" + nodeId) : "");
    }

    async getNode(fileId: string, nodeId: string): Promise<Storage.Node | undefined> {
        const result = await fetch(API_URL + "/node/" + encodeURIComponent(this.encodeNodeKey(fileId, nodeId)), {
            method: 'GET',
            headers: {
                uuid: this.uuid
            }
        });
        if (result.ok) {
            const data = await result.json();
            console.log("CloudProvider.getNode", data);
            return data.result;
        } else {
            throw result.statusText;
        }
    }

    async saveNode(fileId: string, nodeId: string, node: Storage.Node): Promise<void> {
        const result = await fetch(API_URL + "/node/" + encodeURIComponent(this.encodeNodeKey(fileId, nodeId)), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                uuid: this.uuid
            },
            body: JSON.stringify(node)
        });
        if (result.ok) {
            const data = await result.json();
            console.log("CloudProvider.saveNode", data);
        } else {
            throw result.statusText;
        }
    }

    async deleteNode(fileId: string, nodeId: string): Promise<void> {
        const result = await fetch(API_URL + "/node/" + encodeURIComponent(this.encodeNodeKey(fileId, nodeId)), {
            method: 'DELETE',
            headers: {
                uuid: this.uuid
            }
        });
        if (result.ok) {
            const data = await result.json();
            console.log("CloudProvider.deleteNode", data);
        } else {
            throw result.statusText;
        }
    }

    async selectNodes(tagType: string, tagId: string, tagName: string, viewSort: Storage.ViewSort | undefined): Promise<Storage.Node[]> {
        let url = API_URL + "/node";
        const params = {
            tag_type: tagType,
            tag: tagId,
            sort_type: viewSort?.type,
            sort_order: viewSort?.order
        };
        let paramsArray = [];
        Object.keys(params).forEach(key => {
            if (params[key]) {
                paramsArray.push(key + '=' + params[key])
            }
        });
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&');
        } else {
            url += '&' + paramsArray.join('&');
        }
        const result = await fetch(url, {
            method: 'GET',
            headers: {
                uuid: this.uuid
            }
        });
        if (result.ok) {
            const data = await result.json();
            console.log("CloudProvider.selectNodes", data);
            return data.result;
        } else {
            throw result.statusText;
        }
    }

    async setViewSort(tagType: string, sort: Storage.ViewSort | undefined): Promise<void> {
        const fullTags = await this.getFullTags(false);
        if (fullTags.has(tagType)) {
            console.log("setViewSort", tagType, sort);
            if (sort) {
                fullTags.get(tagType).view_sort = sort;
            } else {
                delete fullTags.get(tagType).view_sort;
            }
            await this.updateFullTags(fullTags, {});
        }
    }

}