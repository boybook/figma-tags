export function storageTagType2ContextClassifiedTags(fullTagGroup: Storage.TagGroup) : Context.ClassifiedTags {
    // type
    const tags : Context.ClassifiedTags = {
        '': [] // 把默认组放在最前面
    };

    for (let tag of fullTagGroup.tags) {
        const tagNameSubs = tag.name.replace(' ', '').split('/', 2);
        const childTag = tagNameSubs.length > 1 ? tagNameSubs[0] : '';
        if (!tags[childTag]) {
            tags[childTag] = [];
        }
        const treeTag: Context.Tag = {
            check: false,
            name: tag.name,
            color: tag.color,
            background: tag.background
        };
        tags[childTag].push(treeTag);
    }
    for (let tagKey in tags['']) {
        if (tags[tags[''][tagKey].name]) {
            tags[tags[''][tagKey].name].unshift(tags[''][tagKey]);
            tags[''].splice(Number(tagKey), 1);
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
    for (let typeName in fullTags) {
        const entry: Context.TagType = {
            type: typeName,
            tags: storageTagType2ContextClassifiedTags(fullTags[typeName])
        };
        if (Object.keys(storageTags).length > 0) {
            for (let childTag in entry.tags) {
                for (let tagIndex in entry.tags[childTag]) {
                    for (let tagValid of storageTags[typeName]) {
                        if (entry.tags[childTag][tagIndex].name === tagValid) {
                            entry.tags[childTag][tagIndex].check = true;
                            break;
                        }
                    }
                }
            }
        }
        tagTree.push(entry);
    }
    return tagTree;
}

export function storageNode2ContextNode(node : Storage.Node) : Context.Node {
    return node ? {
        saved: true,
        ...node
    } : undefined;
}

export function contextNode2ContextNode(node : Context.Node) : Storage.Node {
    return {
        ...node
    }
}

export function defaultTag(name: string) : Storage.Tag {
    return {
        name: name,
        color: { r: 0, g: 0, b: 0, a: 0.85 },
        background: { r: 227, g: 226, b: 224, a: 0.5 }
    }
}