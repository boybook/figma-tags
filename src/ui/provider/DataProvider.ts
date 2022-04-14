export default interface DataProvider {

    type: string

    /**
     * 验证Provider的配置是否正确，能连上数据
     */
    testError: () => Promise<any>

    // Tag ==========================

    /**
     * 获取所有 Tag（将会缓存）
     */
    getFullTags: (reload: boolean) => Promise<Storage.FullTags>

    /**
     * 重命名某些TagType
     * 如果from不存在，且to也不存在，那么直接新建一个
     * @param renames
     */
    renameTagType: (from: string, to: string) => Promise<void>

    /**
     * 更新FullTags（包含重命名、重新排序、删除等处理）
     * @param renames
     */
    updateFullTags: (fullTags: Storage.FullTags, tagRenames: Transfer.TagRenameGroup) => Promise<void>

    // Node =========================

    /**
     * 获取 Node（根据 file_id, node_id）
     * @param fileId
     * @param nodeId
     */
    getNode: (fileId: string, nodeId: string) => Promise<Storage.Node | undefined>

    /**
     * 保存 Node（根据 file_id, node_id）
     * @param fileId
     * @param nodeId
     * @param node
     * @param newTags 本次新增的Tag（记录了Tag的配色等信息）
     */
    saveNode: (fileId: string, nodeId: string, node: Storage.Node) => Promise<void>

    /**
     * 删除 Node（根据 file_id, node_id）
     * @param fileId
     * @param nodeId
     */
    deleteNode: (fileId: string, nodeId: string) => Promise<void>

    /**
     * 获取 Node 列表（根据tagType+tag，排序）
     * @param tagType
     * @param tag
     * @param sortTagType 根据另一的tag维度排序
     */
    selectNodes: (tagType: string, tag: string, viewSort?: Storage.ViewSort) => Promise<Storage.Node[]>

}