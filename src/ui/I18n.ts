export const messages = {
    en: {
        file_id: {
            placeholder: "Start by typing the file URL",
            help: "⌘ + L to COPY",
            intro: "Due to plugin API limitations, you need to manually fill in the file URL to locate your design.",
            error: "The URL is not a Figma file link"
        },
        loading: {
            node: "Loading Node...",
        },
        saving: {
            node: "Saving Node...",
            tag: "Saving Tag..."
        },
        button: {
            save: "Save",
            cancel: "Cancel"
        },
        tag_type: {
            default: "Default",
            add: {
                button: "Add a type",
                title: "Add a new type: ",
                placeholder: "Type name"
            },
            edit: {
                confirm: "Rename to \"{0}\"?\n\nIt will be updated to other nodes."
            },
            delete: {
                confirm: "Delete the Type \"{0}\"?\n\nIt will be updated to other nodes."
            }
        },
        tag: {
            add: {
                button: "New Tag",
                placeholder: "The tag name"
            },
            edit: {
                confirm: "Save the tag \"{0}\"？"
            },
            delete: {
                confirm: "Delete the tag \"{0}\"?"
            }
        },
        lookup: {
            back: "Back"
        },
        settings: {
            title: "Settings",
            provider: {
                title: "Data Provider",
                local: "Local",
                cloud: "Cloud",
                oss: "Custom OSS",
                notion: "Notion"
            }
        }
    },
    ch: {
        file_id: {
            placeholder: "从录入文件 URL 开始",
            help: "在画布上 ⌘ + L 复制URL",
            intro: "为何要录入？由于插件API限制，需要手动填写该文件URL，这样才能跨文件定位到你的设计 :)",
            error: "似乎你输入的不是Figma链接"
        },
        loading: {
            node: "加载Node中...",
        },
        saving: {
            node: "保存Node中...",
            tag: "保存Tag中..."
        },
        button: {
            save: "保 存",
            cancel: "取 消",
        },
        tag_type: {
            default: "默认分类",
            add: {
                button: '新建分类',
                title: '新建分类：',
                placeholder: "分类名称"
            },
            edit: {
                confirm: "确认重命名为 \"{0}\"?\n\n重命名后，将同时更新到其他Node"
            },
            delete: {
                confirm: "确认删除分类 \"{0}\"?\n\n删除后，将同时更新到其他Node"
            }
        },
        tag: {
            add: {
                button: "新建Tag",
                placeholder: "Tag名称"
            },
            edit: {
                confirm: "确认保存 \"{0}\"？"
            },
            delete: {
                confirm: "确认删除 \"{0}\"?"
            }
        },
        lookup: {
            back: "返回"
        },
        settings: {
            title: "设置",
            provider: {
                title: "数据源",
                local: "本地",
                cloud: "云端",
                oss: "自定义OSS",
                notion: "Notion"
            }
        }
    }
}