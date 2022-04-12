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
            node: "Saving Node...{0}",
            tag: "Saving Tag..."
        },
        delete: {
            node: "Deleting Node..."
        },
        button: {
            save: "Save",
            cancel: "Cancel",
            ignore: "Ignore",
            ok: "OK"
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
            unset: "Not set",
            current_file: {
                title: "File ID",
                reset: "Reset"
            },
            access_token: {
                title: "Figma Access Token",
                set: "Edit"
            },
            provider: {
                title: "Data Provider",
                local: "Local",
                cloud: "Cloud",
                oss: "Custom OSS",
                notion: "Notion",
                local_title: "Congratulations, no configuration required",
                local_content: "Data is stored locally, but only for personal use. If multiple people collaborate, switch data sources.",
                cloud_title: "Coming soon!",
                cloud_content: "It is possible that data hosting services will be provided in the future, and you will be able to exchange tags across Figma accounts simply by logging in."
            }
        },
        access: {
            title: "License for Preview Images",
            intro: "Authorization to Figma Access Token is required for display of preview images.",
            step1: "Step1: Open the URL.",
            step2: "Step2：Click and paste the Access Token to the Input below.",
            placeholder: "Please input the token",
            error: "Maybe the token is incorrect?"
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
            node: "加载 Node 中...",
        },
        saving: {
            node: "保存 Node 中...{0}",
            tag: "保存 Tag 中..."
        },
        delete: {
            node: "删除 Node 中..."
        },
        button: {
            save: "保 存",
            cancel: "取 消",
            ignore: "忽 略",
            ok: "确 定"
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
            unset: "未设置",
            current_file: {
                title: "当前文件FileID",
                reset: "重新输入"
            },
            access_token: {
                title: "Figma Access Token",
                set: "修改"
            },
            provider: {
                title: "数据源",
                local: "本地",
                cloud: "云端",
                oss: "自定义OSS",
                notion: "Notion",
                local_title: "恭喜，无需配置",
                local_content: "数据保存在本地，但是只能个人本地使用。\n如需多人互通数据，需要切换数据源。",
                cloud_title: "敬请期待！",
                cloud_content: "后续可能将提供数据托管服务，只需登录，即可跨Figma账号互通标签。"
            }
        },
        access: {
            title: "授权预览图",
            intro: "为了后续展示预览图，需要授权获取 Figma Token",
            step1: "第1步：点击打开网页",
            step2: "第2步：点击如图所示位置，复制生成的 access token 到下方输入框中",
            placeholder: "请点击网页中如图所示位置，获取token",
            error: "似乎你输入的token不正确？"
        }
    }
}