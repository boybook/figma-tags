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
                            console.log("======== name", entry.tags.get(childTag)[tagIndex].name);
                            console.log("======== tagValid", tagValid);
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