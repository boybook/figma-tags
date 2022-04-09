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
        if (!result) result = "[]";
        this.fullTags = <Storage.FullTags> new Map(JSON.parse(result));
        // 如果没有取到，那么会返回默认的tags
        if (this.fullTags.size === 0) {
            this.fullTags.set('Default',
                {
                    name: 'Default',
                    tags: [
                        Utils.defaultTag("Tag", false)
                    ]
                }
            )
        }
        return this.fullTags;
    }

    renameTagType = async (from: string, to: string) => {
        const old = await this.getFullTags();
        const newMap: (Map<string, Storage.TagGroup>) = new Map<string, Storage.TagGroup>();

        for (let [t, obj] of old.entries()) {
            // type重命名
            const newType = t === from ? to : t;
            obj.name = newType;
            newMap.set(newType, obj);
        }

        if (!newMap.has(to)) {
            newMap.set(to, {
                name: to,
                tags: []
            });
        }

        await this.setFullTags(newMap);

        const fullNodes = await this.getFullNodes();
        for (let node of Object.values(fullNodes)) {
            for (let t in node.tags) {
                if (t === from) {
                    node.tags[to] = node.tags[t];
                    delete node.tags[t];
                }
            }
        }

        await this.setFullNodes(fullNodes);
    }

    handleTagTypeDelete = async (types: string[]) => {
        const fullNodes = await this.getFullNodes();
        for (let node of Object.values(fullNodes)) {
            for (let type in node.tags) {
                for (let t of types) {
                    if (type === t) {
                        delete node.tags[type];
                    }
                }
            }
        }
        await this.setFullNodes(fullNodes);
    }

    handleTagRename = async (renames: Transfer.TagRenameGroup) => {
        const fullNodes = await this.getFullNodes();
        for (let node of Object.values(fullNodes)) {
            for (let type in renames) {
                if (node.tags[type]) {
                    for (let from in renames[type]) {
                        for (let index in node.tags[type]) {
                            if (node.tags[type][index] === from) {
                                node.tags[type][index] = renames[type][from];
                            }
                        }
                    }

                }
            }
        }
        await this.setFullNodes(fullNodes);
    }

    handleTagDelete = async (type: string, tags: Storage.Tag[]) => {

    }

    updateFullTags = async (full: Storage.FullTags, tagRenames: Transfer.TagRenameGroup) => {
        const old = await this.getFullTags();
        const oldRename: (Map<string, Storage.TagGroup>) = new Map<string, Storage.TagGroup>();

        // 对old进行重命名，用于后续比对（等于服务端先模拟跑重命名，然后才能验证删除等信息）
        for (let [t, obj] of old.entries()) {
            // tag重命名
            if (tagRenames[t]) {
                for (let tag of obj.tags) {
                    if (tagRenames[t][tag.name]) {
                        tag.name = tagRenames[t][tag.name];
                    }
                }
            }
            oldRename.set(t, obj);
        }
        await this.handleTagRename(tagRenames);

        // 寻找被删除的type
        const missingType = [...oldRename.keys()].filter(oldKey => ![...full.keys()].find(t => t === oldKey));
        console.log("missingType", missingType);
        await this.handleTagTypeDelete(missingType);

        // 对比oldRename与full，寻找被删除的tags
        for (let [t, obj] of full.entries()) {
            const oldTagType = oldRename.get(t);
            if (oldTagType) {
                const missingTag = oldTagType.tags.filter(tag => !obj.tags.find(t => t.name === tag.name));
                if (missingTag.length > 0) {
                    console.log("missingTag", t, missingType);
                    await this.handleTagDelete(t, missingTag);
                }
            }
        }

        await this.setFullTags(full);
    }

    setFullTags = async (fullTags: Storage.FullTags) => {
        await this.blob.storageSet('tags', JSON.stringify([...fullTags]));
        this.fullTags = fullTags;
    }

    // BLOB SAVE ONLY
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

    // BLOB SAVE ONLY
    setFullNodes = async (full: Storage.FullNodes) : Promise<void> => {
        if (full) {
            await this.blob.storageSet('nodes', JSON.stringify(full));
            this.fullNodes = full;
        }
    }

    getNode = async (fileId: string, nodeId: string) => {
        const full = await this.getFullNodes();
        return full[fileId + "#" + nodeId];
    }

    saveNode = async (fileId: string, nodeId: string, node: Storage.Node) => {
        const full = await this.getFullNodes();
        full[fileId + "#" + nodeId] = node;

        await this.setFullNodes(full);
    }

    deleteNode = async (fileId: string, nodeId: string) => {
        const full = await this.getFullNodes();
        delete full[fileId + "#" + nodeId];
        await this.blob.storageSet('nodes', JSON.stringify(full));
    }

    selectNodes = async (tagType: string, tag: string, sortTagType?: string) => {
        const array = <Storage.Node[]> Object.values(await this.getFullNodes());
        const filter = <Storage.Node[]> array
            .filter(n => n.tags[tagType])
            .filter(n => n.tags[tagType]?.find(t => t === tag));
        if (sortTagType) {
            const fullTags = await this.getFullTags();
            const sortBase = fullTags.get(sortTagType)?.tags;
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