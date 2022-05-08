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
Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('document-shared-plugin-data-set', (data) => {
    figma.root.setSharedPluginData('figma-nodes', data.key, data.value);
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
    figma.clientStorage.setAsync("node-type", type).then();
    mNodeType = type;
    if (type === 'document') {
        figma.viewport.scrollAndZoomIntoView(figma.root.children[0].children);
        figma.currentPage.selection = [];
    }
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])("selectionchange", packageCurrentSelection());
});
figma.on("selectionchange", () => {
    if (mNodeType === 'document') {
        if (figma.currentPage.selection.length > 0) {
            checkSelectCanvasTag();
            Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])("force-change-node-type", 'frame');
        }
        return;
    }
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
const offset = 63;
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
                        color: { r: 0, g: 0, b: 0 },
                        opacity: 0.05
                    }];
                root.appendChild(frame);
            });
            const group = figma.group([root], page);
            group.name = "Tag#" + nodeData.node_id;
            group.locked = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGVDYW52YXNUYWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGVNZXNzYWdlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUE2RDtBQUNJO0FBQ2pFLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLG9FQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLG9FQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUVBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELHVFQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsb0VBQVE7QUFDaEIsS0FBSztBQUNMLENBQUM7QUFDRCx1RUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG9FQUFRO0FBQ2hCLEtBQUs7QUFDTCxDQUFDO0FBQ0QsdUVBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxvRUFBUTtBQUNaLENBQUM7QUFDRCx1RUFBVztBQUNYO0FBQ0EsSUFBSSxvRUFBUTtBQUNaO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQztBQUNELHVFQUFXO0FBQ1g7QUFDQSxDQUFDO0FBQ0Q7QUFDQSx1RUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELHVFQUFXO0FBQ1g7QUFDQTtBQUNBLHdDQUF3QyxjQUFjO0FBQ3REO0FBQ0E7QUFDQSx3REFBd0QsY0FBYztBQUN0RTtBQUNBLENBQUM7QUFDRCx1RUFBVztBQUNYLElBQUksK0RBQVE7QUFDWixDQUFDO0FBQ0QsdUVBQVc7QUFDWCxJQUFJLGlFQUFVO0FBQ2QsQ0FBQztBQUNELHVFQUFXO0FBQ1g7QUFDQSxJQUFJLG9FQUFRO0FBQ1osQ0FBQztBQUNELHVFQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCx1RUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELHVFQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxvRUFBUTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksb0VBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksb0VBQVE7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsSUFBSSxvRUFBUTtBQUNaLENBQUM7QUFDRDtBQUNBLGtCQUFrQix1REFBUTtBQUMxQixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzVQQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsc0NBQXNDO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxnQ0FBZ0MsbUJBQW1CO0FBQ25EO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Qsb0RBQW9ELGNBQWM7QUFDbEU7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDMEM7Ozs7Ozs7Ozs7Ozs7QUN4STFDO0FBQUE7QUFBQTtBQUFBO0FBQ087QUFDUCwwQkFBMEIsZUFBZTtBQUN6QztBQUNPO0FBQ1AseUJBQXlCLGlCQUFpQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY29kZS50c1wiKTtcbiIsImltcG9ydCB7IGRpc3BhdGNoLCBoYW5kbGVFdmVudCB9IGZyb20gJy4vY29kZU1lc3NhZ2VIYW5kbGVyJztcbmltcG9ydCB7IGludGVydmFsLCBtYXJrTm9kZSwgdW5tYXJrTm9kZSB9IGZyb20gXCIuL2NvZGVDYW52YXNUYWdcIjtcbmZpZ21hLnNob3dVSShfX2h0bWxfXywgeyB2aXNpYmxlOiBmYWxzZSB9KTtcbmxldCB1aVNob3dlZCA9IGZhbHNlO1xuLy8gZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYyhcInRhZ3NcIiwgdW5kZWZpbmVkKS50aGVuKCk7XG4vLyBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKFwibm9kZXNcIiwgdW5kZWZpbmVkKS50aGVuKCk7XG4vLyBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKFwibGFuZ3VhZ2VcIiwgXCJjaFwiKS50aGVuKCk7XG4vLyBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKFwicHJvdmlkZXJcIiwgdW5kZWZpbmVkKS50aGVuKCk7XG4vLyBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKFwiYWNjZXNzLXRva2VuXCIsIHVuZGVmaW5lZCkudGhlbigpO1xuLy8gZmlnbWEucm9vdC5zZXRQbHVnaW5EYXRhKFwiZmlsZS1pZFwiLCBcIlwiKTtcbi8vIGZpZ21hLnJvb3Quc2V0UGx1Z2luRGF0YShcInRhZ3NcIiwgXCJcIik7XG4vLyBmaWdtYS5yb290LnNldFBsdWdpbkRhdGEoXCJub2Rlc1wiLCBcIlwiKTtcbmxldCBmaWxlID0gZmlnbWEuZmlsZUtleTtcbmlmICghZmlsZSkge1xuICAgIGZpbGUgPSBmaWdtYS5yb290LmdldFBsdWdpbkRhdGEoJ2ZpbGUtaWQnKTtcbn1cbmxldCBtTm9kZVR5cGU7XG5jb25zdCBzdG9yYWdlSW5pdCA9IGFzeW5jICgpID0+IHtcbiAgICByZXR1cm4gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKFwibGFuZ3VhZ2VcIiksXG4gICAgICAgIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoXCJhY2Nlc3MtdG9rZW5cIiksXG4gICAgICAgIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoXCJwcm92aWRlclwiKSxcbiAgICAgICAgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYyhcIm5vZGUtdHlwZVwiKSxcbiAgICBdKTtcbn07XG5zd2l0Y2ggKGZpZ21hLmNvbW1hbmQpIHtcbiAgICBjYXNlICdsb29rdXAnOiB7XG4gICAgICAgIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBbbGFuZ3VhZ2UsIGFjY2Vzc1Rva2VuLCBwcm92aWRlciwgbm9kZVR5cGVdID0gYXdhaXQgc3RvcmFnZUluaXQoKTtcbiAgICAgICAgICAgIG1Ob2RlVHlwZSA9IHByb3ZpZGVyID09PSAnZG9jdW1lbnQnID8gJ2ZyYW1lJyA6IChub2RlVHlwZSA/IG5vZGVUeXBlIDogJ2ZyYW1lJyk7XG4gICAgICAgICAgICBjaGVja1NlbGVjdENhbnZhc1RhZygpO1xuICAgICAgICAgICAgZGlzcGF0Y2goXCJpbml0XCIsIHtcbiAgICAgICAgICAgICAgICBsYW5ndWFnZTogbGFuZ3VhZ2UgPyBsYW5ndWFnZSA6IFwiZW5cIixcbiAgICAgICAgICAgICAgICBhY2Nlc3NUb2tlbjogYWNjZXNzVG9rZW4sXG4gICAgICAgICAgICAgICAgdXNlcklkOiBmaWdtYS5jdXJyZW50VXNlci5pZCxcbiAgICAgICAgICAgICAgICBwcm92aWRlcjogcHJvdmlkZXIsXG4gICAgICAgICAgICAgICAgbm9kZVR5cGU6IG1Ob2RlVHlwZSxcbiAgICAgICAgICAgICAgICBwYWdlOiAnUGFnZVNlbGVjdCcsXG4gICAgICAgICAgICAgICAgZmlsZUlkOiBmaWxlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogcGFja2FnZUN1cnJlbnRTZWxlY3Rpb24oKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlICdub2RlJzpcbiAgICBkZWZhdWx0OiB7XG4gICAgICAgIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBbbGFuZ3VhZ2UsIGFjY2Vzc1Rva2VuLCBwcm92aWRlciwgbm9kZVR5cGVdID0gYXdhaXQgc3RvcmFnZUluaXQoKTtcbiAgICAgICAgICAgIG1Ob2RlVHlwZSA9IHByb3ZpZGVyID09PSAnZG9jdW1lbnQnID8gJ2ZyYW1lJyA6IChub2RlVHlwZSA/IG5vZGVUeXBlIDogJ2ZyYW1lJyk7XG4gICAgICAgICAgICBjaGVja1NlbGVjdENhbnZhc1RhZygpO1xuICAgICAgICAgICAgZGlzcGF0Y2goXCJpbml0XCIsIHtcbiAgICAgICAgICAgICAgICBsYW5ndWFnZTogbGFuZ3VhZ2UgPyBsYW5ndWFnZSA6IFwiZW5cIixcbiAgICAgICAgICAgICAgICBhY2Nlc3NUb2tlbjogYWNjZXNzVG9rZW4sXG4gICAgICAgICAgICAgICAgdXNlcklkOiBmaWdtYS5jdXJyZW50VXNlci5pZCxcbiAgICAgICAgICAgICAgICBwcm92aWRlcjogcHJvdmlkZXIsXG4gICAgICAgICAgICAgICAgbm9kZVR5cGU6IG1Ob2RlVHlwZSxcbiAgICAgICAgICAgICAgICBwYWdlOiAnUGFnZU5vZGUnLFxuICAgICAgICAgICAgICAgIGZpbGVJZDogZmlsZSxcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb246IHBhY2thZ2VDdXJyZW50U2VsZWN0aW9uKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KSgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG59XG4vLyBIYW5kbGUgZXZlbnRzIGZyb20gVUlcbmhhbmRsZUV2ZW50KCdyZXNpemUnLCAoZGF0YSkgPT4ge1xuICAgIGlmICghdWlTaG93ZWQpIHtcbiAgICAgICAgZmlnbWEudWkuc2hvdygpO1xuICAgICAgICB1aVNob3dlZCA9IHRydWU7XG4gICAgfVxuICAgIGZpZ21hLnVpLnJlc2l6ZShkYXRhLndpZHRoLCBkYXRhLmhlaWdodCk7XG59KTtcbmhhbmRsZUV2ZW50KCdjbGllbnQtc3RvcmFnZS1nZXQnLCAoZGF0YSkgPT4ge1xuICAgIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoZGF0YS5rZXkpLnRoZW4ociA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgICAgICAgIGtleTogZGF0YS5rZXksXG4gICAgICAgICAgICByZXN1bHQ6IHJcbiAgICAgICAgfTtcbiAgICAgICAgZGlzcGF0Y2goJ2NsaWVudC1zdG9yYWdlLWdldCcsIHJlc3VsdCk7XG4gICAgfSk7XG59KTtcbmhhbmRsZUV2ZW50KCdjbGllbnQtc3RvcmFnZS1zZXQnLCAoZGF0YSkgPT4ge1xuICAgIGZpZ21hLmNsaWVudFN0b3JhZ2Uuc2V0QXN5bmMoZGF0YS5rZXksIGRhdGEuZGF0YSkudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgICAgICAgIGtleTogZGF0YS5rZXksXG4gICAgICAgICAgICBzdWM6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgZGlzcGF0Y2goJ2NsaWVudC1zdG9yYWdlLXNldCcsIHJlc3VsdCk7XG4gICAgfSk7XG59KTtcbmhhbmRsZUV2ZW50KCdkb2N1bWVudC1wbHVnaW4tZGF0YS1nZXQnLCAoa2V5KSA9PiB7XG4gICAgO1xuICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgICAga2V5OiBrZXksXG4gICAgICAgIHZhbHVlOiBmaWdtYS5yb290LmdldFBsdWdpbkRhdGEoa2V5KVxuICAgIH07XG4gICAgZGlzcGF0Y2goJ2RvY3VtZW50LXBsdWdpbi1kYXRhLWdldCcsIHJlc3VsdCk7XG59KTtcbmhhbmRsZUV2ZW50KCdkb2N1bWVudC1wbHVnaW4tZGF0YS1zZXQnLCAoZGF0YSkgPT4ge1xuICAgIGZpZ21hLnJvb3Quc2V0UGx1Z2luRGF0YShkYXRhLmtleSwgZGF0YS52YWx1ZSk7XG4gICAgZGlzcGF0Y2goJ2RvY3VtZW50LXBsdWdpbi1kYXRhLXNldCcsIHtcbiAgICAgICAga2V5OiBkYXRhLmtleSxcbiAgICAgICAgc3VjOiB0cnVlXG4gICAgfSk7XG59KTtcbmhhbmRsZUV2ZW50KCdkb2N1bWVudC1zaGFyZWQtcGx1Z2luLWRhdGEtc2V0JywgKGRhdGEpID0+IHtcbiAgICBmaWdtYS5yb290LnNldFNoYXJlZFBsdWdpbkRhdGEoJ2ZpZ21hLW5vZGVzJywgZGF0YS5rZXksIGRhdGEudmFsdWUpO1xufSk7XG5sZXQgbGFzdE5vdGlmeTtcbmhhbmRsZUV2ZW50KCdub3RpZnknLCAobXNnKSA9PiB7XG4gICAgbGFzdE5vdGlmeSA9PT0gbnVsbCB8fCBsYXN0Tm90aWZ5ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBsYXN0Tm90aWZ5LmNhbmNlbCgpO1xuICAgIGlmICh0eXBlb2YgbXNnID09PSAnc3RyaW5nJykge1xuICAgICAgICBsYXN0Tm90aWZ5ID0gZmlnbWEubm90aWZ5KG1zZyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBsYXN0Tm90aWZ5ID0gZmlnbWEubm90aWZ5KEpTT04uc3RyaW5naWZ5KG1zZykpO1xuICAgIH1cbn0pO1xuaGFuZGxlRXZlbnQoJ25vdGlmeS1lcnInLCAobXNnKSA9PiB7XG4gICAgbGFzdE5vdGlmeSA9PT0gbnVsbCB8fCBsYXN0Tm90aWZ5ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBsYXN0Tm90aWZ5LmNhbmNlbCgpO1xuICAgIGlmICh0eXBlb2YgbXNnID09PSAnc3RyaW5nJykge1xuICAgICAgICBsYXN0Tm90aWZ5ID0gZmlnbWEubm90aWZ5KG1zZywgeyBlcnJvcjogdHJ1ZSB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGxhc3ROb3RpZnkgPSBmaWdtYS5ub3RpZnkoSlNPTi5zdHJpbmdpZnkobXNnKSwgeyBlcnJvcjogdHJ1ZSB9KTtcbiAgICB9XG59KTtcbmhhbmRsZUV2ZW50KCdjYW52YXMtbWFyay1ub2RlJywgKGRhdGEpID0+IHtcbiAgICBtYXJrTm9kZShuZXcgTWFwKEpTT04ucGFyc2UoZGF0YS5mdWxsVGFncykpLCBKU09OLnBhcnNlKGRhdGEubm9kZSkpO1xufSk7XG5oYW5kbGVFdmVudCgnY2FudmFzLXVubWFyay1ub2RlJywgKG5vZGVJZCkgPT4ge1xuICAgIHVubWFya05vZGUobm9kZUlkKTtcbn0pO1xuaGFuZGxlRXZlbnQoJ3JlcXVlc3Qtc2VsZWN0aW9uJywgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwicmVxdWVzdC1zZWxlY3Rpb25cIiwgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uKTtcbiAgICBkaXNwYXRjaChcInNlbGVjdGlvbmNoYW5nZVwiLCBwYWNrYWdlQ3VycmVudFNlbGVjdGlvbigpKTtcbn0pO1xuaGFuZGxlRXZlbnQoJ3NlbGVjdC1ub2RlJywgKG5vZGVJZCkgPT4ge1xuICAgIGNvbnN0IG5vZGUgPSBmaWdtYS5nZXROb2RlQnlJZChub2RlSWQpO1xuICAgIGlmIChub2RlKSB7XG4gICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlID0gZ2V0UGFnZU5vZGUobm9kZSk7XG4gICAgICAgIGlmIChub2RlLnR5cGUgIT09ICdQQUdFJykge1xuICAgICAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gW2dldFBhZ2VSb290Tm9kZShub2RlKV07XG4gICAgICAgICAgICBmaWdtYS52aWV3cG9ydC5zY3JvbGxBbmRab29tSW50b1ZpZXcoW25vZGVdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZmlnbWEubm90aWZ5KFwiTWlzc2luZyBub2RlIFwiICsgbm9kZUlkICsgXCI/XCIpO1xuICAgIH1cbn0pO1xuaGFuZGxlRXZlbnQoJ25vZGUtcmVuYW1lJywgKGRhdGEpID0+IHtcbiAgICBjb25zdCBub2RlID0gZmlnbWEuZ2V0Tm9kZUJ5SWQoZGF0YS5ub2RlSWQpO1xuICAgIGlmIChub2RlICYmIGRhdGEubmFtZSkge1xuICAgICAgICBub2RlLm5hbWUgPSBkYXRhLm5hbWU7XG4gICAgfVxufSk7XG5oYW5kbGVFdmVudCgndG9nZ2xlLW5vZGUtdHlwZScsICh0eXBlKSA9PiB7XG4gICAgZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYyhcIm5vZGUtdHlwZVwiLCB0eXBlKS50aGVuKCk7XG4gICAgbU5vZGVUeXBlID0gdHlwZTtcbiAgICBpZiAodHlwZSA9PT0gJ2RvY3VtZW50Jykge1xuICAgICAgICBmaWdtYS52aWV3cG9ydC5zY3JvbGxBbmRab29tSW50b1ZpZXcoZmlnbWEucm9vdC5jaGlsZHJlblswXS5jaGlsZHJlbik7XG4gICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbiA9IFtdO1xuICAgIH1cbiAgICBkaXNwYXRjaChcInNlbGVjdGlvbmNoYW5nZVwiLCBwYWNrYWdlQ3VycmVudFNlbGVjdGlvbigpKTtcbn0pO1xuZmlnbWEub24oXCJzZWxlY3Rpb25jaGFuZ2VcIiwgKCkgPT4ge1xuICAgIGlmIChtTm9kZVR5cGUgPT09ICdkb2N1bWVudCcpIHtcbiAgICAgICAgaWYgKGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjaGVja1NlbGVjdENhbnZhc1RhZygpO1xuICAgICAgICAgICAgZGlzcGF0Y2goXCJmb3JjZS1jaGFuZ2Utbm9kZS10eXBlXCIsICdmcmFtZScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8g54K55Ye75qCH562+55qER3JvdXDvvIzoh6rliqjpgInmi6nliLDlr7nlupTnmoTlhoXlrrlcbiAgICBjaGVja1NlbGVjdENhbnZhc1RhZygpO1xuICAgIGRpc3BhdGNoKFwic2VsZWN0aW9uY2hhbmdlXCIsIHBhY2thZ2VDdXJyZW50U2VsZWN0aW9uKCkpO1xufSk7XG5maWdtYS5vbihcImN1cnJlbnRwYWdlY2hhbmdlXCIsICgpID0+IHtcbiAgICBpZiAobU5vZGVUeXBlID09PSAnZG9jdW1lbnQnKVxuICAgICAgICByZXR1cm47XG4gICAgZGlzcGF0Y2goXCJzZWxlY3Rpb25jaGFuZ2VcIiwgcGFja2FnZUN1cnJlbnRTZWxlY3Rpb24oKSk7XG59KTtcbmZpZ21hLm9uKFwiY2xvc2VcIiwgKCkgPT4ge1xuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xufSk7XG5mdW5jdGlvbiBjaGVja1NlbGVjdENhbnZhc1RhZygpIHtcbiAgICBpZiAoZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uWzBdO1xuICAgICAgICBpZiAoc2VsZWN0LnR5cGUgPT09ICdHUk9VUCcgJiYgc2VsZWN0Lm5hbWUuc3RhcnRzV2l0aChcIlRhZyNcIikpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVJZCA9IHNlbGVjdC5uYW1lLnNsaWNlKDQpO1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IGZpZ21hLmdldE5vZGVCeUlkKG5vZGVJZCk7XG4gICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlID0gZ2V0UGFnZU5vZGUobm9kZSk7XG4gICAgICAgICAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gW25vZGVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gcGFja2FnZUN1cnJlbnRTZWxlY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJwYWNrYWdlQ3VycmVudFNlbGVjdGlvbi5tTm9kZVR5cGVcIiwgbU5vZGVUeXBlKTtcbiAgICBpZiAobU5vZGVUeXBlID09PSAnZnJhbWUnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uLmxlbmd0aCA+IDAgPyBnZXRQYWdlUm9vdE5vZGUoZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uWzBdKSA6IGZpZ21hLmN1cnJlbnRQYWdlO1xuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBpc0VtYmVkTm9kZUxpa2Uobm9kZSkgPyBub2RlLndpZHRoIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3aWR0aFwiLCB3aWR0aCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6IG5vZGUudHlwZSA9PT0gJ1BBR0UnID8gJ1BBR0UnIDogJ0ZSQU1FJyxcbiAgICAgICAgICAgICAgICBpZDogbm9kZS5pZCxcbiAgICAgICAgICAgICAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncGFja2FnZUN1cnJlbnRTZWxlY3Rpb24nLCBlKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ1BBR0UnLFxuICAgICAgICAgICAgICAgIGlkOiBmaWdtYS5jdXJyZW50UGFnZS5pZCxcbiAgICAgICAgICAgICAgICBuYW1lOiBmaWdtYS5jdXJyZW50UGFnZS5uYW1lLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAtMVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChtTm9kZVR5cGUgPT09ICdkb2N1bWVudCcpIHtcbiAgICAgICAgY29uc3QgZG9jdW1lbnQgPSBmaWdtYS5yb290O1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogJ0RPQ1VNRU5UJyxcbiAgICAgICAgICAgIGlkOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBuYW1lOiBkb2N1bWVudC5uYW1lLFxuICAgICAgICAgICAgd2lkdGg6IC0xXG4gICAgICAgIH07XG4gICAgfVxufVxuZnVuY3Rpb24gaXNSb290RnJhbWUobm9kZSkge1xuICAgIHJldHVybiBub2RlLnBhcmVudC50eXBlID09IFwiUEFHRVwiO1xufVxuZnVuY3Rpb24gZ2V0UGFnZVJvb3ROb2RlKG5vZGUpIHtcbiAgICBpZiAobm9kZS5wYXJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIHdoaWxlIChub2RlLnBhcmVudC50eXBlICE9PSBcIlBBR0VcIikge1xuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnQ7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xufVxuZnVuY3Rpb24gZ2V0UGFnZU5vZGUobm9kZSkge1xuICAgIHdoaWxlIChub2RlLnR5cGUgIT09IFwiUEFHRVwiKSB7XG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG59XG5mdW5jdGlvbiBpc0VtYmVkTm9kZUxpa2Uobm9kZSkge1xuICAgIHJldHVybiB0cnVlO1xufVxuIiwiY29uc3Qgb2Zmc2V0ID0gNjM7XG5jb25zdCBtYXJrTm9kZSA9IChmdWxsVGFncywgbm9kZURhdGEpID0+IHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3Qgbm9kZSA9IGZpZ21hLmdldE5vZGVCeUlkKG5vZGVEYXRhLm5vZGVfaWQpO1xuICAgIGlmIChub2RlICYmIGlzRW1iZWROb2RlTGlrZShub2RlKSkge1xuICAgICAgICBub2RlLnNldFJlbGF1bmNoRGF0YSh7XG4gICAgICAgICAgICAnbm9kZSc6IG5vZGVEYXRhLnRpdGxlLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcGFnZSA9IGdldFBhZ2VOb2RlKG5vZGUpO1xuICAgICAgICBpZiAocGFnZS5pZCA9PT0gbm9kZS5pZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgdGlsZU5vZGVJZCA9IHBhZ2UuZ2V0UGx1Z2luRGF0YShub2RlRGF0YS5ub2RlX2lkKTtcbiAgICAgICAgaWYgKHRpbGVOb2RlSWQpIHtcbiAgICAgICAgICAgIChfYSA9IGZpZ21hLmdldE5vZGVCeUlkKHRpbGVOb2RlSWQpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE9iamVjdC52YWx1ZXMobm9kZURhdGEudGFncykuZmxhdCgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8g5rKh5pyJ5Lu75L2V5qCH562+XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZmlnbWEubG9hZEZvbnRBc3luYyh7IGZhbWlseTogXCJJbnRlclwiLCBzdHlsZTogXCJTZW1pIEJvbGRcIiB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vY29uc3QgdGFnRnJhbWVzID0gW107XG4gICAgICAgICAgICBjb25zdCByb290ID0gZmlnbWEuY3JlYXRlRnJhbWUoKTtcbiAgICAgICAgICAgIHJvb3QueCA9IG5vZGUueDtcbiAgICAgICAgICAgIHJvb3QueSA9IG5vZGUueSAtIG9mZnNldDtcbiAgICAgICAgICAgIGNvbnN0IHRhZ3MgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IHR5cGUgaW4gbm9kZURhdGEudGFncykge1xuICAgICAgICAgICAgICAgIGlmIChmdWxsVGFncy5oYXModHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFncy5wdXNoKC4uLmZ1bGxUYWdzLmdldCh0eXBlKS50YWdzLmZpbHRlcih0ID0+IG5vZGVEYXRhLnRhZ3NbdHlwZV0uZmluZCh0MCA9PiB0Lm5hbWUgPT09IHQwKSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJvb3QubmFtZSA9IHRhZ3MubWFwKHQgPT4gdC5uYW1lKS5qb2luKCk7XG4gICAgICAgICAgICByb290LmZpbGxzID0gW107XG4gICAgICAgICAgICByb290LmxheW91dE1vZGUgPSAnSE9SSVpPTlRBTCc7XG4gICAgICAgICAgICByb290LmxheW91dEFsaWduID0gJ0lOSEVSSVQnO1xuICAgICAgICAgICAgcm9vdC5sYXlvdXRHcm93ID0gMDtcbiAgICAgICAgICAgIHJvb3QucHJpbWFyeUF4aXNBbGlnbkl0ZW1zID0gJ01JTic7XG4gICAgICAgICAgICByb290LnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9ICdBVVRPJztcbiAgICAgICAgICAgIHJvb3QuY291bnRlckF4aXNTaXppbmdNb2RlID0gJ0FVVE8nO1xuICAgICAgICAgICAgcm9vdC5pdGVtU3BhY2luZyA9IDg7XG4gICAgICAgICAgICB0YWdzLmZvckVhY2godGFnID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmcmFtZSA9IGZpZ21hLmNyZWF0ZUZyYW1lKCk7XG4gICAgICAgICAgICAgICAgLy8gZnJhbWUueCA9IG5vZGUueDtcbiAgICAgICAgICAgICAgICAvLyBmcmFtZS55ID0gbm9kZS55IC0gNDA7XG4gICAgICAgICAgICAgICAgZnJhbWUubmFtZSA9IHRhZy5uYW1lO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRleHQgPSBmaWdtYS5jcmVhdGVUZXh0KCk7XG4gICAgICAgICAgICAgICAgdGV4dC5mb250TmFtZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZmFtaWx5OiBcIkludGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiBcIlNlbWkgQm9sZFwiXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0ZXh0LmxpbmVIZWlnaHQgPSB7IHZhbHVlOiAyNywgdW5pdDogJ1BJWEVMUycgfTtcbiAgICAgICAgICAgICAgICB0ZXh0LmZvbnRTaXplID0gMTg7XG4gICAgICAgICAgICAgICAgdGV4dC5jaGFyYWN0ZXJzID0gdGFnLm5hbWU7XG4gICAgICAgICAgICAgICAgdGV4dC5maWxscyA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlNPTElEXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHI6IHRhZy5jb2xvci5yIC8gMjU1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGc6IHRhZy5jb2xvci5nIC8gMjU1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGI6IHRhZy5jb2xvci5iIC8gMjU1LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IHRhZy5jb2xvci5hXG4gICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgIC8vIHRleHQuaHlwZXJsaW5rID0ge1xuICAgICAgICAgICAgICAgIC8vICAgICB0eXBlOiBcIlVSTFwiLFxuICAgICAgICAgICAgICAgIC8vICAgICB2YWx1ZTogbm9kZURhdGFcbiAgICAgICAgICAgICAgICAvLyB9O1xuICAgICAgICAgICAgICAgIGZyYW1lLmFwcGVuZENoaWxkKHRleHQpO1xuICAgICAgICAgICAgICAgIGZyYW1lLmxheW91dE1vZGUgPSBcIkhPUklaT05UQUxcIjtcbiAgICAgICAgICAgICAgICBmcmFtZS5wcmltYXJ5QXhpc1NpemluZ01vZGUgPSBcIkFVVE9cIjtcbiAgICAgICAgICAgICAgICBmcmFtZS5jb3VudGVyQXhpc1NpemluZ01vZGUgPSBcIkFVVE9cIjtcbiAgICAgICAgICAgICAgICBmcmFtZS5wYWRkaW5nVG9wID0gNjtcbiAgICAgICAgICAgICAgICBmcmFtZS5wYWRkaW5nQm90dG9tID0gNjtcbiAgICAgICAgICAgICAgICBmcmFtZS5wYWRkaW5nTGVmdCA9IDE2O1xuICAgICAgICAgICAgICAgIGZyYW1lLnBhZGRpbmdSaWdodCA9IDE2O1xuICAgICAgICAgICAgICAgIGZyYW1lLmNvcm5lclJhZGl1cyA9IDQ7XG4gICAgICAgICAgICAgICAgZnJhbWUuZmlsbHMgPSBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJTT0xJRFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByOiB0YWcuYmFja2dyb3VuZC5yIC8gMjU1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGc6IHRhZy5iYWNrZ3JvdW5kLmcgLyAyNTUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYjogdGFnLmJhY2tncm91bmQuYiAvIDI1NSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgZnJhbWUuc3Ryb2tlcyA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlNPTElEXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogeyByOiAwLCBnOiAwLCBiOiAwIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLjA1XG4gICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgIHJvb3QuYXBwZW5kQ2hpbGQoZnJhbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IGZpZ21hLmdyb3VwKFtyb290XSwgcGFnZSk7XG4gICAgICAgICAgICBncm91cC5uYW1lID0gXCJUYWcjXCIgKyBub2RlRGF0YS5ub2RlX2lkO1xuICAgICAgICAgICAgZ3JvdXAubG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHBhZ2UuYXBwZW5kQ2hpbGQoZ3JvdXApO1xuICAgICAgICAgICAgcGFnZS5zZXRQbHVnaW5EYXRhKG5vZGVEYXRhLm5vZGVfaWQsIGdyb3VwLmlkKTtcbiAgICAgICAgfSkuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBmaWdtYS5ub3RpZnkoXCJGb250IGZhbWlseSBub3QgZm91bmQhXCIsIHsgZXJyb3I6IHRydWUgfSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbmNvbnN0IHVubWFya05vZGUgPSAobm9kZUlkKSA9PiB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IG5vZGUgPSBmaWdtYS5nZXROb2RlQnlJZChub2RlSWQpO1xuICAgIGlmIChub2RlICYmIGlzRW1iZWROb2RlTGlrZShub2RlKSkge1xuICAgICAgICBub2RlLnNldFJlbGF1bmNoRGF0YSh7fSk7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSBnZXRQYWdlTm9kZShub2RlKTtcbiAgICAgICAgY29uc3QgdGlsZU5vZGVJZCA9IHBhZ2UuZ2V0UGx1Z2luRGF0YShub2RlSWQpO1xuICAgICAgICBpZiAodGlsZU5vZGVJZCkge1xuICAgICAgICAgICAgKF9hID0gZmlnbWEuZ2V0Tm9kZUJ5SWQodGlsZU5vZGVJZCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5mdW5jdGlvbiBpc0VtYmVkTm9kZUxpa2Uobm9kZSkge1xuICAgIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gZ2V0UGFnZU5vZGUobm9kZSkge1xuICAgIHdoaWxlIChub2RlLnR5cGUgIT09IFwiUEFHRVwiKSB7XG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG59XG5jb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICBmb3IgKGxldCBlbCBvZiBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24pIHtcbiAgICAgICAgY29uc3QgdGlsZU5vZGVJZCA9IGZpZ21hLmN1cnJlbnRQYWdlLmdldFBsdWdpbkRhdGEoZWwuaWQpO1xuICAgICAgICBpZiAodGlsZU5vZGVJZCkge1xuICAgICAgICAgICAgY29uc3QgdGlsZU5vZGUgPSBmaWdtYS5nZXROb2RlQnlJZCh0aWxlTm9kZUlkKTtcbiAgICAgICAgICAgIGlmICh0aWxlTm9kZSAmJiAodGlsZU5vZGUudHlwZSA9PT0gJ0dST1VQJyB8fCB0aWxlTm9kZS50eXBlID09PSAnRlJBTUUnKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aWxlTm9kZS54ICE9IGVsLnggfHwgdGlsZU5vZGUueSAhPSBlbC55IC0gb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRpbGVOb2RlLnggPSBlbC54O1xuICAgICAgICAgICAgICAgICAgICB0aWxlTm9kZS55ID0gZWwueSAtIG9mZnNldDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59LCA1MCk7XG5jb25zb2xlLmxvZyhcImNvZGVDYW52YXNUYWcgaW5pdCFcIik7XG5leHBvcnQgeyBpbnRlcnZhbCwgbWFya05vZGUsIHVubWFya05vZGUgfTtcbiIsImNvbnN0IGV2ZW50TGlzdGVuZXJzID0gW107XG5leHBvcnQgY29uc3QgZGlzcGF0Y2ggPSAoYWN0aW9uLCBkYXRhKSA9PiB7XG4gICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyBhY3Rpb24sIGRhdGEgfSk7XG59O1xuZXhwb3J0IGNvbnN0IGhhbmRsZUV2ZW50ID0gKHR5cGUsIGNhbGxiYWNrKSA9PiB7XG4gICAgZXZlbnRMaXN0ZW5lcnMucHVzaCh7IHR5cGUsIGNhbGxiYWNrIH0pO1xufTtcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IG1lc3NhZ2UgPT4ge1xuICAgIGZvciAobGV0IGV2ZW50TGlzdGVuZXIgb2YgZXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSBldmVudExpc3RlbmVyLnR5cGUpXG4gICAgICAgICAgICBldmVudExpc3RlbmVyLmNhbGxiYWNrKG1lc3NhZ2UuZGF0YSk7XG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=