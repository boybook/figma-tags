import TagColor = Transfer.TagColor;

export function storageTagType2ContextClassifiedTags(fullTagGroup: Storage.TagGroup) : Context.ClassifiedTags {
    // type
    const tags : Context.ClassifiedTags = new Map();
    tags.set('', []);
    for (let tag of fullTagGroup.tags) {
        const tagNameSubs = tag.name.replace(' ', '').split('/', 2);
        const childTag = tagNameSubs.length > 1 ? tagNameSubs[0] : '';
        if (!tags.has(childTag)) {
            tags.set(childTag, []);
        }
        const treeTag: Context.Tag = {
            check: false,
            name: tag.name,
            color: tag.color,
            background: tag.background
        };
        tags.get(childTag).push(treeTag);
    }
    for (let tagKey in tags.get('')) {
        if (tags.has(tags.get('')[tagKey].name)) {
            tags.get(tags.get('')[tagKey].name).unshift(tags.get('')[tagKey]);
            tags.get('').splice(Number(tagKey), 1);
        }
    }

    return tags;
}

/**
 * @param fullTags Tags config
 * @param storageTags Tags data from Storage
 * @returns `Context.TagTree` Tags data for UI
 */
export function storageTags2ContextTagTree(storageTags: Storage.NodeTags, fullTags: Storage.FullTags) : Context.TagTree {
    const tagTree: Context.TagTree = [];
    for (let typeName of fullTags.keys()) {
        const entry: Context.TagType = {
            type: typeName,
            tags: storageTagType2ContextClassifiedTags(fullTags.get(typeName))
        };
        if (Object.keys(storageTags).length > 0) {
            for (let childTag of entry.tags.keys()) {
                for (let tagIndex in entry.tags.get(childTag)) {
                    if (storageTags[typeName]) {
                        for (let tagValid of storageTags[typeName]) {
                            if (entry.tags.get(childTag)[tagIndex].name === tagValid) {
                                entry.tags.get(childTag)[tagIndex].check = true;
                                break;
                            }
                        }
                    }
                }
            }
        }
        tagTree.push(entry);
    }
    return tagTree;
}

export function contextTagTree2StorageTags(tagTree: Context.TagTree) : Storage.FullTags {
    const fullTags: Storage.FullTags = new Map<string, Storage.TagGroup>();
    for (let tagType of tagTree) {
        fullTags.set(tagType.type, {
            name: tagType.type,
            tags: [...tagType.tags.values()].flat()
        })
    }
    console.log("contextTagTree2StorageTags", fullTags);
    return fullTags;
}

export function storageNode2ContextNode(node : Storage.Node) : Context.Node {
    return node ? {
        saved: true,
        ...node
    } : undefined;
}

export function contextNode2StorageNode(node : Context.Node) : Storage.Node {
    return {
        ...node
    }
}

export function syncContextTagTree2ContextNode(tagTree: Context.TagTree, node: Context.Node) {
    const nodeTags: Storage.NodeTags = {};
    for (let tagType of tagTree) {
        const tags = [...tagType.tags.values()].flat().filter(tag => tag.check).flatMap(tag => tag.name);
        if (tags.length > 0) {
            nodeTags[tagType.type] = tags;
        }
    }
    node.tags = nodeTags;
}

export function defaultTag(name: string, randomColor?: boolean) : Storage.Tag {
    const color: Transfer.TagColor = randomColor ? randomTagColor() : tagColors.default;
    return {
        name: name,
        color: color.color,
        background: color.background
    }
}

export function figmaURL(fileId: string, nodeId: string) : string {
    return "https://www.figma.com/file/" + fileId + "/?node-id=" + encodeURIComponent(nodeId);
}

const tagColors = {
    default: {
        background: { r: 227, g: 226, b: 224, a: 1 },
        color: { r: 50, g: 48, b: 44, a: 1 }
    },
    gray: {
        background: { r: 227, g: 226, b: 224, a: 1 },
        color: { r: 50, g: 48, b: 44, a: 1 }
    },
    brown: {
        background: { r: 238, g: 224, b: 218, a: 1 },
        color: { r: 68, g: 42, b: 30, a: 1 }
    },
    orange: {
        background: { r: 250, g: 222, b: 201, a: 1 },
        color: { r: 73, g: 41, b: 14, a: 1 }
    },
    yellow: {
        background: { r: 253, g: 236, b: 200, a: 1 },
        color: { r: 64, g: 44, b: 27, a: 1 }
    },
    green: {
        background: { r: 219, g: 237, b: 219, a: 1 },
        color: { r: 28, g: 56, b: 41, a: 1 }
    },
    blue: {
        background: { r: 211, g: 229, b: 239, a: 1 },
        color: { r: 24, g: 51, b: 71, a: 1 }
    },
    purple: {
        background: { r: 232, g: 222, b: 238, a: 1 },
        color: { r: 65, g: 36, b: 84, a: 1 }
    },
    pink: {
        background: { r: 245, g: 224, b: 233, a: 1 },
        color: { r: 76, g: 35, b: 55, a: 1 }
    },
    red: {
        background: { r: 255, g: 226, b: 221, a: 1 },
        color: { r: 93, g: 23, b: 21, a: 1 }
    }
}

export function randomTagColor() : TagColor {
    const index = Math.round(Math.random() * Object.values(tagColors).length);
    return tagColors[Object.keys(tagColors)[index]];
}