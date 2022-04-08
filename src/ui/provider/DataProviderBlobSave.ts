import DataProvider from "./DataProvider";

export interface BlobProvider {
    storageGet: (key: string) => Promise<any>
    storageSet: (key: string, data: any) => Promise<void>
}

export default {

    helper: <BlobProvider> undefined,

    fullTags: <Storage.FullTags> undefined,
    fullNodes: <Storage.FullNodes> undefined,

    constructor(helper: BlobProvider) {
        this.helper = helper;
    },

    async getFullTags() : Promise<Storage.FullTags> {
        return this.fullTags ? this.fullTags : this.reloadFullTags();
    },

    async reloadFullTags() : Promise<Storage.FullTags> {
        this.fullTags = <Storage.FullTags> JSON.parse(await this.helper.storageGet('tags'));
        return this.fullTags;
    },

    async setFullTags(fullTags: Storage.FullTags) : Promise<void> {
        await this.helper.storageSet('tags', JSON.stringify(fullTags));
    },

    async getFullNodes() : Promise<Storage.FullNodes> {
        if (this.fullNodes) {
            return this.fullNodes;
        } else {
            this.fullNodes = <Storage.FullNodes> JSON.parse(await this.helper.storageGet('nodes'));
            return this.fullNodes;
        }
    },

    async getNode(fileId: string, nodeId: string) : Promise<Storage.Node | undefined> {
        const full = await this.getFullNodes();
        return full[fileId + "#" + nodeId];
    },

    async saveNode(fileId: string, nodeId: string, node: Storage.Node) : Promise<void> {
        const full = await this.getFullNodes();
        full[fileId + "#" + nodeId] = node;
        await this.helper.storageSet('nodes', JSON.stringify(full));
    },

    async deleteNode(fileId: string, nodeId: string) : Promise<void> {
        const full = await this.getFullNodes();
        delete full[fileId + "#" + nodeId];
        await this.helper.storageSet('nodes', JSON.stringify(full));
    },

    async selectNodes(tagType: string, tag: string, sortTagType?: string) : Promise<[Storage.Node]> {
        const array = <[Storage.Node]> Object.values(await this.getFullNodes());
        const filter = <[Storage.Node]> array
            .filter(n => n.tags[tagType])
            .filter(n => n.tags[tagType] && n.tags[tagType].find(t => t === tag));
        if (sortTagType) {
            const fullTags = await this.getFullTags();
            const sortBase = fullTags[sortTagType] ? fullTags[sortTagType].tags : undefined;
            if (sortBase) {
                return filter.sort((n1, n2) => {
                    const n1Tags = n1.tags[sortTagType];
                    const n1TagIndex = (n1Tags && n1Tags.length > 0) ? sortBase.findIndex(t => t.name === n1Tags[0]) : -1;
                    const n2Tags = n2.tags[sortTagType];
                    const n2TagIndex = (n2Tags && n2Tags.length > 0) ? sortBase.findIndex(t => t.name === n2Tags[0]) : -1;
                    return n1TagIndex - n2TagIndex;
                });
            } else {
                return filter;
            }
        } else {
            return filter;
        }
    }

}

