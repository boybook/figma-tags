import DataProvider from "./DataProvider";

export interface BlobProvider {
    storageGet: (key: string) => Promise<any>
    storageSet: (key: string, data: any) => Promise<void>
}

export class DataProviderBlobSave implements DataProvider {

    type = 'local';

    private blob: BlobProvider;

    private fullTags?: Storage.FullTags;
    private fullNodes?: Storage.FullNodes;

    constructor(helper: BlobProvider) {
        this.blob = helper;
    }

    // 本地数据始终验证通过
    testError = () => undefined;

    getFullTags = async (reload: boolean) => {
        if (!reload && this.fullTags) {
            return this.fullTags;
        }
        let result = await this.blob.storageGet('tags');
        if (!result) result = "[]";
        console.log("getFullTags", result);
        this.fullTags = <Storage.FullTags> new Map(JSON.parse(result));
        return this.fullTags;
    }

    renameTagType = async (from: string, to: string) => {
        const old = await this.getFullTags(false);
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

    handleTagDelete = async (type: string, tags: string[]) => {
        const full = await this.getFullNodes();
        for (let key in full) {
            if (full[key].tags[type]) {
                full[key].tags[type] = full[key].tags[type].filter(t => !tags.find(t0 => t === t0))
            }
        }
        await this.setFullNodes(full);
    }

    updateFullTags = async (full: Storage.FullTags, tagRenames: Transfer.TagRenameGroup) => {
        const old = await this.getFullTags(false);
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
                const missingTag = oldTagType.tags.filter(tag => !obj.tags.find(t => t.name === tag.name)).map(t => t.name);
                if (missingTag.length > 0) {
                    console.log("missingTag", t, missingType);
                    await this.handleTagDelete(t, missingTag);
                }
            }
        }

        // 使用Storage.Tag重新组装FullTags
        const newTags = new Map();
        for (let [t, obj] of full.entries()) {
            newTags.set(t, {
                name: obj.name,
                view_sort: obj.view_sort,
                tags: obj.tags.map(tag => ({
                    name: tag.name,
                    color: tag.color,
                    background: tag.background
                }))
            })
        }

        await this.setFullTags(newTags);
    }

    // BLOB SAVE ONLY
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
        full[fileId + "#" + nodeId] = {
            title: node.title,
            file_id: node.file_id,
            node_id: node.node_id,
            width: node.width,
            cover: node.cover,
            tags: node.tags
        };
        await this.setFullNodes(full);
    }

    deleteNode = async (fileId: string, nodeId: string) => {
        const full = await this.getFullNodes();
        delete full[fileId + "#" + nodeId];
        await this.blob.storageSet('nodes', JSON.stringify(full));
    }

    selectNodes = async (tagType: string, tag: string, viewSort?: Storage.ViewSort) => {
        const array = <Storage.Node[]> Object.values(await this.getFullNodes());
        const filter = <Storage.Node[]> array
            .filter(n => n.tags[tagType])
            .filter(n => n.tags[tagType]?.find(t => t === tag));
        if (viewSort) {
            const fullTags = await this.getFullTags(false);
            const sortBase = fullTags.get(viewSort.type)?.tags;
            if (sortBase) {
                return filter.sort((n1, n2) => {
                    const n1Tags = n1.tags[viewSort.type];
                    const n1TagIndex = (n1Tags && n1Tags.length > 0) ? sortBase.findIndex(t => t.name === n1Tags[0]) : -1;
                    const n2Tags = n2.tags[viewSort.type];
                    const n2TagIndex = (n2Tags && n2Tags.length > 0) ? sortBase.findIndex(t => t.name === n2Tags[0]) : -1;
                    return viewSort.order === 'ASC' ? n1TagIndex - n2TagIndex : n2TagIndex - n1TagIndex;
                });
            } else {
                return filter;
            }
        } else {
            return filter;
        }
    }

    setViewSort = async (tagType: string, sort?: Storage.ViewSort) : Promise<void> => {
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