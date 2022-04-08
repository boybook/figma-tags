import DataProvider from "./DataProvider";
import * as Utils from "../utils";

export interface BlobProvider {
    storageGet: (key: string) => Promise<any>
    storageSet: (key: string, data: any) => Promise<void>
}

export class DataProviderBlobSave implements DataProvider {

    private blob: BlobProvider;

    private fullTags?: Storage.FullTags;
    private fullNodes?: Storage.FullNodes;

    constructor(helper: BlobProvider) {
        this.blob = helper;
    }

    getFullTags = async () => {
        return this.fullTags ? this.fullTags : this.reloadFullTags();
    }

    reloadFullTags = async () => {
        let result = await this.blob.storageGet('tags');
        if (!result) result = "{}";
        this.fullTags = <Storage.FullTags> JSON.parse(result);
        // 如果没有取到，那么会返回默认的tags
        if (Object.values(this.fullTags).length === 0) {
            this.fullTags = {
                'Default': {
                    name: 'Default',
                    tags: [
                        {
                            name: "Tag",
                            color: { r: 0, g: 0, b: 0, a: 0.85 },
                            background: { r: 227, g: 226, b: 224, a: 0.5 }
                        }
                    ]
                }
            }
        }
        return this.fullTags;
    }

    setFullTags = async (fullTags: Storage.FullTags) => {
        await this.blob.storageSet('tags', JSON.stringify(fullTags));
    }

    getFullNodes = async () : Promise<Storage.FullNodes> => {
        if (this.fullNodes) {
            return this.fullNodes;
        } else {
            let result = await this.blob.storageGet('nodes');
            if (!result) result = "{}";
            this.fullNodes = <Storage.FullNodes> JSON.parse(result);
            return this.fullNodes;
        }
    }

    getNode = async (fileId: string, nodeId: string) => {
        const full = await this.getFullNodes();
        return full[fileId + "#" + nodeId];
    }

    tryAddTag = async (type: string, tags: (Storage.Tag | string)[]) : Promise<boolean> => {
        let added = false;
        const fullTags = await this.getFullTags();
        if (!fullTags[type]) {
            fullTags[type] = {
                name: type,
                tags: []
            };
            added = true;
        }
        for (let tag of tags) {
            const finalTag: Storage.Tag = typeof tag === 'string' ? Utils.defaultTag(tag) : tag;
            if (!fullTags[type].tags.find(t => t.name === finalTag.name)) {
                fullTags[type].tags.push(finalTag);
                added = true;
            }
        }
        return added;
    }

    saveNode = async (fileId: string, nodeId: string, node: Storage.Node, newTags: Storage.FullTags) => {
        // 把新tag添加到fullTags中
        let tagsChanged = false;
        const fullTags = await this.getFullTags();
        for (let type in newTags) {
            tagsChanged = await this.tryAddTag(type, newTags[type].tags);
        }
        for (let type in node.tags) {
            tagsChanged = await this.tryAddTag(type, node.tags[type]) || tagsChanged;
        }
        if (tagsChanged) {
            await this.setFullTags(fullTags);
        }

        const full = await this.getFullNodes();
        full[fileId + "#" + nodeId] = node;
        console.log("saveNode", full);
        await this.blob.storageSet('nodes', JSON.stringify(full));
    }

    deleteNode = async (fileId: string, nodeId: string) => {
        const full = await this.getFullNodes();
        delete full[fileId + "#" + nodeId];
        await this.blob.storageSet('nodes', JSON.stringify(full));
    }

    selectNodes = async (tagType: string, tag: string, sortTagType?: string) => {
        const array = <[Storage.Node]> Object.values(await this.getFullNodes());
        const filter = <[Storage.Node]> array
            .filter(n => n.tags[tagType])
            .filter(n => n.tags[tagType]?.find(t => t === tag));
        if (sortTagType) {
            const fullTags = await this.getFullTags();
            const sortBase = fullTags[sortTagType]?.tags;
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