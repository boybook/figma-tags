/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/code.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/code.ts":
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./codeMessageHandler */ "./src/codeMessageHandler.ts");
/* harmony import */ var _codeCanvasTag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./codeCanvasTag */ "./src/codeCanvasTag.ts");


figma.showUI(__html__, { visible: false });
let uiShowed = false;
// figma.clientStorage.setAsync("tags", undefined).then();
// figma.clientStorage.setAsync("nodes", undefined).then();
// figma.clientStorage.setAsync("language", "ch").then();
// figma.clientStorage.setAsync("provider", undefined).then();
// figma.clientStorage.setAsync("access-token", undefined).then();
// figma.root.setPluginData("file-id", "");
// figma.root.setPluginData("tags", "");
// figma.root.setPluginData("nodes", "");
let file = figma.fileKey;
if (!file) {
    file = figma.root.getPluginData('file-id');
}
let mNodeType;
const storageInit = async () => {
    return await Promise.all([
        figma.clientStorage.getAsync("language"),
        figma.clientStorage.getAsync("access-token"),
        figma.clientStorage.getAsync("provider"),
        figma.clientStorage.getAsync("node-type"),
    ]);
};
switch (figma.command) {
    case 'lookup': {
        (async () => {
            const [language, accessToken, provider, nodeType] = await storageInit();
            mNodeType = provider === 'document' ? 'frame' : (nodeType ? nodeType : 'frame');
            checkSelectCanvasTag();
            Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])("init", {
                language: language ? language : "en",
                accessToken: accessToken,
                userId: figma.currentUser.id,
                provider: provider,
                nodeType: mNodeType,
                page: 'PageSelect',
                fileId: file,
                selection: packageCurrentSelection()
            });
        })();
        break;
    }
    case 'node':
    default: {
        (async () => {
            const [language, accessToken, provider, nodeType] = await storageInit();
            mNodeType = provider === 'document' ? 'frame' : (nodeType ? nodeType : 'frame');
            checkSelectCanvasTag();
            Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])("init", {
                language: language ? language : "en",
                accessToken: accessToken,
                userId: figma.currentUser.id,
                provider: provider,
                nodeType: mNodeType,
                page: 'PageNode',
                fileId: file,
                selection: packageCurrentSelection()
            });
        })();
        break;
    }
}
// Handle events from UI
Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('resize', (data) => {
    if (!uiShowed) {
        figma.ui.show();
        uiShowed = true;
    }
    figma.ui.resize(data.width, data.height);
});
Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('client-storage-get', (data) => {
    figma.clientStorage.getAsync(data.key).then(r => {
        const result = {
            key: data.key,
            result: r
        };
        Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('client-storage-get', result);
    });
});
Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('client-storage-set', (data) => {
    figma.clientStorage.setAsync(data.key, data.data).then(() => {
        const result = {
            key: data.key,
            suc: true
        };
        Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('client-storage-set', result);
    });
});
Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('document-plugin-data-get', (key) => {
    ;
    const result = {
        key: key,
        value: figma.root.getPluginData(key)
    };
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('document-plugin-data-get', result);
});
Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('document-plugin-data-set', (data) => {
    figma.root.setPluginData(data.key, data.value);
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('document-plugin-data-set', {
        key: data.key,
        suc: true
    });
});
let lastNotify;
Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('notify', (msg) => {
    lastNotify === null || lastNotify === void 0 ? void 0 : lastNotify.cancel();
    if (typeof msg === 'string') {
        lastNotify = figma.notify(msg);
    }
    else {
        lastNotify = figma.notify(JSON.stringify(msg));
    }
});
Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('notify-err', (msg) => {
    lastNotify === null || lastNotify === void 0 ? void 0 : lastNotify.cancel();
    if (typeof msg === 'string') {
        lastNotify = figma.notify(msg, { error: true });
    }
    else {
        lastNotify = figma.notify(JSON.stringify(msg), { error: true });
    }
});
Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('canvas-mark-node', (data) => {
    Object(_codeCanvasTag__WEBPACK_IMPORTED_MODULE_1__["markNode"])(new Map(JSON.parse(data.fullTags)), JSON.parse(data.node));
});
Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('canvas-unmark-node', (nodeId) => {
    Object(_codeCanvasTag__WEBPACK_IMPORTED_MODULE_1__["unmarkNode"])(nodeId);
});
Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('request-selection', () => {
    console.log("request-selection", figma.currentPage.selection);
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])("selectionchange", packageCurrentSelection());
});
Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('select-node', (nodeId) => {
    const node = figma.getNodeById(nodeId);
    if (node) {
        figma.currentPage = getPageNode(node);
        if (node.type !== 'PAGE') {
            figma.currentPage.selection = [getPageRootNode(node)];
            figma.viewport.scrollAndZoomIntoView([node]);
        }
    }
    else {
        figma.notify("Missing node " + nodeId + "?");
    }
});
Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('node-rename', (data) => {
    const node = figma.getNodeById(data.nodeId);
    if (node && data.name) {
        node.name = data.name;
    }
});
Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('toggle-node-type', (type) => {
    figma.clientStorage.setAsync("node-type", type).then(() => {
        mNodeType = type;
        if (type === 'document') {
            figma.viewport.scrollAndZoomIntoView(figma.root.children[0].children);
        }
        Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])("selectionchange", packageCurrentSelection());
    });
});
figma.on("selectionchange", () => {
    if (mNodeType === 'document')
        return;
    // 点击标签的Group，自动选择到对应的内容
    checkSelectCanvasTag();
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])("selectionchange", packageCurrentSelection());
});
figma.on("currentpagechange", () => {
    if (mNodeType === 'document')
        return;
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])("selectionchange", packageCurrentSelection());
});
figma.on("close", () => {
    clearInterval(_codeCanvasTag__WEBPACK_IMPORTED_MODULE_1__["interval"]);
});
function checkSelectCanvasTag() {
    if (figma.currentPage.selection.length > 0) {
        const select = figma.currentPage.selection[0];
        if (select.type === 'GROUP' && select.name.startsWith("Tag#")) {
            const nodeId = select.name.slice(4);
            const node = figma.getNodeById(nodeId);
            if (node) {
                figma.currentPage = getPageNode(node);
                figma.currentPage.selection = [node];
            }
        }
    }
}
function packageCurrentSelection() {
    console.log("packageCurrentSelection.mNodeType", mNodeType);
    if (mNodeType === 'frame') {
        try {
            const node = figma.currentPage.selection.length > 0 ? getPageRootNode(figma.currentPage.selection[0]) : figma.currentPage;
            const width = isEmbedNodeLike(node) ? node.width : undefined;
            console.log("width", width);
            return {
                type: node.type === 'PAGE' ? 'PAGE' : 'FRAME',
                id: node.id,
                name: node.name,
                width: width
            };
        }
        catch (e) {
            console.log('packageCurrentSelection', e);
            return {
                type: 'PAGE',
                id: figma.currentPage.id,
                name: figma.currentPage.name,
                width: -1
            };
        }
    }
    else if (mNodeType === 'document') {
        const document = figma.root;
        return {
            type: 'DOCUMENT',
            id: undefined,
            name: document.name,
            width: -1
        };
    }
}
function isRootFrame(node) {
    return node.parent.type == "PAGE";
}
function getPageRootNode(node) {
    if (node.parent === null) {
        return node;
    }
    while (node.parent.type !== "PAGE") {
        node = node.parent;
    }
    return node;
}
function getPageNode(node) {
    while (node.type !== "PAGE") {
        node = node.parent;
    }
    return node;
}
function isEmbedNodeLike(node) {
    return true;
}


