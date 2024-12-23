const offset = 63;

const markNode = async (fullTags: Storage.FullTags, nodeData: Storage.Node) => {
    const node: BaseNode = await figma.getNodeByIdAsync(nodeData.node_id);
    if (node && isEmbedNodeLike(node)) {
        node.setRelaunchData({
            'node': nodeData.title,
        });

        const page = getPageNode(node);
        if (page.id === node.id) return;

        const tileNodeId = node.getSharedPluginData("figma_tags", "tile_node_id");
        if (tileNodeId) {
            (await figma.getNodeByIdAsync(tileNodeId))?.remove();
        }

        if (Object.values(nodeData.tags).flat().length === 0) {
            // 没有任何标签
            return;
        }

        const root = figma.createFrame();

        figma.loadFontAsync({ family: "Inter", style: "Semi Bold" }).then(() => {
            //const tagFrames = [];
            root.x = node.x;
            root.y = node.y - offset;

            const tags : Storage.Tag[] = [];
            for (let type in nodeData.tags) {
                if (fullTags.has(type)) {
                    tags.push(...fullTags.get(type).tags.filter(t => nodeData.tags[type].find(t0 => t.id === t0)));
                }
            }

            root.name = tags.map(t => t.name).join();
            root.fills = [];
            root.layoutMode = 'HORIZONTAL';
            root.layoutAlign = 'INHERIT';
            root.layoutGrow = 0;
            root.primaryAxisAlignItems = 'MIN';
            root.primaryAxisSizingMode = 'AUTO';
            root.counterAxisSizingMode = 'AUTO';
            root.itemSpacing = 8;

            tags.forEach(tag => {
                const frame = figma.createFrame();
                // frame.x = node.x;
                // frame.y = node.y - 40;
                frame.name = tag.name;
                const text = figma.createText();
                text.fontName = {
                    family: "Inter",
                    style: "Semi Bold"
                };
                text.lineHeight = { value: 27, unit: 'PIXELS' };
                text.fontSize = 18;
                text.characters = tag.name;
                text.fills = [{
                    type: "SOLID",
                    color: {
                        r: tag.color.r / 255,
                        g: tag.color.g / 255,
                        b: tag.color.b / 255,
                    },
                    opacity: tag.color.a
                }];
                // text.hyperlink = {
                //     type: "URL",
                //     value: nodeData
                // };
                frame.appendChild(text);
                frame.layoutMode = "HORIZONTAL";
                frame.primaryAxisSizingMode = "AUTO";
                frame.counterAxisSizingMode = "AUTO";
                frame.paddingTop = 6;
                frame.paddingBottom = 6;
                frame.paddingLeft = 16;
                frame.paddingRight = 16;
                frame.cornerRadius = 4;
                frame.fills = [{
                    type: "SOLID",
                    color: {
                        r: tag.background.r / 255,
                        g: tag.background.g / 255,
                        b: tag.background.b / 255,
                    }
                }];
                frame.strokes = [{
                    type: "SOLID",
                    color: { r: 0, g: 0, b: 0},
                    opacity: 0.05
                }];
                root.appendChild(frame);
            });
            const group = figma.group([root], page);
            group.name = "Tag#" + nodeData.node_id;
            group.locked = true;
            page.appendChild(group);
            node.setSharedPluginData("figma_tags", "tile_node_id", group.id);
            node.setSharedPluginData("figma_tags", "node", JSON.stringify(nodeData));  // 可在Tag重命名时，本地更新名称；可用于其他插件读取
        }).catch(e => {
            figma.notify("Font family not found! " + e, { error: true });
            console.error(e);
        });
    }
}

const unmarkNode = async (nodeId: string) => {
    const node: BaseNode = await figma.getNodeByIdAsync(nodeId);
    if (node && isEmbedNodeLike(node)) {
        node.setRelaunchData({});
        node.setSharedPluginData("figma_tags", "node", "");

        const tileNodeId = node.getSharedPluginData("figma_tags", "tile_node_id");
        if (tileNodeId) {
            (await figma.getNodeByIdAsync(tileNodeId))?.remove();
        }
    }
}

const refreshFileAllMarks = async (fullTags: Storage.FullTags) => {
    for (let page of figma.root.children) {
        await page.loadAsync();
        for (let node of page.children.filter(c => c.getSharedPluginData("figma_tags", "node"))) {
            const nodeData = JSON.parse(node.getSharedPluginData("figma_tags", "node"));
            if (nodeData) {
                markNode(fullTags, nodeData).then();
            }
        }
    }
}

function isEmbedNodeLike(node: BaseNode): node is EmbedNode {
    return true;
}

function getPageNode(node: BaseNode): PageNode {
    while (node.type !== "PAGE") {
        node = node.parent;
    }
    return <PageNode> node;
}

async function checkNodeTilePos(node: SceneNode) {
    const tileNodeId = node.getSharedPluginData("figma_tags", "tile_node_id");
    if (tileNodeId) {
        const tileNode = await figma.getNodeByIdAsync(tileNodeId);
        if (tileNode && (tileNode.type === 'GROUP' || tileNode.type === 'FRAME')) {
            if (tileNode.parent != node.parent) {
                node.parent.appendChild(tileNode);
            }
            if (tileNode.x != node.x || tileNode.y != node.y - offset) {
                tileNode.x = node.x;
                tileNode.y = node.y - offset;
            }
        }
    }
}

const interval = setInterval(() => {
    for (let el of figma.currentPage.selection) {
        checkNodeTilePos(el).then();
    }
}, 50);

console.log("codeCanvasTag init!");

export { interval, markNode, unmarkNode, refreshFileAllMarks, checkNodeTilePos }