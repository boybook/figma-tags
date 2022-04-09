export default interface DataProvider {

    // Tag ==========================

    /**
     * 获取所有 Tag（将会缓存）
     */
    getFullTags: () => Promise<Storage.FullTags>

    /**
     * 重新加载所有 Tag（将会刷新缓存）
     */
    reloadFullTags: () => Promise<Storage.FullTags>

    /**
     * 完整设置Tags（添加、删除、重新排序）
     * @param fullTags
     */
    setFullTags: (fullTags: Storage.FullTags) => Promise<void>

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
    saveNode: (fileId: string, nodeId: string, node: Storage.Node, newTags: Storage.FullTags) => Promise<void>

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
    selectNodes: (tagType: string, tag: string, sortTagType?: string) => Promise<Storage.Node[]>

}