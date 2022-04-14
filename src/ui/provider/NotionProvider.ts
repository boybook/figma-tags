import { Client } from "@notionhq/client";
import DataProvider from "./DataProvider";
import * as Utils from "../utils";

export class NotionProvider implements DataProvider {

    type: string = 'notion';

    private notion : Client;
    private readonly database: string;

    private fullTags?: Storage.FullTags;

    constructor(token: string, database: string) {
        this.notion = new Client({
            baseUrl: "https://notion.boybook.workers.dev/https://api.notion.com",
            auth: token,
        });
        this.database = database;
    }

    testError = async () => {
        try {
            await this.notion.databases.retrieve({ database_id: this.database });
        } catch (e) {
            return e;
        }
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
        return Promise.resolve(undefined);
    }

    saveNode = async (fileId: string, nodeId: string, node: Storage.Node): Promise<void> => {
        return;
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
            await this.notion.pages.update({
                page_id: nodeId,
                cover: {
                    type: "external",
                    external: node.cover?.endsWith(".png") ? {
                        url: node.cover
                    } : undefined
                },
                properties: properties
            });
            const childList = await this.notion.blocks.children.list({
                block_id: response.results[0].id,
                page_size: 50,
            });
            for (let child of childList.results) {
                if (child['type'] === 'embed') {
                    if (child['embed']['url'].startsWith("https://www.figma.com/embed")) {
                        await this.notion.blocks.update({
                            block_id: child.id,
                            embed: {
                                url: 'https://www.figma.com/embed?embed_host=notion&url=' + encodeURIComponent(url)
                            }
                        });
                    } else if (child['embed']['url'].includes("amazonaws.com")) {
                        await this.notion.blocks.update({
                            block_id: child.id,
                            embed: {
                                url: node.cover
                            }
                        });
                    }
                }
            }
        } else {
            // 新建
            properties['URL'] = {
                url: url
            }
            await this.notion.pages.create({
                parent: {
                    database_id: this.database,
                },
                cover: {
                    type: "external",
                    external: node.cover?.endsWith(".png") ? {
                        url: node.cover
                    } : undefined
                },
                properties: properties,
                children: [
                    node.cover ? (
                        node.cover?.endsWith(".png") ?
                            {
                                type: "image",
                                image: {
                                    type: "external",
                                    external: {
                                        url: node.cover
                                    }
                                }
                            }
                            :
                            {
                                type: "embed",
                                embed: {
                                    url: node.cover
                                }
                            }
                    ) : undefined,
                    {
                        type: "embed",
                        embed: {
                            url: 'https://www.figma.com/embed?embed_host=notion&url=' + encodeURIComponent(url)
                        },
                    },
                ]
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

}