import { Client } from "@notionhq/client";
import DataProvider from "./DataProvider";
import * as Utils from "../utils";
import { storageGet, storageSet } from "./blob/BlobLocalProvider";

export class NotionProvider implements DataProvider {

    type: string = 'notion';

    private readonly token: string;
    private readonly notion : Client;
    private readonly database: string;

    private fullTags?: Storage.FullTags;

    constructor(token: string, database: string) {
        this.token = token;
        this.notion = new Client({
            baseUrl: "https://notion.boybook.workers.dev/https://api.notion.com",
            auth: token,
        });
        this.database = database;
    }

    testError = async () => {
        try {
            const result = await this.notion.databases.retrieve({ database_id: this.database });
            // 如果没有URL这个字段，则自动创建（很奇怪，这边用NotionClient库反而没法正常请求
            if (!result.properties['URL'] || result.properties['URL'].type !== "url") {
                await fetch("https://notion.boybook.workers.dev/https://api.notion.com/v1/databases/" + this.database, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': this.token,
                        'Content-Type': 'application/json',
                        'notion-version': '2022-02-22'
                    },
                    body: JSON.stringify({
                        properties: {
                            "URL": {
                                url: {}
                            }
                        }
                    })
                });
            }
            return undefined;
        } catch (e) {
            return e;
        }
    }

    listAllDatabase = async () => {
        const response = await this.notion.search({
            filter: {
                property: "object",
                value: "database"
            }
        });
        return response.results
            .filter(r => r.object === 'database')
            .map(r => {
                const name = r['title'].length > 0 ? r['title'].map(t => t.plain_text).join() : "";
                const id: string = r['id'];
                return {
                    name: name,
                    databaseId: id
                }
            });
    }

    getFullTags = async (reload: boolean) : Promise<Storage.FullTags> => {
        if (!reload && this.fullTags) {
            return this.fullTags;
        }

        const response = await this.notion.databases.retrieve({ database_id: this.database });

        const result : Storage.FullTags = new Map();
        if (response.properties) {
            for (let key in response.properties) {
                if (response.properties[key].type === 'multi_select') {
                    const options : Array<{
                        name: string;
                        id?: string;
                        color?: string;
                    }> = response.properties[key]['multi_select'].options;
                    const tagGroups: Storage.TagGroup = {
                        name: key,
                        tags: []
                    }
                    for (let option of options) {
                        tagGroups.tags.push({
                            name: option.name,
                            background: Utils.tagColors[option.color] ? Utils.tagColors[option.color].background : Utils.tagColors.default.background,
                            color: Utils.tagColors[option.color] ? Utils.tagColors[option.color].color : Utils.tagColors.default.color
                        });
                    }
                    result.set(key, tagGroups);
                }
            }
        }
        const viewConfigJson = await storageGet("notion-view-config");
        const viewConfig = viewConfigJson ? JSON.parse(viewConfigJson) : {};
        for (let tagType in viewConfig) {
            if (result.has(tagType)) {
                result.get(tagType).view_sort = viewConfig[tagType];
            }
        }
        this.fullTags = result;
        return result;
    }

    getNode = async (fileId: string, nodeId: string): Promise<Storage.Node | undefined> => {
        const url = 'https://www.figma.com/file/' + fileId + '/?node-id=' + encodeURIComponent(nodeId);
        const response = await this.notion.databases.query({
            database_id: this.database,
            filter: {
                property: 'URL',
                url: {
                    equals: url,
                },
            },
        });
        if (response.results.length > 0) {
            const e = response.results[0];
            const tags : Storage.NodeTags = {};
            for (let key of Object.keys(e['properties'])) {
                const value = e['properties'][key];
                if (value.type === 'multi_select') {
                    tags[key] = value.multi_select.map(s => s.name);
                }
            }
            return {
                title: e['properties']['Name']['title'].length > 0 ? e['properties']['Name']['title'][0]['plain_text'] : "",
                file_id: fileId,
                node_id: nodeId,
                cover: e['cover']?.external?.url,
                url: e['url'],
                tags: tags
            };
        }
        return undefined;
    }

    renameTagType = async (from: string, to: string): Promise<void> => {
        const update = await fetch("https://notion.boybook.workers.dev/https://api.notion.com/v1/databases/" + this.database, {
            method: 'PATCH',
            headers: {
                'Authorization': this.token,
                'Content-Type': 'application/json',
                'notion-version': '2022-02-22'
            },
            body: JSON.stringify({
                properties: {
                    [from]: {
                        name: to
                    }
                }
            })
        });
    }

    saveNode = async (fileId: string, nodeId: string, node: Storage.Node): Promise<void> => {
        const url = 'https://www.figma.com/file/' + fileId + '/?node-id=' + encodeURIComponent(nodeId);
        const response = await this.notion.databases.query({
            database_id: this.database,
            filter: {
                property: 'URL',
                url: {
                    equals: url,
                },
            },
        });

        const properties = {};

        for (let tagType in node.tags) {
            properties[tagType] = {
                multi_select: []
            };
            for (let tag of node.tags[tagType]) {
                properties[tagType].multi_select.push({
                    name: tag
                });
            }
            properties["Name"] = {
                title: [
                    {
                        type: "text",
                        text: {
                            content: node.title
                        }
                    }
                ]
            }
        }
        if (response.results.length > 0) {
            // 保存
            const update = await fetch("https://notion.boybook.workers.dev/https://api.notion.com/v1/pages/" + response.results[0].id, {
                method: 'PATCH',
                headers: {
                    'Authorization': this.token,
                    'Content-Type': 'application/json',
                    'notion-version': '2022-02-22'
                },
                body: JSON.stringify({
                    cover: node.cover ? {
                        type: "external",
                        external: {
                            url: node.cover
                        }
                    } : undefined,
                    properties: properties
                })
            });
            if (!update.ok) {
                throw "update page failed! " + update.statusText;
            }
            /*await this.notion.pages.update({
                page_id: response.results[0].id,
                cover: {
                    type: "external",
                    external: node.cover ? {
                        url: node.cover
                    } : undefined
                },
                properties: properties
            });*/
            const childList = await this.notion.blocks.children.list({
                block_id: response.results[0].id,
                page_size: 50,
            });
            for (let child of childList.results) {
                if (child['type'] === 'embed') {
                    if (child['embed']['url'].startsWith("https://www.figma.com/embed")) {
                        const update = await fetch("https://notion.boybook.workers.dev/https://api.notion.com/v1/blocks/" + child.id, {
                            method: 'PATCH',
                            headers: {
                                'Authorization': this.token,
                                'Content-Type': 'application/json',
                                'notion-version': '2022-02-22'
                            },
                            body: JSON.stringify({
                                embed: {
                                    url: 'https://www.figma.com/embed?embed_host=notion&url=' + encodeURIComponent(url)
                                }
                            })
                        });
                        if (!update.ok) {
                            throw "update block failed! " + update.statusText;
                        }
                        // await this.notion.blocks.update({
                        //     block_id: child.id,
                        //     embed: {
                        //         url: 'https://www.figma.com/embed?embed_host=notion&url=' + encodeURIComponent(url)
                        //     }
                        // });
                    } else if (child['embed']['url'].includes("amazonaws.com")) {
                        const update = await fetch("https://notion.boybook.workers.dev/https://api.notion.com/v1/blocks/" + child.id, {
                            method: 'PATCH',
                            headers: {
                                'Authorization': this.token,
                                'Content-Type': 'application/json',
                                'notion-version': '2022-02-22'
                            },
                            body: JSON.stringify({
                                embed: {
                                    url: node.cover
                                }
                            })
                        });
                        if (!update.ok) {
                            throw "update block failed! " + update.statusText;
                        }
                        // await this.notion.blocks.update({
                        //     block_id: child.id,
                        //     embed: {
                        //         url: node.cover
                        //     }
                        // });
                    }
                }
            }
        } else {
            // 新建
            properties['URL'] = {
                url: url
            }
            const children = [];
            if (node.cover) {
                if (node.cover.endsWith(".png")) {
                    children.push({
                        type: "image",
                        image: {
                            type: "external",
                            external: {
                                url: node.cover
                            }
                        }
                    });
                } else {
                    children.push({
                        type: "embed",
                        embed: {
                            url: node.cover
                        }
                    });
                }
            }
            children.push({
                type: "embed",
                embed: {
                    url: 'https://www.figma.com/embed?embed_host=notion&url=' + encodeURIComponent(url)
                },
            });
            await this.notion.pages.create({
                parent: {
                    database_id: this.database,
                },
                cover: node.cover ? {
                    type: "external",
                    external: {
                        url: node.cover
                    }
                } : undefined,
                properties: properties,
                children: children
            });
        }
    }

    selectNodes = async(tagType: string, tag: string, viewSort: Storage.ViewSort | undefined): Promise<Storage.Node[]> => {
        const nodes : Storage.Node[] = [];
        const data = await this.notion.databases.query({
            database_id: this.database,
            filter: {
                property: tagType,
                multi_select: {
                    contains: tag
                }
            },
            sorts: viewSort ? [
                {
                    property: viewSort.type,
                    direction: viewSort.order === 'ASC' ? "ascending" : "descending"
                }
            ] : undefined,
            start_cursor: undefined,
            page_size: 100
        });
        for (let e of data.results) {
            const tags : Storage.NodeTags = {};
            for (let key of Object.keys(e['properties'])) {
                const value = e['properties'][key];
                if (value.type === 'multi_select') {
                    tags[key] = value.multi_select.map(s => s.name);
                }
            }
            console.log(e);
            const url = e['properties']['URL']['url'] ? e['properties']['URL']['url'] : "";
            const fileId = url.split('?')[0].replace("https://", '').replace(/([#\/])/g, '&').split('&')[2];
            const args = new Map(url.split('?')[1]?.split('&').map(e => e.split('=')));
            nodes.push({
                title: e['properties']['Name']['title'].length > 0 ? e['properties']['Name']['title'][0]['plain_text'] : "",
                file_id: fileId,
                node_id: args.has('node-id') ? decodeURIComponent(<string> args.get('node-id')) : '',
                cover: e['cover']?.['external']?.['url'],
                url: e['url'],
                tags: tags
            });
        }
        return nodes;
    }

    updateFullTags = async (fullTags: Storage.FullTags, tagRenames: Transfer.TagRenameGroup): Promise<void> => {
        // Notion这边似乎本身就不支持重命名？重命名会导致之前设置这项的被删除
        const body = {
            properties: {}
        };
        fullTags.forEach((v, k) => {
            body.properties[k] = {
                multi_select: {
                    options: v.tags.map(tag => ({
                        name: tag.name,
                        //color: Utils.findColorName(tag) // 不支持修改已有的颜色和名称。。
                    }))
                }
            }
        });
        console.log("NotionProvider.updateFullTags", body);
        const update = await fetch("https://notion.boybook.workers.dev/https://api.notion.com/v1/databases/" + this.database, {
            method: 'PATCH',
            headers: {
                'Authorization': this.token,
                'Content-Type': 'application/json',
                'notion-version': '2022-02-22'
            },
            body: JSON.stringify(body)
        });
        if (!update.ok) {
            throw "updateFullTags failed! " + update.statusText;
        }
    }

    deleteNode = async (fileId: string, nodeId: string): Promise<void> => {
        const url = 'https://www.figma.com/file/' + fileId + '/?node-id=' + encodeURIComponent(nodeId);

        const response = await this.notion.databases.query({
            database_id: this.database,
            filter: {
                property: 'URL',
                url: {
                    equals: url,
                },
            },
        });
        if (response.results.length > 0) {
            for (let node of response.results) {
                await this.notion.blocks.delete({
                    block_id: node.id
                });
            }
        }
    }

    setViewSort = async (tagType: string, sort?: Storage.ViewSort) : Promise<void> => {
        // Notion中不支持设置视图，因此将排序保存到本地
        // Not support in Notion
        const viewConfigJson = await storageGet("notion-view-config");
        const viewConfig = viewConfigJson ? JSON.parse(viewConfigJson) : {};
        viewConfig[tagType] = sort;
        await storageSet("notion-view-config", JSON.stringify(viewConfig));
        if (this.fullTags) {
            if (this.fullTags.has(tagType)) {
                this.fullTags.get(tagType).view_sort = viewConfig[tagType];
            }
        }
    }

}