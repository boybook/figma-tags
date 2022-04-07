export default interface DataProvider {

    // Tag

    // 获取所有 Tag（将会缓存）
    getFullTags: () => Promise<Storage.FullTags>
    // 重新加载所有 Tag（将会刷新缓存）
    reloadFullTags: () => Promise<Storage.FullTags>
    // 设置Tags（添加、删除、重新排序）
    setFullTags: (fullTags: Storage.FullTags) => Promise<void>

    // Node

    // 获取 Node（根据 file_id, node_id）
    getNode: (fileId: string, nodeId: string) => Promise<Storage.Node | undefined>
    // 保存 Node（根据 file_id, node_id）
    saveNode: (fileId: string, nodeId: string, node: Storage.Node) => Promise<void>
    // 删除 Node（根据 file_id, node_id）
    deleteNode: (fileId: string, nodeId: string) => Promise<void>
    // 获取 Node 列表（根据tagType+tag，排序）
    selectNodes: (tagType: string, tag: string, sortTagType?: string) => Promise<[Storage.Node]>

}