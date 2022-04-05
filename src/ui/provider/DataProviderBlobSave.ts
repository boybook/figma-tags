import DataProvider from "./DataProvider";

export interface BlobProvider {
    storageGet: (key: string) => Promise<any>
    storageSet: (key: string, data: any) => Promise<void>
}

export class DataProviderBlobSave implements DataProvider {

    private blob: BlobProvider;

    private fullTags?: DataDeclare.FullTags;
    private fullNodes?: DataDeclare.FullNodes;

    constructor(helper: BlobProvider) {
        this.blob = helper;
    }

    getFullTags = async () => {
        return this.fullTags ? this.fullTags : this.reloadFullTags();
    }

    reloadFullTags = async () => {
        this.fullTags = <DataDeclare.FullTags> JSON.parse(await this.blob.storageGet('tags'));
        return this.fullTags;
    }

    setFullTags = async (fullTags: DataDeclare.FullTags) => {
        await this.blob.storageSet('tags', JSON.stringify(fullTags));
    }

    getFullNodes = async () : Promise<DataDeclare.FullNodes> => {
        if (this.fullNodes) {
            return this.fullNodes;
        } else {
            this.fullNodes = <DataDeclare.FullNodes> JSON.parse(await this.blob.storageGet('nodes'));
            return this.fullNodes;
        }
    }

    getNode = async (fileId: string, nodeId: string) => {
        const full = await this.getFullNodes();
        return full[fileId + "#" + nodeId];
    }

    saveNode = async (fileId: string, nodeId: string, node: DataDeclare.Node) => {
        const full = await this.getFullNodes();
        full[fileId + "#" + nodeId] = node;
        await this.blob.storageSet('nodes', JSON.stringify(full));
    }

    deleteNode = async (fileId: string, nodeId: string) => {
        const full = await this.getFullNodes();
        delete full[fileId + "#" + nodeId];
        await this.blob.storageSet('nodes', JSON.stringify(full));
    }

    selectNodes = async (tagType: string, tag: string, sortTagType?: string) => {
        const array = <[DataDeclare.Node]> Object.values(await this.getFullNodes());
        const filter = <[DataDeclare.Node]> array
            .filter(n => n.tags[tagType])
            .filter(n => n.tags[tagType]?.find(t => t.name === tag));
        if (sortTagType) {
            const fullTags = await this.getFullTags();
            const sortBase = fullTags[sortTagType]?.tags;
            if (sortBase) {
                return filter.sort((n1, n2) => {
                    const n1Tags = n1.tags[sortTagType];
                    const n1TagIndex = (n1Tags && n1Tags.length > 0) ? sortBase.findIndex(t => t.name === n1Tags[0].name) : -1;
                    const n2Tags = n2.tags[sortTagType];
                    const n2TagIndex = (n2Tags && n2Tags.length > 0) ? sortBase.findIndex(t => t.name === n2Tags[0].name) : -1;
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

