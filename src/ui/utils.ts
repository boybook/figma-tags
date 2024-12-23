import TagColor = Transfer.TagColor;

export function newTagToTagTree(tagTree: Context.TagTree, tagTypeName: string, tag: Storage.Tag) {
    const tagType = tagTree.find(type => type.type === tagTypeName);
    if (tagType) {
        const tagNameSubs = tag.name.replace(' ', '').split('/', 2);
        const childTag = tagNameSubs.length > 1 ? tagNameSubs[0] : '';
        if (!tagType.tags.has(childTag)) {
            tagType.tags.set(childTag, []);
        }
        const treeTag: Context.Tag = {
            isNew: true,
            check: false,
            id: tag.id,
            name: tag.name,
            color: tag.color,
            background: tag.background
        };
        tagType.tags.get(childTag).unshift(treeTag);
    }
}

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
            isNew: false,
            check: false,
            id: tag.id,
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
    console.log("storageTags2ContextTagTree", fullTags);
    const tagTree: Context.TagTree = [];
    for (let typeName of fullTags.keys()) {
        const entry: Context.TagType = {
            type: typeName,
            view_sort: fullTags.get(typeName).view_sort,
            tags: storageTagType2ContextClassifiedTags(fullTags.get(typeName))
        };
        if (Object.keys(storageTags).length > 0) {
            for (let childTag of entry.tags.keys()) {
                for (let tagIndex in entry.tags.get(childTag)) {
                    if (storageTags[typeName]) {
                        for (let tagValid of storageTags[typeName]) {
                            if (entry.tags.get(childTag)[tagIndex].id === tagValid) {
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

export function contextTagTree2ContextNode(tagTree: Context.TagTree) : Storage.NodeTags {
    const nodeTags: Storage.NodeTags = {};
    for (let tagType of tagTree) {
        const tags = [...tagType.tags.values()].flat().filter(tag => tag.check).flatMap(tag => tag.id);
        if (tags.length > 0) {
            nodeTags[tagType.type] = tags;
        }
    }
    return nodeTags;
}

export function defaultTag(name: string, randomColor?: boolean) : Storage.Tag {
    const color: Transfer.TagColor = randomColor ? randomTagColor() : tagColors.default;
    return genTag(name, color);
}

export function genTag(name: string, color: Transfer.TagColor) : Storage.Tag {
    return {
        id: randomString(),
        name: name,
        color: color.color,
        background: color.background
    }
}

export function figmaURL(fileId: string, nodeId: string) : string {
    return "https://www.figma.com/file/" + fileId + (nodeId ? ("/?node-id=" + encodeURIComponent(nodeId)) : "");
}

export const tagColors = {
    default: {
        name: 'default',
        background: { r: 227, g: 226, b: 224, a: 1 },
        color: { r: 50, g: 48, b: 44, a: 1 }
    },
    gray: {
        name: 'gray',
        background: { r: 227, g: 226, b: 224, a: 1 },
        color: { r: 50, g: 48, b: 44, a: 1 }
    },
    brown: {
        name: 'brown',
        background: { r: 238, g: 224, b: 218, a: 1 },
        color: { r: 68, g: 42, b: 30, a: 1 }
    },
    orange: {
        name: 'orange',
        background: { r: 250, g: 222, b: 201, a: 1 },
        color: { r: 73, g: 41, b: 14, a: 1 }
    },
    yellow: {
        name: 'yellow',
        background: { r: 253, g: 236, b: 200, a: 1 },
        color: { r: 64, g: 44, b: 27, a: 1 }
    },
    green: {
        name: 'green',
        background: { r: 219, g: 237, b: 219, a: 1 },
        color: { r: 28, g: 56, b: 41, a: 1 }
    },
    blue: {
        name: 'blue',
        background: { r: 211, g: 229, b: 239, a: 1 },
        color: { r: 24, g: 51, b: 71, a: 1 }
    },
    purple: {
        name: 'purple',
        background: { r: 232, g: 222, b: 238, a: 1 },
        color: { r: 65, g: 36, b: 84, a: 1 }
    },
    pink: {
        name: 'pink',
        background: { r: 245, g: 224, b: 233, a: 1 },
        color: { r: 76, g: 35, b: 55, a: 1 }
    },
    red: {
        name: 'red',
        background: { r: 255, g: 226, b: 221, a: 1 },
        color: { r: 93, g: 23, b: 21, a: 1 }
    }
}

export function equalsRGBA(obj1: RGBA, obj2: RGBA) {
    return obj1.r === obj2.r && obj1.g === obj2.g && obj1.b === obj2.b && obj1.a === obj2.a;
}

export function findColorName(color: Transfer.TagColor) {
    for (let key in tagColors) {
        if (equalsRGBA(color.color, tagColors[key].color) && equalsRGBA(color.background, tagColors[key].background)) {
            return key;
        }
    }
    return "default";
}

export function randomTagColor() : TagColor {
    const index = Math.round(Math.random() * Object.values(tagColors).length - 1);
    const json = JSON.stringify(tagColors[Object.keys(tagColors)[index]]);
    if (json === undefined || json.length === 0) {
        console.error("randomTagColor", index, Object.keys(tagColors)[index]);
    }
    console.log("randomTagColor", json);
    return JSON.parse(json);
}

export function checkDataFullTags(tags: Storage.FullTags) : boolean {
    for (let tagGroup of [...tags.values()]) {
        if (!tagGroup.name || !tagGroup.tags) {
            return false;
        }
        for (let tag of tagGroup.tags) {
            if (!tag.name || !tag.color || !tag.background) {
                return false;
            }
        }
    }
    return true;
}

export function checkDataFullNodes(nodes: Storage.FullNodes) : boolean {
    for (let key in nodes) {
        const node = nodes[key];
        if (!node.title || !node.node_id || !node.tags) {
            return false;
        }
    }
    return true;
}

export function equalsFullTags(full1: Storage.FullTags, full2: Storage.FullTags) : boolean {
    const list1 = [...full1.values()];
    const list2 = [...full2.values()];
    if (list1.length != list2.length) {
        console.log("equalsFullTags", "list.length", list1.length, list2.length);
        return false;
    }
    for (let i = 0; i < list1.length; i++) {
        const entry1 = list1[i];
        const entry2 = list2[i];
        if (entry1.name !== entry2.name) {
            console.log("equalsFullTags", "name", entry1.name, entry2.name);
            return false;
        }
        if (entry1.tags.length !== entry2.tags.length) {
            console.log("equalsFullTags", "tags.length", entry1.tags.length, entry2.tags.length);
            return false;
        }
        for (let i0 = 0; i0 < entry1.tags.length; i0++) {
            if (entry1.tags[i0].id !== entry2.tags[i0].id) {
                console.log("equalsFullTags", "tag.id", entry1.tags[i0].id, entry2.tags[i0].id);
                return false;
            }
            if (entry1.tags[i0].name !== entry2.tags[i0].name) {
                console.log("equalsFullTags", "tag.name", entry1.tags[i0].name, entry2.tags[i0].name);
                return false;
            }
            if (!equalsRGBA(entry1.tags[i0].color, entry2.tags[i0].color)) {
                console.log("equalsFullTags", "tag.color", entry1.tags[i0].color, entry2.tags[i0].color);
                return false;
            }
            if (!equalsRGBA(entry1.tags[i0].background, entry2.tags[i0].background)) {
                console.log("equalsFullTags", "tag.background", entry1.tags[i0].background, entry2.tags[i0].background);
                return false;
            }
        }
    }
    return true;
}

export function randomString(length: number = 16, chars: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

/**
 * Converts an RGB color to HSB (Hue, Saturation, Brightness).
 * @param {number} r - Red component (0-255).
 * @param {number} g - Green component (0-255).
 * @param {number} b - Blue component (0-255).
 * @returns {{h: number, s: number, b: number}} - HSB values.
 */
export function rgbToHsb(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    // Hue calculation
    let h;
    if (delta === 0) {
        h = 0; // Undefined hue is treated as 0
    } else if (max === r) {
        h = ((g - b) / delta) % 6;
    } else if (max === g) {
        h = (b - r) / delta + 2;
    } else {
        h = (r - g) / delta + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;

    // Saturation calculation
    const s = max === 0 ? 0 : (delta / max) * 100;

    // Brightness calculation
    const brightness = max * 100;

    return {
        h: Math.round(h),
        s: Math.round(s),
        b: Math.round(brightness),
    };
}

/**
 * Converts an HSB (Hue, Saturation, Brightness) color to RGB.
 * @param {number} h - Hue (0-360).
 * @param {number} s - Saturation (0-100).
 * @param {number} b - Brightness (0-100).
 * @returns {{r: number, g: number, b: number}} - RGB values.
 */
export function hsbToRgb(h, s, b) {
    s /= 100;
    b /= 100;

    const c = b * s; // Chroma: the difference between max and min RGB values
    const x = c * (1 - Math.abs((h / 60) % 2 - 1)); // Intermediate value
    const m = b - c; // Match value to adjust RGB

    let r = 0, g = 0, b_ = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b_ = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b_ = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b_ = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b_ = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b_ = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b_ = x;
    }

    // Convert to 0-255 range
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b_ = Math.round((b_ + m) * 255);

    return { r, g, b: b_ };
}