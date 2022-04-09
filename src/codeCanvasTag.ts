const markNode = (fullTags: Storage.FullTags, nodeData: Storage.Node) => {
    const node: BaseNode = figma.getNodeById(nodeData.node_id);
    if (node && isEmbedNodeLike(node)) {
        node.setRelaunchData({
            'node': nodeData.title,
        });

        const page = getPageNode(node);
        if (page.id === node.id) return;

        const tileNodeId = page.getPluginData(nodeData.node_id);
        if (tileNodeId) {
            figma.getNodeById(tileNodeId)?.remove();
        }

        figma.loadFontAsync({ family: "Inter", style: "Medium" }).then(() => {
            //const tagFrames = [];
            const root = figma.createFrame();
            root.x = node.x;
            root.y = node.y - 38;

            const tags : Storage.Tag[] = [];
            for (let type in nodeData.tags) {
                if (fullTags.has(type)) {
                    tags.push(...fullTags.get(type).tags.filter(t => nodeData.tags[type].find(t0 => t.name === t0)));
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
                    style: "Medium"
                };
                text.lineHeight = { value: 14, unit: 'PIXELS' };
                text.fontSize = 12;
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
                frame.paddingTop = 4;
                frame.paddingBottom = 4;
                frame.paddingLeft = 8;
                frame.paddingRight = 8;
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
            group.name = root.name;
            page.appendChild(group);
            page.setPluginData(nodeData.node_id, group.id);
        }).catch(e => {
            figma.notify("Font family not found!", { error: true });
            console.log(e);
        });
    }
}

const unmarkNode = (nodeId: string) => {
    const node: BaseNode = figma.getNodeById(nodeId);
    if (node && isEmbedNodeLike(node)) {
        node.setRelaunchData({});

        const page = getPageNode(node);

        const tileNodeId = page.getPluginData(nodeId);
        if (tileNodeId) {
            figma.getNodeById(tileNodeId)?.remove();
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

setInterval(() => {
    for (let el of figma.currentPage.selection) {
        const tileNodeId = figma.currentPage.getPluginData(el.id);
        if (tileNodeId) {
            const tileNode = figma.getNodeById(tileNodeId);
            if (tileNode && (tileNode.type === 'GROUP' || tileNode.type === 'FRAME')) {
                tileNode.x = el.x;
                tileNode.y = el.y - 38;
            }
        }
    }
}, 50);

console.log("codeCanvasTag init!");

export { markNode, unmarkNode }