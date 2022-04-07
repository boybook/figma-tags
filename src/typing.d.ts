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

    type CurrentSelection = {
        type: 'PAGE' | 'FRAME',
        id: string,
        name: string
    }

    type InitData = {
        file_id?: string,
        selection: CurrentSelection,
    }
}

// 定义Tag、Node相关的数据储存的数据结构
declare namespace Storage {

    type Tag = {
        name: string,
        color: RGBA
        background: RGBA
    }

    type TagGroup = {
        name: string,
        tags: [ Storage.Tag ]
    }

    // tag_type, TagGroup
    type FullTags = {
        [tagType: string]: TagGroup
    }

    type NodeTags = {
        [tagType: string]: string[]  // 这边的tag是纯string，颜色需要去对照上面的FullTags配置里取到
    }

    type Node = {
        title: string,
        file_id: string,
        node_id: string,
        cover?: string,
        tags: NodeTags
    }

    // file_id#node_id, Node （仅用于Local）
    type FullNodes = {
        [index: string]: Storage.Node
    }

}

// 定义UI运行时的数据结构
declare namespace Context {

    type Tag = {
        check: boolean,  // 是否勾选
        name: string,
        color: RGBA
        background: RGBA
    }

    // 通过 / 分了一级之后的tag
    type ClassifiedTags = {
        [subType: string]: Context.Tag[]
    }

    type TagType = {
        type: string,  // 类型名称
        tags: ClassifiedTags
    }

    type TagTree = TagType[]

}