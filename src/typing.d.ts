// 定义UI与figma插件的传输数据结构
declare namespace TransferDeclare {

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

    type CurrentSelection = {
        file_id: string,
        node: {
            type: 'PAGE' | 'FRAME',
            id: string,
            name: string
        }
    }
}

// 定义Tag、Node相关的数据结构
declare namespace DataDeclare {

    type Tag = {
        name: string,
        color: RGBA
    }

    type TagGroup = {
        name: string,
        tags: [ DataDeclare.Tag ]
    }

    // tag_type, TagGroup
    type FullTags = {
        [tagType: string]: TagGroup
    }

    type Node = {
        title: string,
        file_id: string,
        node_id: string,
        cover?: string,
        tags: {
            [tagType: string]: [DataDeclare.Tag]
        }
    }

    // file_id#node_id, Node （仅用于Local）
    type FullNodes = {
        [index: string]: DataDeclare.Node
    }

}