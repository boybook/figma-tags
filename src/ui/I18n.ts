export const messages = {
    en: {
        page: {
            tags: "Tags",
            preview: "Preview"
        },
        type: {
            document: "File",
            document_notify: "📖  Toggled to 'File', Tagging to the whole file.",
            frame: "Frame",
            frame_notify: "🏷  Toggled to 'Frame', please select a frame to tag it."
        },
        file_id: {
            placeholder: "Start with the file URL",
            help: "⌘ + L to COPY",
            intro: "Due to plugin API limitations, you need to manually fill in the file URL to locate your design.",
            error: "The URL is not a Figma file link"
        },
        loading: {
            init: "Initializing...",
            node: "Loading the Node...",
            error: "Something wrong happened! Try to restart the plugin?"
        },
        saving: {
            node: "Saving the Node...{0}",
            tag: "Saving Tags...",
            notify: "✅  {0} Saved"
        },
        delete: {
            node: "Deleting the Node...",
            notify: "🗑  {0} Deleted"
        },
        button: {
            save: "Save",
            cancel: "Cancel",
            ignore: "Ignore",
            ok: "OK"
        },
        default_tag: {
            type: "Status",
            draft: "Draft",
            approved: "Approved",
            work_in_progress: "Work in progress",
            revised: "Revised",
            complete: "Complete",
            on_hold: "On hold",
            ready_for_review: "Ready for review",
            ready_for_dev: "Ready for dev"
        },
        tag_type: {
            add: {
                button: "New type",
                title: "Add a new type: ",
                placeholder: "Type name"
            },
            edit: {
                confirm: "Rename to \"{0}\"?\n\nIt will be updated to other nodes."
            },
            delete: {
                confirm: "Delete the type \"{0}\"?\n\nIt will be updated to other nodes."
            }
        },
        tag: {
            add: {
                button: "New Tag",
                placeholder: "The tag name"
            },
            edit: {
                confirm: "Save the tag \"{0}\"?"
            },
            delete: {
                confirm: "Delete the tag \"{0}\"?"
            }
        },
        lookup: {
            back: "Back",
            to_tags: "Tags",
            refresh: "{0} covers refreshing...",
            sort: "Sort",
            empty_title: "Nothing here",
            empty_intro: "You will easily manage everything across files",
            empty_button: "Start Now",
            alert: {
                token: "Previews require the Figma Token license to generate.",
                token_file: "Previews require the Figma Token license and File URL to generate.",
                button: "License"
            }
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
                title: "Data Source",
                init_failed: "😵  Data Source connection failure!",
                document: {
                    name: "Document",
                    title: "Storage in the Document",
                    content: "Stored in the Figma document, but data is not communicated between files. Switch to another data source if you want to cross files."
                },
                local: {
                    name: "Local",
                    title: "Stored in this device",
                    content: "Data is stored locally, but only for personal use. If multiple people collaborate, switch data sources.",
                    export_json: "Export JSON",
                    export_json_fail: "JSON export failed!",
                    import_json: "Import JSON",
                    import_json_suc: "✅  Import success!",
                    import_json_error: "Import failed, something missing in the file?"
                },
                cloud: {
                    name: "Cloud",
                    title: "Coming soon!",
                    content: "Data hosting services with full features, and you will be able to teamwork across Figma accounts through UUID.",
                    uuid_empty: "Enter the UUID first"
                },
                oss: {
                    name: "Custom OSS"
                },
                notion: {
                    name: "Notion",
                    content: "Connect to your Notion database",
                    link_token: "Get",
                    token: "Notion token",
                    database: "Notion database",
                    token_placeholder: "Notion token here",
                    query_database: "List Databases",
                    query_select: "Please select",
                    query_error: "The token is incorrect",
                    query_empty: "Empty database",
                    database_empty: "Select your database first!"
                },
            },
            report: "Report"
        },
        access: {
            token: {
                title: "License for Figma Token",
                intro: "Authorization to Figma Access Token is required for generating preview images.",
                step1: "Step1: Open the URL.",
                step2: "Step2: Click and paste the Access Token below.",
                placeholder: "Paste the token here",
                error: "Maybe the token is incorrect?",
                demo: "Sample",
                suc: "✅  Figma Token saved!"
            },
            file_id: {
                title: "Locate the File URL",
                intro: "Due to plugin API limitations, you need to manually fill in the file URL to locate your design.",
                step1: "Step1: ⌘ + L to COPY URL",
                step2: "Step2: Paste the URL below",
                placeholder: "Paste the URL here",
                error: "The URL is not a Figma file link",
                suc: "✅  File ID saved!"
            }
        }
    },
    ch: {
        page: {
            tags: "打标签",
            preview: "预览整理"
        },
        type: {
            document: "文件",
            document_notify: "📖  已切换至「文件」，将给整个文件打标签",
            frame: "Frame",
            frame_notify: "🏷  已切换至「Frame」，请选中Frame来打标签"
        },
        file_id: {
            placeholder: "从录入文件 URL 开始",
            help: "在画布上 ⌘ + L 复制 URL",
            intro: "为何要录入？由于插件API限制，需要手动填写该文件URL，这样才能跨文件定位到你的设计 :)",
            error: "似乎你输入的不是 Figma 链接"
        },
        loading: {
            init: "加载中...",
            node: "加载 Node 中...",
            error: "发生了一些错误！尝试重启一下插件？"
        },
        saving: {
            node: "保存 Node 中...{0}",
            tag: "保存 Tag 中...",
            notify: "✅  {0} 已保存"
        },
        delete: {
            node: "删除 Node 中...",
            notify: "🗑  {0} 已删除"
        },
        button: {
            save: "保 存",
            cancel: "取 消",
            ignore: "跳 过",
            ok: "确 定",
            next: "下一步"
        },
        default_tag: {
            type: "设计状态",
            draft: "草稿",
            approved: "已评审",
            work_in_progress: "正在进行",
            revised: "修改中",
            complete: "已完成",
            on_hold: "挂起",
            ready_for_review: "待评审",
            ready_for_dev: "待开发"
        },
        tag_type: {
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
                confirm: "确认删除 \"{0}\"？"
            }
        },
        lookup: {
            back: "返回",
            to_tags: "Tags",
            refresh: "{0}个封面刷新中...",
            sort: "排序",
            empty_title: "这里看起来空空如也",
            empty_intro: "你将在此方便地「跨文件」管理所有内容",
            empty_button: "从打标签开始",
            alert: {
                token: "部分预览图需要授权 Figma Token 来生成",
                token_file: "部分预览图需要授权 Figma Token 和 填写文件URL 来生成",
                button: "前往授权"
            }
        },
        settings: {
            title: "设置",
            unset: "未设置",
            current_file: {
                title: "当前文件 FileID",
                reset: "重新输入"
            },
            access_token: {
                title: "Figma Access Token",
                set: "修改"
            },
            provider: {
                title: "数据源",
                init_failed: "😵  似乎连不上数据源呀！",
                document: {
                    name: "文档",
                    title: "储存在文档中",
                    content: "在Figma的各文件中储存，可多人在同一文件中协作。但是在多个文件之间，数据不互通，如需跨文件，请切换至其他数据源。"
                },
                local: {
                    name: "本地",
                    title: "储存在本机",
                    content: "数据保存在本地，但是只能个人本机使用。\n如需多人协作，请切换数据源。",
                    export_json: "导出JSON",
                    export_json_fail: "JSON导出失败！",
                    import_json: "导入JSON",
                    import_json_suc: "✅  导入成功!",
                    import_json_error: "导入失败，可能是文件中缺少了部分内容！"
                },
                cloud: {
                    name: "云储存",
                    title: "云储存",
                    content: "支持完整功能的云储存。如需协作，可让他人填入该UUID。",
                    uuid_empty: "请先输入UUID"
                },
                oss: {
                    name: "自定义OSS"
                },
                notion: {
                    name: "Notion",
                    content: "连接到你的 Notion database，但是由于 Notion API 限制，部分排序、重命名、删除等功能无法正常使用。",
                    link_token: "获取",
                    token: "Notion token",
                    database: "Notion database",
                    token_placeholder: "请获取 token 后输入",
                    query_database: "列出并选择 Database",
                    query_select: "请选择",
                    query_error: "你输入的 token 似乎不正确？",
                    query_empty: "你的 Notion 账号下没有可选择的 database",
                    database_empty: "请先选择你的 database"
                },
            },
            report: "反馈"
        },
        access: {
            token: {
                title: "授权生成预览图",
                intro: "为了后续展示预览图，需要授权获取 Figma Token",
                step1: "第1步：点击打开网页",
                step2: "第2步：点击如图所示位置，复制生成的 access token 到下方输入框中",
                placeholder: "请点击网页中如图所示位置，获取token",
                error: "似乎你输入的token不正确？",
                demo: "示例图",
                suc: "✅  Figma Token 已保存"
            },
            file_id: {
                title: "填写文件URL",
                intro: "由于插件API限制，需要手动填写该文件URL，这样才能跨文件定位到你的设计 :)",
                step1: "第1步：在画布上 ⌘ + L 复制 URL",
                step2: "第2步：填入下方输入框",
                placeholder: "将文件URL复制在此",
                error: "似乎你输入的不是 Figma 链接",
                suc: "✅  文件ID 已保存"
            }
        }
    }
}