/***/ }),

/***/ "./src/codeCanvasTag.ts":
/*!******************************!*\
  !*** ./src/codeCanvasTag.ts ***!
  \******************************/
/*! exports provided: interval, markNode, unmarkNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interval", function() { return interval; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "markNode", function() { return markNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unmarkNode", function() { return unmarkNode; });
const offset = 49;
const markNode = (fullTags, nodeData) => {
    var _a;
    const node = figma.getNodeById(nodeData.node_id);
    if (node && isEmbedNodeLike(node)) {
        node.setRelaunchData({
            'node': nodeData.title,
        });
        const page = getPageNode(node);
        if (page.id === node.id)
            return;
        const tileNodeId = page.getPluginData(nodeData.node_id);
        if (tileNodeId) {
            (_a = figma.getNodeById(tileNodeId)) === null || _a === void 0 ? void 0 : _a.remove();
        }
        if (Object.values(nodeData.tags).flat().length === 0) {
            // 没有任何标签
            return;
        }
        figma.loadFontAsync({ family: "Inter", style: "Semi Bold" }).then(() => {
            //const tagFrames = [];
            const root = figma.createFrame();
            root.x = node.x;
            root.y = node.y - offset;
            const tags = [];
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
                    style: "Semi Bold"
                };
                text.lineHeight = { value: 21, unit: 'PIXELS' };
                text.fontSize = 14;
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
                        color: { r: 0, g: 0, b: 0 },
                        opacity: 0.05
                    }];
                root.appendChild(frame);
            });
            const group = figma.group([root], page);
            group.name = "Tag#" + nodeData.node_id;
            page.appendChild(group);
            page.setPluginData(nodeData.node_id, group.id);
        }).catch(e => {
            figma.notify("Font family not found!", { error: true });
            console.log(e);
        });
    }
};
const unmarkNode = (nodeId) => {
    var _a;
    const node = figma.getNodeById(nodeId);
    if (node && isEmbedNodeLike(node)) {
        node.setRelaunchData({});
        const page = getPageNode(node);
        const tileNodeId = page.getPluginData(nodeId);
        if (tileNodeId) {
            (_a = figma.getNodeById(tileNodeId)) === null || _a === void 0 ? void 0 : _a.remove();
        }
    }
};
function isEmbedNodeLike(node) {
    return true;
}
function getPageNode(node) {
    while (node.type !== "PAGE") {
        node = node.parent;
    }
    return node;
}
const interval = setInterval(() => {
    for (let el of figma.currentPage.selection) {
        const tileNodeId = figma.currentPage.getPluginData(el.id);
        if (tileNodeId) {
            const tileNode = figma.getNodeById(tileNodeId);
            if (tileNode && (tileNode.type === 'GROUP' || tileNode.type === 'FRAME')) {
                if (tileNode.x != el.x || tileNode.y != el.y - offset) {
                    tileNode.x = el.x;
                    tileNode.y = el.y - offset;
                }
            }
        }
    }
}, 50);
console.log("codeCanvasTag init!");



/***/ }),

/***/ "./src/codeMessageHandler.ts":
/*!***********************************!*\
  !*** ./src/codeMessageHandler.ts ***!
  \***********************************/
