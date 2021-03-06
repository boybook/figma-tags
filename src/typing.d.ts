// 定义UI与figma插件的传输数据结构
declare namespace Transfer {

    type ClientStorageGetRequest = {
        key: string
    }

    type ClientStorageGetResult = {
        key: string,
        result: string
    }

    type ClientStorageSetRequest = {
        key: string,
        data: string
    }

    type ClientStorageSetResult = {
        key: string,
        suc: boolean
    }

    type DocumentPluginData = {
        key: string,
        value: string
    }

    type DocumentPluginDataSetResult = {
        key: string,
        suc: boolean
    }

    type CurrentSelection = {
        type: 'PAGE' | 'FRAME' | 'DOCUMENT',
        id: string,
        name: string,
        width: number
    }

    type Page = 'PageNode' | 'PageSetting' | 'PageSelect'

    type InitData = {
        language: string,
        accessToken?: string,
        userId: string
        userName: string,
        provider: string,
        nodeType: 'document' | 'frame',
        page: Page,
        fileId?: string,
        selection: CurrentSelection,
    }

    type CanvasSignNode = {
        fullTags: string,
        node: string
    }

    type WindowResize = {
        width: number,
        height: number
    }

    type TagColor = {
        name?: string,
        color: RGBA,
        background: RGBA
    }

    type TagRename = {
        [nameFrom: string]: string
    }

    type TagRenameGroup = {
        [type: string]: TagRename
    }

    type ProviderConfig =
        {
            type: 'document'
        } |
        {
            type: 'local'
        } |
        {
            type: 'notion',
            token: string,
            database: string
        } |
        {
            type: 'cloud',
            uuid: string
        }

    type NodeRename = {
        nodeId: string,
        name: string
    }
}

// 定义Tag、Node相关的数据储存的数据结构
declare namespace Storage {

    type Tag = {
        id: string,
        name: string,
        color: RGBA
        background: RGBA
    }

    type TagGroup = {
        name: string,
        view_sort?: ViewSort,
        tags: Storage.Tag[]
    }

    // tag_type, TagGroup
    type FullTags = Map<string, TagGroup>

    type NodeTags = {
        [tagType: string]: string[]  // 这边的tag是id，需要去对照上面的FullTags配置里取到
    }

    type Node = {
        title: string,
        file_id: string,
        node_id: string,
        width?: number,
        cover?: string,
        url?: string,
        tags: NodeTags
    }

    // file_id#node_id, Node （仅用于Local）
    type FullNodes = {
        [index: string]: Storage.Node
    }

    type ViewSort = {
        type: string,
        order: 'ASC' | "DESC"
    }

}

// 定义UI运行时的数据结构
declare namespace Context {

    type Tag = {
        isNew: boolean,  // 是否为伪保存中新建的
        check: boolean,  // 是否勾选
        id: string,
        name: string,
        color: RGBA
        background: RGBA
    }

    // 通过 / 分了一级之后的tag
    type ClassifiedTags = Map<string, Context.Tag[]>

    type TagType = {
        type: string,  // 类型名称
        view_sort?: Storage.ViewSort,
        tags: ClassifiedTags
    }

    type TagTree = TagType[]

    type Node = {
        saved: boolean,
        title: string,
        file_id: string,
        node_id: string,
        width?: number,
        cover?: string,
        url?: string,
        tags: Storage.NodeTags
    }

}