/*! exports provided: dispatch, handleEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dispatch", function() { return dispatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleEvent", function() { return handleEvent; });
const eventListeners = [];
const dispatch = (action, data) => {
    figma.ui.postMessage({ action, data });
};
const handleEvent = (type, callback) => {
    eventListeners.push({ type, callback });
};
figma.ui.onmessage = message => {
    for (let eventListener of eventListeners) {
        if (message.action === eventListener.type)
            eventListener.callback(message.data);
    }
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGVDYW52YXNUYWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGVNZXNzYWdlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUE2RDtBQUNJO0FBQ2pFLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLG9FQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxnQ0FBZ0MsbUJBQW1CO0FBQ25EO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULG9EQUFvRCxjQUFjO0FBQ2xFO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQzBDOzs7Ozs7Ozs7Ozs7O0FDdkkxQztBQUFBO0FBQUE7QUFBQTtBQUNPO0FBQ1AsMEJBQTBCLGVBQWU7QUFDekM7QUFDTztBQUNQLHlCQUF5QixpQkFBaUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2NvZGUudHNcIik7XG4iLCJpbXBvcnQgeyBkaXNwYXRjaCwgaGFuZGxlRXZlbnQgfSBmcm9tICcuL2NvZGVNZXNzYWdlSGFuZGxlcic7XG5pbXBvcnQgeyBpbnRlcnZhbCwgbWFya05vZGUsIHVubWFya05vZGUgfSBmcm9tIFwiLi9jb2RlQ2FudmFzVGFnXCI7XG5maWdtYS5zaG93VUkoX19odG1sX18sIHsgdmlzaWJsZTogZmFsc2UgfSk7XG5sZXQgdWlTaG93ZWQgPSBmYWxzZTtcbi8vIGZpZ21hLmNsaWVudFN0b3JhZ2Uuc2V0QXN5bmMoXCJ0YWdzXCIsIHVuZGVmaW5lZCkudGhlbigpO1xuLy8gZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYyhcIm5vZGVzXCIsIHVuZGVmaW5lZCkudGhlbigpO1xuLy8gZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYyhcImxhbmd1YWdlXCIsIFwiY2hcIikudGhlbigpO1xuLy8gZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYyhcInByb3ZpZGVyXCIsIHVuZGVmaW5lZCkudGhlbigpO1xuLy8gZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYyhcImFjY2Vzcy10b2tlblwiLCB1bmRlZmluZWQpLnRoZW4oKTtcbi8vIGZpZ21hLnJvb3Quc2V0UGx1Z2luRGF0YShcImZpbGUtaWRcIiwgXCJcIik7XG4vLyBmaWdtYS5yb290LnNldFBsdWdpbkRhdGEoXCJ0YWdzXCIsIFwiXCIpO1xuLy8gZmlnbWEucm9vdC5zZXRQbHVnaW5EYXRhKFwibm9kZXNcIiwgXCJcIik7XG5sZXQgZmlsZSA9IGZpZ21hLmZpbGVLZXk7XG5pZiAoIWZpbGUpIHtcbiAgICBmaWxlID0gZmlnbWEucm9vdC5nZXRQbHVnaW5EYXRhKCdmaWxlLWlkJyk7XG59XG5sZXQgbU5vZGVUeXBlO1xuY29uc3Qgc3RvcmFnZUluaXQgPSBhc3luYyAoKSA9PiB7XG4gICAgcmV0dXJuIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYyhcImxhbmd1YWdlXCIpLFxuICAgICAgICBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKFwiYWNjZXNzLXRva2VuXCIpLFxuICAgICAgICBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKFwicHJvdmlkZXJcIiksXG4gICAgICAgIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoXCJub2RlLXR5cGVcIiksXG4gICAgXSk7XG59O1xuc3dpdGNoIChmaWdtYS5jb21tYW5kKSB7XG4gICAgY2FzZSAnbG9va3VwJzoge1xuICAgICAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgW2xhbmd1YWdlLCBhY2Nlc3NUb2tlbiwgcHJvdmlkZXIsIG5vZGVUeXBlXSA9IGF3YWl0IHN0b3JhZ2VJbml0KCk7XG4gICAgICAgICAgICBtTm9kZVR5cGUgPSBwcm92aWRlciA9PT0gJ2RvY3VtZW50JyA/ICdmcmFtZScgOiAobm9kZVR5cGUgPyBub2RlVHlwZSA6ICdmcmFtZScpO1xuICAgICAgICAgICAgY2hlY2tTZWxlY3RDYW52YXNUYWcoKTtcbiAgICAgICAgICAgIGRpc3BhdGNoKFwiaW5pdFwiLCB7XG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2U6IGxhbmd1YWdlID8gbGFuZ3VhZ2UgOiBcImVuXCIsXG4gICAgICAgICAgICAgICAgYWNjZXNzVG9rZW46IGFjY2Vzc1Rva2VuLFxuICAgICAgICAgICAgICAgIHVzZXJJZDogZmlnbWEuY3VycmVudFVzZXIuaWQsXG4gICAgICAgICAgICAgICAgcHJvdmlkZXI6IHByb3ZpZGVyLFxuICAgICAgICAgICAgICAgIG5vZGVUeXBlOiBtTm9kZVR5cGUsXG4gICAgICAgICAgICAgICAgcGFnZTogJ1BhZ2VTZWxlY3QnLFxuICAgICAgICAgICAgICAgIGZpbGVJZDogZmlsZSxcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb246IHBhY2thZ2VDdXJyZW50U2VsZWN0aW9uKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KSgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSAnbm9kZSc6XG4gICAgZGVmYXVsdDoge1xuICAgICAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgW2xhbmd1YWdlLCBhY2Nlc3NUb2tlbiwgcHJvdmlkZXIsIG5vZGVUeXBlXSA9IGF3YWl0IHN0b3JhZ2VJbml0KCk7XG4gICAgICAgICAgICBtTm9kZVR5cGUgPSBwcm92aWRlciA9PT0gJ2RvY3VtZW50JyA/ICdmcmFtZScgOiAobm9kZVR5cGUgPyBub2RlVHlwZSA6ICdmcmFtZScpO1xuICAgICAgICAgICAgY2hlY2tTZWxlY3RDYW52YXNUYWcoKTtcbiAgICAgICAgICAgIGRpc3BhdGNoKFwiaW5pdFwiLCB7XG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2U6IGxhbmd1YWdlID8gbGFuZ3VhZ2UgOiBcImVuXCIsXG4gICAgICAgICAgICAgICAgYWNjZXNzVG9rZW46IGFjY2Vzc1Rva2VuLFxuICAgICAgICAgICAgICAgIHVzZXJJZDogZmlnbWEuY3VycmVudFVzZXIuaWQsXG4gICAgICAgICAgICAgICAgcHJvdmlkZXI6IHByb3ZpZGVyLFxuICAgICAgICAgICAgICAgIG5vZGVUeXBlOiBtTm9kZVR5cGUsXG4gICAgICAgICAgICAgICAgcGFnZTogJ1BhZ2VOb2RlJyxcbiAgICAgICAgICAgICAgICBmaWxlSWQ6IGZpbGUsXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBwYWNrYWdlQ3VycmVudFNlbGVjdGlvbigpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxufVxuLy8gSGFuZGxlIGV2ZW50cyBmcm9tIFVJXG5oYW5kbGVFdmVudCgncmVzaXplJywgKGRhdGEpID0+IHtcbiAgICBpZiAoIXVpU2hvd2VkKSB7XG4gICAgICAgIGZpZ21hLnVpLnNob3coKTtcbiAgICAgICAgdWlTaG93ZWQgPSB0cnVlO1xuICAgIH1cbiAgICBmaWdtYS51aS5yZXNpemUoZGF0YS53aWR0aCwgZGF0YS5oZWlnaHQpO1xufSk7XG5oYW5kbGVFdmVudCgnY2xpZW50LXN0b3JhZ2UtZ2V0JywgKGRhdGEpID0+IHtcbiAgICBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKGRhdGEua2V5KS50aGVuKHIgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgICAgICBrZXk6IGRhdGEua2V5LFxuICAgICAgICAgICAgcmVzdWx0OiByXG4gICAgICAgIH07XG4gICAgICAgIGRpc3BhdGNoKCdjbGllbnQtc3RvcmFnZS1nZXQnLCByZXN1bHQpO1xuICAgIH0pO1xufSk7XG5oYW5kbGVFdmVudCgnY2xpZW50LXN0b3JhZ2Utc2V0JywgKGRhdGEpID0+IHtcbiAgICBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKGRhdGEua2V5LCBkYXRhLmRhdGEpLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgICAgICBrZXk6IGRhdGEua2V5LFxuICAgICAgICAgICAgc3VjOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIGRpc3BhdGNoKCdjbGllbnQtc3RvcmFnZS1zZXQnLCByZXN1bHQpO1xuICAgIH0pO1xufSk7XG5oYW5kbGVFdmVudCgnZG9jdW1lbnQtcGx1Z2luLWRhdGEtZ2V0JywgKGtleSkgPT4ge1xuICAgIDtcbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgIGtleToga2V5LFxuICAgICAgICB2YWx1ZTogZmlnbWEucm9vdC5nZXRQbHVnaW5EYXRhKGtleSlcbiAgICB9O1xuICAgIGRpc3BhdGNoKCdkb2N1bWVudC1wbHVnaW4tZGF0YS1nZXQnLCByZXN1bHQpO1xufSk7XG5oYW5kbGVFdmVudCgnZG9jdW1lbnQtcGx1Z2luLWRhdGEtc2V0JywgKGRhdGEpID0+IHtcbiAgICBmaWdtYS5yb290LnNldFBsdWdpbkRhdGEoZGF0YS5rZXksIGRhdGEudmFsdWUpO1xuICAgIGRpc3BhdGNoKCdkb2N1bWVudC1wbHVnaW4tZGF0YS1zZXQnLCB7XG4gICAgICAgIGtleTogZGF0YS5rZXksXG4gICAgICAgIHN1YzogdHJ1ZVxuICAgIH0pO1xufSk7XG5sZXQgbGFzdE5vdGlmeTtcbmhhbmRsZUV2ZW50KCdub3RpZnknLCAobXNnKSA9PiB7XG4gICAgbGFzdE5vdGlmeSA9PT0gbnVsbCB8fCBsYXN0Tm90aWZ5ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBsYXN0Tm90aWZ5LmNhbmNlbCgpO1xuICAgIGlmICh0eXBlb2YgbXNnID09PSAnc3RyaW5nJykge1xuICAgICAgICBsYXN0Tm90aWZ5ID0gZmlnbWEubm90aWZ5KG1zZyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBsYXN0Tm90aWZ5ID0gZmlnbWEubm90aWZ5KEpTT04uc3RyaW5naWZ5KG1zZykpO1xuICAgIH1cbn0pO1xuaGFuZGxlRXZlbnQoJ25vdGlmeS1lcnInLCAobXNnKSA9PiB7XG4gICAgbGFzdE5vdGlmeSA9PT0gbnVsbCB8fCBsYXN0Tm90aWZ5ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBsYXN0Tm90aWZ5LmNhbmNlbCgpO1xuICAgIGlmICh0eXBlb2YgbXNnID09PSAnc3RyaW5nJykge1xuICAgICAgICBsYXN0Tm90aWZ5ID0gZmlnbWEubm90aWZ5KG1zZywgeyBlcnJvcjogdHJ1ZSB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGxhc3ROb3RpZnkgPSBmaWdtYS5ub3RpZnkoSlNPTi5zdHJpbmdpZnkobXNnKSwgeyBlcnJvcjogdHJ1ZSB9KTtcbiAgICB9XG59KTtcbmhhbmRsZUV2ZW50KCdjYW52YXMtbWFyay1ub2RlJywgKGRhdGEpID0+IHtcbiAgICBtYXJrTm9kZShuZXcgTWFwKEpTT04ucGFyc2UoZGF0YS5mdWxsVGFncykpLCBKU09OLnBhcnNlKGRhdGEubm9kZSkpO1xufSk7XG5oYW5kbGVFdmVudCgnY2FudmFzLXVubWFyay1ub2RlJywgKG5vZGVJZCkgPT4ge1xuICAgIHVubWFya05vZGUobm9kZUlkKTtcbn0pO1xuaGFuZGxlRXZlbnQoJ3JlcXVlc3Qtc2VsZWN0aW9uJywgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwicmVxdWVzdC1zZWxlY3Rpb25cIiwgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uKTtcbiAgICBkaXNwYXRjaChcInNlbGVjdGlvbmNoYW5nZVwiLCBwYWNrYWdlQ3VycmVudFNlbGVjdGlvbigpKTtcbn0pO1xuaGFuZGxlRXZlbnQoJ3NlbGVjdC1ub2RlJywgKG5vZGVJZCkgPT4ge1xuICAgIGNvbnN0IG5vZGUgPSBmaWdtYS5nZXROb2RlQnlJZChub2RlSWQpO1xuICAgIGlmIChub2RlKSB7XG4gICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlID0gZ2V0UGFnZU5vZGUobm9kZSk7XG4gICAgICAgIGlmIChub2RlLnR5cGUgIT09ICdQQUdFJykge1xuICAgICAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gW2dldFBhZ2VSb290Tm9kZShub2RlKV07XG4gICAgICAgICAgICBmaWdtYS52aWV3cG9ydC5zY3JvbGxBbmRab29tSW50b1ZpZXcoW25vZGVdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZmlnbWEubm90aWZ5KFwiTWlzc2luZyBub2RlIFwiICsgbm9kZUlkICsgXCI/XCIpO1xuICAgIH1cbn0pO1xuaGFuZGxlRXZlbnQoJ25vZGUtcmVuYW1lJywgKGRhdGEpID0+IHtcbiAgICBjb25zdCBub2RlID0gZmlnbWEuZ2V0Tm9kZUJ5SWQoZGF0YS5ub2RlSWQpO1xuICAgIGlmIChub2RlICYmIGRhdGEubmFtZSkge1xuICAgICAgICBub2RlLm5hbWUgPSBkYXRhLm5hbWU7XG4gICAgfVxufSk7XG5oYW5kbGVFdmVudCgndG9nZ2xlLW5vZGUtdHlwZScsICh0eXBlKSA9PiB7XG4gICAgZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYyhcIm5vZGUtdHlwZVwiLCB0eXBlKS50aGVuKCgpID0+IHtcbiAgICAgICAgbU5vZGVUeXBlID0gdHlwZTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdkb2N1bWVudCcpIHtcbiAgICAgICAgICAgIGZpZ21hLnZpZXdwb3J0LnNjcm9sbEFuZFpvb21JbnRvVmlldyhmaWdtYS5yb290LmNoaWxkcmVuWzBdLmNoaWxkcmVuKTtcbiAgICAgICAgfVxuICAgICAgICBkaXNwYXRjaChcInNlbGVjdGlvbmNoYW5nZVwiLCBwYWNrYWdlQ3VycmVudFNlbGVjdGlvbigpKTtcbiAgICB9KTtcbn0pO1xuZmlnbWEub24oXCJzZWxlY3Rpb25jaGFuZ2VcIiwgKCkgPT4ge1xuICAgIGlmIChtTm9kZVR5cGUgPT09ICdkb2N1bWVudCcpXG4gICAgICAgIHJldHVybjtcbiAgICAvLyDngrnlh7vmoIfnrb7nmoRHcm91cO+8jOiHquWKqOmAieaLqeWIsOWvueW6lOeahOWGheWuuVxuICAgIGNoZWNrU2VsZWN0Q2FudmFzVGFnKCk7XG4gICAgZGlzcGF0Y2goXCJzZWxlY3Rpb25jaGFuZ2VcIiwgcGFja2FnZUN1cnJlbnRTZWxlY3Rpb24oKSk7XG59KTtcbmZpZ21hLm9uKFwiY3VycmVudHBhZ2VjaGFuZ2VcIiwgKCkgPT4ge1xuICAgIGlmIChtTm9kZVR5cGUgPT09ICdkb2N1bWVudCcpXG4gICAgICAgIHJldHVybjtcbiAgICBkaXNwYXRjaChcInNlbGVjdGlvbmNoYW5nZVwiLCBwYWNrYWdlQ3VycmVudFNlbGVjdGlvbigpKTtcbn0pO1xuZmlnbWEub24oXCJjbG9zZVwiLCAoKSA9PiB7XG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG59KTtcbmZ1bmN0aW9uIGNoZWNrU2VsZWN0Q2FudmFzVGFnKCkge1xuICAgIGlmIChmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24ubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBzZWxlY3QgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF07XG4gICAgICAgIGlmIChzZWxlY3QudHlwZSA9PT0gJ0dST1VQJyAmJiBzZWxlY3QubmFtZS5zdGFydHNXaXRoKFwiVGFnI1wiKSkge1xuICAgICAgICAgICAgY29uc3Qgbm9kZUlkID0gc2VsZWN0Lm5hbWUuc2xpY2UoNCk7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gZmlnbWEuZ2V0Tm9kZUJ5SWQobm9kZUlkKTtcbiAgICAgICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICAgICAgZmlnbWEuY3VycmVudFBhZ2UgPSBnZXRQYWdlTm9kZShub2RlKTtcbiAgICAgICAgICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBbbm9kZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBwYWNrYWdlQ3VycmVudFNlbGVjdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyhcInBhY2thZ2VDdXJyZW50U2VsZWN0aW9uLm1Ob2RlVHlwZVwiLCBtTm9kZVR5cGUpO1xuICAgIGlmIChtTm9kZVR5cGUgPT09ICdmcmFtZScpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24ubGVuZ3RoID4gMCA/IGdldFBhZ2VSb290Tm9kZShmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF0pIDogZmlnbWEuY3VycmVudFBhZ2U7XG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IGlzRW1iZWROb2RlTGlrZShub2RlKSA/IG5vZGUud2lkdGggOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIndpZHRoXCIsIHdpZHRoKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTogbm9kZS50eXBlID09PSAnUEFHRScgPyAnUEFHRScgOiAnRlJBTUUnLFxuICAgICAgICAgICAgICAgIGlkOiBub2RlLmlkLFxuICAgICAgICAgICAgICAgIG5hbWU6IG5vZGUubmFtZSxcbiAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGhcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYWNrYWdlQ3VycmVudFNlbGVjdGlvbicsIGUpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnUEFHRScsXG4gICAgICAgICAgICAgICAgaWQ6IGZpZ21hLmN1cnJlbnRQYWdlLmlkLFxuICAgICAgICAgICAgICAgIG5hbWU6IGZpZ21hLmN1cnJlbnRQYWdlLm5hbWUsXG4gICAgICAgICAgICAgICAgd2lkdGg6IC0xXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKG1Ob2RlVHlwZSA9PT0gJ2RvY3VtZW50Jykge1xuICAgICAgICBjb25zdCBkb2N1bWVudCA9IGZpZ21hLnJvb3Q7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiAnRE9DVU1FTlQnLFxuICAgICAgICAgICAgaWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIG5hbWU6IGRvY3VtZW50Lm5hbWUsXG4gICAgICAgICAgICB3aWR0aDogLTFcbiAgICAgICAgfTtcbiAgICB9XG59XG5mdW5jdGlvbiBpc1Jvb3RGcmFtZShub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUucGFyZW50LnR5cGUgPT0gXCJQQUdFXCI7XG59XG5mdW5jdGlvbiBnZXRQYWdlUm9vdE5vZGUobm9kZSkge1xuICAgIGlmIChub2RlLnBhcmVudCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgd2hpbGUgKG5vZGUucGFyZW50LnR5cGUgIT09IFwiUEFHRVwiKSB7XG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG59XG5mdW5jdGlvbiBnZXRQYWdlTm9kZShub2RlKSB7XG4gICAgd2hpbGUgKG5vZGUudHlwZSAhPT0gXCJQQUdFXCIpIHtcbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbn1cbmZ1bmN0aW9uIGlzRW1iZWROb2RlTGlrZShub2RlKSB7XG4gICAgcmV0dXJuIHRydWU7XG59XG4iLCJjb25zdCBvZmZzZXQgPSA0OTtcbmNvbnN0IG1hcmtOb2RlID0gKGZ1bGxUYWdzLCBub2RlRGF0YSkgPT4ge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBub2RlID0gZmlnbWEuZ2V0Tm9kZUJ5SWQobm9kZURhdGEubm9kZV9pZCk7XG4gICAgaWYgKG5vZGUgJiYgaXNFbWJlZE5vZGVMaWtlKG5vZGUpKSB7XG4gICAgICAgIG5vZGUuc2V0UmVsYXVuY2hEYXRhKHtcbiAgICAgICAgICAgICdub2RlJzogbm9kZURhdGEudGl0bGUsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBwYWdlID0gZ2V0UGFnZU5vZGUobm9kZSk7XG4gICAgICAgIGlmIChwYWdlLmlkID09PSBub2RlLmlkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCB0aWxlTm9kZUlkID0gcGFnZS5nZXRQbHVnaW5EYXRhKG5vZGVEYXRhLm5vZGVfaWQpO1xuICAgICAgICBpZiAodGlsZU5vZGVJZCkge1xuICAgICAgICAgICAgKF9hID0gZmlnbWEuZ2V0Tm9kZUJ5SWQodGlsZU5vZGVJZCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoT2JqZWN0LnZhbHVlcyhub2RlRGF0YS50YWdzKS5mbGF0KCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyDmsqHmnInku7vkvZXmoIfnrb5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmaWdtYS5sb2FkRm9udEFzeW5jKHsgZmFtaWx5OiBcIkludGVyXCIsIHN0eWxlOiBcIlNlbWkgQm9sZFwiIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy9jb25zdCB0YWdGcmFtZXMgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHJvb3QgPSBmaWdtYS5jcmVhdGVGcmFtZSgpO1xuICAgICAgICAgICAgcm9vdC54ID0gbm9kZS54O1xuICAgICAgICAgICAgcm9vdC55ID0gbm9kZS55IC0gb2Zmc2V0O1xuICAgICAgICAgICAgY29uc3QgdGFncyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgdHlwZSBpbiBub2RlRGF0YS50YWdzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZ1bGxUYWdzLmhhcyh0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICB0YWdzLnB1c2goLi4uZnVsbFRhZ3MuZ2V0KHR5cGUpLnRhZ3MuZmlsdGVyKHQgPT4gbm9kZURhdGEudGFnc1t0eXBlXS5maW5kKHQwID0+IHQubmFtZSA9PT0gdDApKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcm9vdC5uYW1lID0gdGFncy5tYXAodCA9PiB0Lm5hbWUpLmpvaW4oKTtcbiAgICAgICAgICAgIHJvb3QuZmlsbHMgPSBbXTtcbiAgICAgICAgICAgIHJvb3QubGF5b3V0TW9kZSA9ICdIT1JJWk9OVEFMJztcbiAgICAgICAgICAgIHJvb3QubGF5b3V0QWxpZ24gPSAnSU5IRVJJVCc7XG4gICAgICAgICAgICByb290LmxheW91dEdyb3cgPSAwO1xuICAgICAgICAgICAgcm9vdC5wcmltYXJ5QXhpc0FsaWduSXRlbXMgPSAnTUlOJztcbiAgICAgICAgICAgIHJvb3QucHJpbWFyeUF4aXNTaXppbmdNb2RlID0gJ0FVVE8nO1xuICAgICAgICAgICAgcm9vdC5jb3VudGVyQXhpc1NpemluZ01vZGUgPSAnQVVUTyc7XG4gICAgICAgICAgICByb290Lml0ZW1TcGFjaW5nID0gODtcbiAgICAgICAgICAgIHRhZ3MuZm9yRWFjaCh0YWcgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZyYW1lID0gZmlnbWEuY3JlYXRlRnJhbWUoKTtcbiAgICAgICAgICAgICAgICAvLyBmcmFtZS54ID0gbm9kZS54O1xuICAgICAgICAgICAgICAgIC8vIGZyYW1lLnkgPSBub2RlLnkgLSA0MDtcbiAgICAgICAgICAgICAgICBmcmFtZS5uYW1lID0gdGFnLm5hbWU7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9IGZpZ21hLmNyZWF0ZVRleHQoKTtcbiAgICAgICAgICAgICAgICB0ZXh0LmZvbnROYW1lID0ge1xuICAgICAgICAgICAgICAgICAgICBmYW1pbHk6IFwiSW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IFwiU2VtaSBCb2xkXCJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRleHQubGluZUhlaWdodCA9IHsgdmFsdWU6IDIxLCB1bml0OiAnUElYRUxTJyB9O1xuICAgICAgICAgICAgICAgIHRleHQuZm9udFNpemUgPSAxNDtcbiAgICAgICAgICAgICAgICB0ZXh0LmNoYXJhY3RlcnMgPSB0YWcubmFtZTtcbiAgICAgICAgICAgICAgICB0ZXh0LmZpbGxzID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiU09MSURcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcjogdGFnLmNvbG9yLnIgLyAyNTUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZzogdGFnLmNvbG9yLmcgLyAyNTUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYjogdGFnLmNvbG9yLmIgLyAyNTUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogdGFnLmNvbG9yLmFcbiAgICAgICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgLy8gdGV4dC5oeXBlcmxpbmsgPSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIHR5cGU6IFwiVVJMXCIsXG4gICAgICAgICAgICAgICAgLy8gICAgIHZhbHVlOiBub2RlRGF0YVxuICAgICAgICAgICAgICAgIC8vIH07XG4gICAgICAgICAgICAgICAgZnJhbWUuYXBwZW5kQ2hpbGQodGV4dCk7XG4gICAgICAgICAgICAgICAgZnJhbWUubGF5b3V0TW9kZSA9IFwiSE9SSVpPTlRBTFwiO1xuICAgICAgICAgICAgICAgIGZyYW1lLnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9IFwiQVVUT1wiO1xuICAgICAgICAgICAgICAgIGZyYW1lLmNvdW50ZXJBeGlzU2l6aW5nTW9kZSA9IFwiQVVUT1wiO1xuICAgICAgICAgICAgICAgIGZyYW1lLnBhZGRpbmdUb3AgPSA0O1xuICAgICAgICAgICAgICAgIGZyYW1lLnBhZGRpbmdCb3R0b20gPSA0O1xuICAgICAgICAgICAgICAgIGZyYW1lLnBhZGRpbmdMZWZ0ID0gMTY7XG4gICAgICAgICAgICAgICAgZnJhbWUucGFkZGluZ1JpZ2h0ID0gMTY7XG4gICAgICAgICAgICAgICAgZnJhbWUuY29ybmVyUmFkaXVzID0gNDtcbiAgICAgICAgICAgICAgICBmcmFtZS5maWxscyA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlNPTElEXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHI6IHRhZy5iYWNrZ3JvdW5kLnIgLyAyNTUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZzogdGFnLmJhY2tncm91bmQuZyAvIDI1NSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiOiB0YWcuYmFja2dyb3VuZC5iIC8gMjU1LFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICBmcmFtZS5zdHJva2VzID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiU09MSURcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB7IHI6IDAsIGc6IDAsIGI6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuMDVcbiAgICAgICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgcm9vdC5hcHBlbmRDaGlsZChmcmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZmlnbWEuZ3JvdXAoW3Jvb3RdLCBwYWdlKTtcbiAgICAgICAgICAgIGdyb3VwLm5hbWUgPSBcIlRhZyNcIiArIG5vZGVEYXRhLm5vZGVfaWQ7XG4gICAgICAgICAgICBwYWdlLmFwcGVuZENoaWxkKGdyb3VwKTtcbiAgICAgICAgICAgIHBhZ2Uuc2V0UGx1Z2luRGF0YShub2RlRGF0YS5ub2RlX2lkLCBncm91cC5pZCk7XG4gICAgICAgIH0pLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgZmlnbWEubm90aWZ5KFwiRm9udCBmYW1pbHkgbm90IGZvdW5kIVwiLCB7IGVycm9yOiB0cnVlIH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5jb25zdCB1bm1hcmtOb2RlID0gKG5vZGVJZCkgPT4ge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBub2RlID0gZmlnbWEuZ2V0Tm9kZUJ5SWQobm9kZUlkKTtcbiAgICBpZiAobm9kZSAmJiBpc0VtYmVkTm9kZUxpa2Uobm9kZSkpIHtcbiAgICAgICAgbm9kZS5zZXRSZWxhdW5jaERhdGEoe30pO1xuICAgICAgICBjb25zdCBwYWdlID0gZ2V0UGFnZU5vZGUobm9kZSk7XG4gICAgICAgIGNvbnN0IHRpbGVOb2RlSWQgPSBwYWdlLmdldFBsdWdpbkRhdGEobm9kZUlkKTtcbiAgICAgICAgaWYgKHRpbGVOb2RlSWQpIHtcbiAgICAgICAgICAgIChfYSA9IGZpZ21hLmdldE5vZGVCeUlkKHRpbGVOb2RlSWQpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuZnVuY3Rpb24gaXNFbWJlZE5vZGVMaWtlKG5vZGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGdldFBhZ2VOb2RlKG5vZGUpIHtcbiAgICB3aGlsZSAobm9kZS50eXBlICE9PSBcIlBBR0VcIikge1xuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnQ7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xufVxuY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgZm9yIChsZXQgZWwgb2YgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IHRpbGVOb2RlSWQgPSBmaWdtYS5jdXJyZW50UGFnZS5nZXRQbHVnaW5EYXRhKGVsLmlkKTtcbiAgICAgICAgaWYgKHRpbGVOb2RlSWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHRpbGVOb2RlID0gZmlnbWEuZ2V0Tm9kZUJ5SWQodGlsZU5vZGVJZCk7XG4gICAgICAgICAgICBpZiAodGlsZU5vZGUgJiYgKHRpbGVOb2RlLnR5cGUgPT09ICdHUk9VUCcgfHwgdGlsZU5vZGUudHlwZSA9PT0gJ0ZSQU1FJykpIHtcbiAgICAgICAgICAgICAgICBpZiAodGlsZU5vZGUueCAhPSBlbC54IHx8IHRpbGVOb2RlLnkgIT0gZWwueSAtIG9mZnNldCkge1xuICAgICAgICAgICAgICAgICAgICB0aWxlTm9kZS54ID0gZWwueDtcbiAgICAgICAgICAgICAgICAgICAgdGlsZU5vZGUueSA9IGVsLnkgLSBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSwgNTApO1xuY29uc29sZS5sb2coXCJjb2RlQ2FudmFzVGFnIGluaXQhXCIpO1xuZXhwb3J0IHsgaW50ZXJ2YWwsIG1hcmtOb2RlLCB1bm1hcmtOb2RlIH07XG4iLCJjb25zdCBldmVudExpc3RlbmVycyA9IFtdO1xuZXhwb3J0IGNvbnN0IGRpc3BhdGNoID0gKGFjdGlvbiwgZGF0YSkgPT4ge1xuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgYWN0aW9uLCBkYXRhIH0pO1xufTtcbmV4cG9ydCBjb25zdCBoYW5kbGVFdmVudCA9ICh0eXBlLCBjYWxsYmFjaykgPT4ge1xuICAgIGV2ZW50TGlzdGVuZXJzLnB1c2goeyB0eXBlLCBjYWxsYmFjayB9KTtcbn07XG5maWdtYS51aS5vbm1lc3NhZ2UgPSBtZXNzYWdlID0+IHtcbiAgICBmb3IgKGxldCBldmVudExpc3RlbmVyIG9mIGV2ZW50TGlzdGVuZXJzKSB7XG4gICAgICAgIGlmIChtZXNzYWdlLmFjdGlvbiA9PT0gZXZlbnRMaXN0ZW5lci50eXBlKVxuICAgICAgICAgICAgZXZlbnRMaXN0ZW5lci5jYWxsYmFjayhtZXNzYWdlLmRhdGEpO1xuICAgIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9