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
figma.clientStorage.setAsync("access-token", undefined).then();
figma.root.setPluginData("file-id", "");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGVDYW52YXNUYWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGVNZXNzYWdlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUE2RDtBQUNJO0FBQ2pFLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLG9FQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLG9FQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUVBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELHVFQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsb0VBQVE7QUFDaEIsS0FBSztBQUNMLENBQUM7QUFDRCx1RUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG9FQUFRO0FBQ2hCLEtBQUs7QUFDTCxDQUFDO0FBQ0QsdUVBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxvRUFBUTtBQUNaLENBQUM7QUFDRCx1RUFBVztBQUNYO0FBQ0EsSUFBSSxvRUFBUTtBQUNaO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQztBQUNELHVFQUFXO0FBQ1g7QUFDQSxDQUFDO0FBQ0Q7QUFDQSx1RUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELHVFQUFXO0FBQ1g7QUFDQTtBQUNBLHdDQUF3QyxjQUFjO0FBQ3REO0FBQ0E7QUFDQSx3REFBd0QsY0FBYztBQUN0RTtBQUNBLENBQUM7QUFDRCx1RUFBVztBQUNYLElBQUksK0RBQVE7QUFDWixDQUFDO0FBQ0QsdUVBQVc7QUFDWCxJQUFJLGlFQUFVO0FBQ2QsQ0FBQztBQUNELHVFQUFXO0FBQ1g7QUFDQSxJQUFJLG9FQUFRO0FBQ1osQ0FBQztBQUNELHVFQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCx1RUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELHVFQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxvRUFBUTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksb0VBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksb0VBQVE7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsSUFBSSxvRUFBUTtBQUNaLENBQUM7QUFDRDtBQUNBLGtCQUFrQix1REFBUTtBQUMxQixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzVQQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsc0NBQXNDO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxnQ0FBZ0MsbUJBQW1CO0FBQ25EO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULG9EQUFvRCxjQUFjO0FBQ2xFO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQzBDOzs7Ozs7Ozs7Ozs7O0FDdkkxQztBQUFBO0FBQUE7QUFBQTtBQUNPO0FBQ1AsMEJBQTBCLGVBQWU7QUFDekM7QUFDTztBQUNQLHlCQUF5QixpQkFBaUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2NvZGUudHNcIik7XG4iLCJpbXBvcnQgeyBkaXNwYXRjaCwgaGFuZGxlRXZlbnQgfSBmcm9tICcuL2NvZGVNZXNzYWdlSGFuZGxlcic7XG5pbXBvcnQgeyBpbnRlcnZhbCwgbWFya05vZGUsIHVubWFya05vZGUgfSBmcm9tIFwiLi9jb2RlQ2FudmFzVGFnXCI7XG5maWdtYS5zaG93VUkoX19odG1sX18sIHsgdmlzaWJsZTogZmFsc2UgfSk7XG5sZXQgdWlTaG93ZWQgPSBmYWxzZTtcbi8vIGZpZ21hLmNsaWVudFN0b3JhZ2Uuc2V0QXN5bmMoXCJ0YWdzXCIsIHVuZGVmaW5lZCkudGhlbigpO1xuLy8gZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYyhcIm5vZGVzXCIsIHVuZGVmaW5lZCkudGhlbigpO1xuLy8gZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYyhcImxhbmd1YWdlXCIsIFwiY2hcIikudGhlbigpO1xuLy8gZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYyhcInByb3ZpZGVyXCIsIHVuZGVmaW5lZCkudGhlbigpO1xuZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYyhcImFjY2Vzcy10b2tlblwiLCB1bmRlZmluZWQpLnRoZW4oKTtcbmZpZ21hLnJvb3Quc2V0UGx1Z2luRGF0YShcImZpbGUtaWRcIiwgXCJcIik7XG4vLyBmaWdtYS5yb290LnNldFBsdWdpbkRhdGEoXCJ0YWdzXCIsIFwiXCIpO1xuLy8gZmlnbWEucm9vdC5zZXRQbHVnaW5EYXRhKFwibm9kZXNcIiwgXCJcIik7XG5sZXQgZmlsZSA9IGZpZ21hLmZpbGVLZXk7XG5pZiAoIWZpbGUpIHtcbiAgICBmaWxlID0gZmlnbWEucm9vdC5nZXRQbHVnaW5EYXRhKCdmaWxlLWlkJyk7XG59XG5sZXQgbU5vZGVUeXBlO1xuY29uc3Qgc3RvcmFnZUluaXQgPSBhc3luYyAoKSA9PiB7XG4gICAgcmV0dXJuIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYyhcImxhbmd1YWdlXCIpLFxuICAgICAgICBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKFwiYWNjZXNzLXRva2VuXCIpLFxuICAgICAgICBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKFwicHJvdmlkZXJcIiksXG4gICAgICAgIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoXCJub2RlLXR5cGVcIiksXG4gICAgXSk7XG59O1xuc3dpdGNoIChmaWdtYS5jb21tYW5kKSB7XG4gICAgY2FzZSAnbG9va3VwJzoge1xuICAgICAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgW2xhbmd1YWdlLCBhY2Nlc3NUb2tlbiwgcHJvdmlkZXIsIG5vZGVUeXBlXSA9IGF3YWl0IHN0b3JhZ2VJbml0KCk7XG4gICAgICAgICAgICBtTm9kZVR5cGUgPSBwcm92aWRlciA9PT0gJ2RvY3VtZW50JyA/ICdmcmFtZScgOiAobm9kZVR5cGUgPyBub2RlVHlwZSA6ICdmcmFtZScpO1xuICAgICAgICAgICAgY2hlY2tTZWxlY3RDYW52YXNUYWcoKTtcbiAgICAgICAgICAgIGRpc3BhdGNoKFwiaW5pdFwiLCB7XG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2U6IGxhbmd1YWdlID8gbGFuZ3VhZ2UgOiBcImVuXCIsXG4gICAgICAgICAgICAgICAgYWNjZXNzVG9rZW46IGFjY2Vzc1Rva2VuLFxuICAgICAgICAgICAgICAgIHVzZXJJZDogZmlnbWEuY3VycmVudFVzZXIuaWQsXG4gICAgICAgICAgICAgICAgcHJvdmlkZXI6IHByb3ZpZGVyLFxuICAgICAgICAgICAgICAgIG5vZGVUeXBlOiBtTm9kZVR5cGUsXG4gICAgICAgICAgICAgICAgcGFnZTogJ1BhZ2VTZWxlY3QnLFxuICAgICAgICAgICAgICAgIGZpbGVJZDogZmlsZSxcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb246IHBhY2thZ2VDdXJyZW50U2VsZWN0aW9uKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KSgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSAnbm9kZSc6XG4gICAgZGVmYXVsdDoge1xuICAgICAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgW2xhbmd1YWdlLCBhY2Nlc3NUb2tlbiwgcHJvdmlkZXIsIG5vZGVUeXBlXSA9IGF3YWl0IHN0b3JhZ2VJbml0KCk7XG4gICAgICAgICAgICBtTm9kZVR5cGUgPSBwcm92aWRlciA9PT0gJ2RvY3VtZW50JyA/ICdmcmFtZScgOiAobm9kZVR5cGUgPyBub2RlVHlwZSA6ICdmcmFtZScpO1xuICAgICAgICAgICAgY2hlY2tTZWxlY3RDYW52YXNUYWcoKTtcbiAgICAgICAgICAgIGRpc3BhdGNoKFwiaW5pdFwiLCB7XG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2U6IGxhbmd1YWdlID8gbGFuZ3VhZ2UgOiBcImVuXCIsXG4gICAgICAgICAgICAgICAgYWNjZXNzVG9rZW46IGFjY2Vzc1Rva2VuLFxuICAgICAgICAgICAgICAgIHVzZXJJZDogZmlnbWEuY3VycmVudFVzZXIuaWQsXG4gICAgICAgICAgICAgICAgcHJvdmlkZXI6IHByb3ZpZGVyLFxuICAgICAgICAgICAgICAgIG5vZGVUeXBlOiBtTm9kZVR5cGUsXG4gICAgICAgICAgICAgICAgcGFnZTogJ1BhZ2VOb2RlJyxcbiAgICAgICAgICAgICAgICBmaWxlSWQ6IGZpbGUsXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBwYWNrYWdlQ3VycmVudFNlbGVjdGlvbigpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxufVxuLy8gSGFuZGxlIGV2ZW50cyBmcm9tIFVJXG5oYW5kbGVFdmVudCgncmVzaXplJywgKGRhdGEpID0+IHtcbiAgICBpZiAoIXVpU2hvd2VkKSB7XG4gICAgICAgIGZpZ21hLnVpLnNob3coKTtcbiAgICAgICAgdWlTaG93ZWQgPSB0cnVlO1xuICAgIH1cbiAgICBmaWdtYS51aS5yZXNpemUoZGF0YS53aWR0aCwgZGF0YS5oZWlnaHQpO1xufSk7XG5oYW5kbGVFdmVudCgnY2xpZW50LXN0b3JhZ2UtZ2V0JywgKGRhdGEpID0+IHtcbiAgICBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKGRhdGEua2V5KS50aGVuKHIgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgICAgICBrZXk6IGRhdGEua2V5LFxuICAgICAgICAgICAgcmVzdWx0OiByXG4gICAgICAgIH07XG4gICAgICAgIGRpc3BhdGNoKCdjbGllbnQtc3RvcmFnZS1nZXQnLCByZXN1bHQpO1xuICAgIH0pO1xufSk7XG5oYW5kbGVFdmVudCgnY2xpZW50LXN0b3JhZ2Utc2V0JywgKGRhdGEpID0+IHtcbiAgICBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKGRhdGEua2V5LCBkYXRhLmRhdGEpLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgICAgICBrZXk6IGRhdGEua2V5LFxuICAgICAgICAgICAgc3VjOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIGRpc3BhdGNoKCdjbGllbnQtc3RvcmFnZS1zZXQnLCByZXN1bHQpO1xuICAgIH0pO1xufSk7XG5oYW5kbGVFdmVudCgnZG9jdW1lbnQtcGx1Z2luLWRhdGEtZ2V0JywgKGtleSkgPT4ge1xuICAgIDtcbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgIGtleToga2V5LFxuICAgICAgICB2YWx1ZTogZmlnbWEucm9vdC5nZXRQbHVnaW5EYXRhKGtleSlcbiAgICB9O1xuICAgIGRpc3BhdGNoKCdkb2N1bWVudC1wbHVnaW4tZGF0YS1nZXQnLCByZXN1bHQpO1xufSk7XG5oYW5kbGVFdmVudCgnZG9jdW1lbnQtcGx1Z2luLWRhdGEtc2V0JywgKGRhdGEpID0+IHtcbiAgICBmaWdtYS5yb290LnNldFBsdWdpbkRhdGEoZGF0YS5rZXksIGRhdGEudmFsdWUpO1xuICAgIGRpc3BhdGNoKCdkb2N1bWVudC1wbHVnaW4tZGF0YS1zZXQnLCB7XG4gICAgICAgIGtleTogZGF0YS5rZXksXG4gICAgICAgIHN1YzogdHJ1ZVxuICAgIH0pO1xufSk7XG5oYW5kbGVFdmVudCgnZG9jdW1lbnQtc2hhcmVkLXBsdWdpbi1kYXRhLXNldCcsIChkYXRhKSA9PiB7XG4gICAgZmlnbWEucm9vdC5zZXRTaGFyZWRQbHVnaW5EYXRhKCdmaWdtYS1ub2RlcycsIGRhdGEua2V5LCBkYXRhLnZhbHVlKTtcbn0pO1xubGV0IGxhc3ROb3RpZnk7XG5oYW5kbGVFdmVudCgnbm90aWZ5JywgKG1zZykgPT4ge1xuICAgIGxhc3ROb3RpZnkgPT09IG51bGwgfHwgbGFzdE5vdGlmeSA9PT0gdm9pZCAwID8gdm9pZCAwIDogbGFzdE5vdGlmeS5jYW5jZWwoKTtcbiAgICBpZiAodHlwZW9mIG1zZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbGFzdE5vdGlmeSA9IGZpZ21hLm5vdGlmeShtc2cpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbGFzdE5vdGlmeSA9IGZpZ21hLm5vdGlmeShKU09OLnN0cmluZ2lmeShtc2cpKTtcbiAgICB9XG59KTtcbmhhbmRsZUV2ZW50KCdub3RpZnktZXJyJywgKG1zZykgPT4ge1xuICAgIGxhc3ROb3RpZnkgPT09IG51bGwgfHwgbGFzdE5vdGlmeSA9PT0gdm9pZCAwID8gdm9pZCAwIDogbGFzdE5vdGlmeS5jYW5jZWwoKTtcbiAgICBpZiAodHlwZW9mIG1zZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbGFzdE5vdGlmeSA9IGZpZ21hLm5vdGlmeShtc2csIHsgZXJyb3I6IHRydWUgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBsYXN0Tm90aWZ5ID0gZmlnbWEubm90aWZ5KEpTT04uc3RyaW5naWZ5KG1zZyksIHsgZXJyb3I6IHRydWUgfSk7XG4gICAgfVxufSk7XG5oYW5kbGVFdmVudCgnY2FudmFzLW1hcmstbm9kZScsIChkYXRhKSA9PiB7XG4gICAgbWFya05vZGUobmV3IE1hcChKU09OLnBhcnNlKGRhdGEuZnVsbFRhZ3MpKSwgSlNPTi5wYXJzZShkYXRhLm5vZGUpKTtcbn0pO1xuaGFuZGxlRXZlbnQoJ2NhbnZhcy11bm1hcmstbm9kZScsIChub2RlSWQpID0+IHtcbiAgICB1bm1hcmtOb2RlKG5vZGVJZCk7XG59KTtcbmhhbmRsZUV2ZW50KCdyZXF1ZXN0LXNlbGVjdGlvbicsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcInJlcXVlc3Qtc2VsZWN0aW9uXCIsIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbik7XG4gICAgZGlzcGF0Y2goXCJzZWxlY3Rpb25jaGFuZ2VcIiwgcGFja2FnZUN1cnJlbnRTZWxlY3Rpb24oKSk7XG59KTtcbmhhbmRsZUV2ZW50KCdzZWxlY3Qtbm9kZScsIChub2RlSWQpID0+IHtcbiAgICBjb25zdCBub2RlID0gZmlnbWEuZ2V0Tm9kZUJ5SWQobm9kZUlkKTtcbiAgICBpZiAobm9kZSkge1xuICAgICAgICBmaWdtYS5jdXJyZW50UGFnZSA9IGdldFBhZ2VOb2RlKG5vZGUpO1xuICAgICAgICBpZiAobm9kZS50eXBlICE9PSAnUEFHRScpIHtcbiAgICAgICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbiA9IFtnZXRQYWdlUm9vdE5vZGUobm9kZSldO1xuICAgICAgICAgICAgZmlnbWEudmlld3BvcnQuc2Nyb2xsQW5kWm9vbUludG9WaWV3KFtub2RlXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZpZ21hLm5vdGlmeShcIk1pc3Npbmcgbm9kZSBcIiArIG5vZGVJZCArIFwiP1wiKTtcbiAgICB9XG59KTtcbmhhbmRsZUV2ZW50KCdub2RlLXJlbmFtZScsIChkYXRhKSA9PiB7XG4gICAgY29uc3Qgbm9kZSA9IGZpZ21hLmdldE5vZGVCeUlkKGRhdGEubm9kZUlkKTtcbiAgICBpZiAobm9kZSAmJiBkYXRhLm5hbWUpIHtcbiAgICAgICAgbm9kZS5uYW1lID0gZGF0YS5uYW1lO1xuICAgIH1cbn0pO1xuaGFuZGxlRXZlbnQoJ3RvZ2dsZS1ub2RlLXR5cGUnLCAodHlwZSkgPT4ge1xuICAgIGZpZ21hLmNsaWVudFN0b3JhZ2Uuc2V0QXN5bmMoXCJub2RlLXR5cGVcIiwgdHlwZSkudGhlbigpO1xuICAgIG1Ob2RlVHlwZSA9IHR5cGU7XG4gICAgaWYgKHR5cGUgPT09ICdkb2N1bWVudCcpIHtcbiAgICAgICAgZmlnbWEudmlld3BvcnQuc2Nyb2xsQW5kWm9vbUludG9WaWV3KGZpZ21hLnJvb3QuY2hpbGRyZW5bMF0uY2hpbGRyZW4pO1xuICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBbXTtcbiAgICB9XG4gICAgZGlzcGF0Y2goXCJzZWxlY3Rpb25jaGFuZ2VcIiwgcGFja2FnZUN1cnJlbnRTZWxlY3Rpb24oKSk7XG59KTtcbmZpZ21hLm9uKFwic2VsZWN0aW9uY2hhbmdlXCIsICgpID0+IHtcbiAgICBpZiAobU5vZGVUeXBlID09PSAnZG9jdW1lbnQnKSB7XG4gICAgICAgIGlmIChmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY2hlY2tTZWxlY3RDYW52YXNUYWcoKTtcbiAgICAgICAgICAgIGRpc3BhdGNoKFwiZm9yY2UtY2hhbmdlLW5vZGUtdHlwZVwiLCAnZnJhbWUnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIOeCueWHu+agh+etvueahEdyb3Vw77yM6Ieq5Yqo6YCJ5oup5Yiw5a+55bqU55qE5YaF5a65XG4gICAgY2hlY2tTZWxlY3RDYW52YXNUYWcoKTtcbiAgICBkaXNwYXRjaChcInNlbGVjdGlvbmNoYW5nZVwiLCBwYWNrYWdlQ3VycmVudFNlbGVjdGlvbigpKTtcbn0pO1xuZmlnbWEub24oXCJjdXJyZW50cGFnZWNoYW5nZVwiLCAoKSA9PiB7XG4gICAgaWYgKG1Ob2RlVHlwZSA9PT0gJ2RvY3VtZW50JylcbiAgICAgICAgcmV0dXJuO1xuICAgIGRpc3BhdGNoKFwic2VsZWN0aW9uY2hhbmdlXCIsIHBhY2thZ2VDdXJyZW50U2VsZWN0aW9uKCkpO1xufSk7XG5maWdtYS5vbihcImNsb3NlXCIsICgpID0+IHtcbiAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbn0pO1xuZnVuY3Rpb24gY2hlY2tTZWxlY3RDYW52YXNUYWcoKSB7XG4gICAgaWYgKGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdCA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvblswXTtcbiAgICAgICAgaWYgKHNlbGVjdC50eXBlID09PSAnR1JPVVAnICYmIHNlbGVjdC5uYW1lLnN0YXJ0c1dpdGgoXCJUYWcjXCIpKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlSWQgPSBzZWxlY3QubmFtZS5zbGljZSg0KTtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBmaWdtYS5nZXROb2RlQnlJZChub2RlSWQpO1xuICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBmaWdtYS5jdXJyZW50UGFnZSA9IGdldFBhZ2VOb2RlKG5vZGUpO1xuICAgICAgICAgICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbiA9IFtub2RlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIHBhY2thZ2VDdXJyZW50U2VsZWN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFwicGFja2FnZUN1cnJlbnRTZWxlY3Rpb24ubU5vZGVUeXBlXCIsIG1Ob2RlVHlwZSk7XG4gICAgaWYgKG1Ob2RlVHlwZSA9PT0gJ2ZyYW1lJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbi5sZW5ndGggPiAwID8gZ2V0UGFnZVJvb3ROb2RlKGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvblswXSkgOiBmaWdtYS5jdXJyZW50UGFnZTtcbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gaXNFbWJlZE5vZGVMaWtlKG5vZGUpID8gbm9kZS53aWR0aCA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid2lkdGhcIiwgd2lkdGgpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBub2RlLnR5cGUgPT09ICdQQUdFJyA/ICdQQUdFJyA6ICdGUkFNRScsXG4gICAgICAgICAgICAgICAgaWQ6IG5vZGUuaWQsXG4gICAgICAgICAgICAgICAgbmFtZTogbm9kZS5uYW1lLFxuICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhY2thZ2VDdXJyZW50U2VsZWN0aW9uJywgZSk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdQQUdFJyxcbiAgICAgICAgICAgICAgICBpZDogZmlnbWEuY3VycmVudFBhZ2UuaWQsXG4gICAgICAgICAgICAgICAgbmFtZTogZmlnbWEuY3VycmVudFBhZ2UubmFtZSxcbiAgICAgICAgICAgICAgICB3aWR0aDogLTFcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAobU5vZGVUeXBlID09PSAnZG9jdW1lbnQnKSB7XG4gICAgICAgIGNvbnN0IGRvY3VtZW50ID0gZmlnbWEucm9vdDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6ICdET0NVTUVOVCcsXG4gICAgICAgICAgICBpZDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgbmFtZTogZG9jdW1lbnQubmFtZSxcbiAgICAgICAgICAgIHdpZHRoOiAtMVxuICAgICAgICB9O1xuICAgIH1cbn1cbmZ1bmN0aW9uIGlzUm9vdEZyYW1lKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5wYXJlbnQudHlwZSA9PSBcIlBBR0VcIjtcbn1cbmZ1bmN0aW9uIGdldFBhZ2VSb290Tm9kZShub2RlKSB7XG4gICAgaWYgKG5vZGUucGFyZW50ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICB3aGlsZSAobm9kZS5wYXJlbnQudHlwZSAhPT0gXCJQQUdFXCIpIHtcbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbn1cbmZ1bmN0aW9uIGdldFBhZ2VOb2RlKG5vZGUpIHtcbiAgICB3aGlsZSAobm9kZS50eXBlICE9PSBcIlBBR0VcIikge1xuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnQ7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xufVxuZnVuY3Rpb24gaXNFbWJlZE5vZGVMaWtlKG5vZGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbiIsImNvbnN0IG9mZnNldCA9IDQ5O1xuY29uc3QgbWFya05vZGUgPSAoZnVsbFRhZ3MsIG5vZGVEYXRhKSA9PiB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IG5vZGUgPSBmaWdtYS5nZXROb2RlQnlJZChub2RlRGF0YS5ub2RlX2lkKTtcbiAgICBpZiAobm9kZSAmJiBpc0VtYmVkTm9kZUxpa2Uobm9kZSkpIHtcbiAgICAgICAgbm9kZS5zZXRSZWxhdW5jaERhdGEoe1xuICAgICAgICAgICAgJ25vZGUnOiBub2RlRGF0YS50aXRsZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSBnZXRQYWdlTm9kZShub2RlKTtcbiAgICAgICAgaWYgKHBhZ2UuaWQgPT09IG5vZGUuaWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHRpbGVOb2RlSWQgPSBwYWdlLmdldFBsdWdpbkRhdGEobm9kZURhdGEubm9kZV9pZCk7XG4gICAgICAgIGlmICh0aWxlTm9kZUlkKSB7XG4gICAgICAgICAgICAoX2EgPSBmaWdtYS5nZXROb2RlQnlJZCh0aWxlTm9kZUlkKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChPYmplY3QudmFsdWVzKG5vZGVEYXRhLnRhZ3MpLmZsYXQoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIOayoeacieS7u+S9leagh+etvlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZpZ21hLmxvYWRGb250QXN5bmMoeyBmYW1pbHk6IFwiSW50ZXJcIiwgc3R5bGU6IFwiU2VtaSBCb2xkXCIgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvL2NvbnN0IHRhZ0ZyYW1lcyA9IFtdO1xuICAgICAgICAgICAgY29uc3Qgcm9vdCA9IGZpZ21hLmNyZWF0ZUZyYW1lKCk7XG4gICAgICAgICAgICByb290LnggPSBub2RlLng7XG4gICAgICAgICAgICByb290LnkgPSBub2RlLnkgLSBvZmZzZXQ7XG4gICAgICAgICAgICBjb25zdCB0YWdzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCB0eXBlIGluIG5vZGVEYXRhLnRhZ3MpIHtcbiAgICAgICAgICAgICAgICBpZiAoZnVsbFRhZ3MuaGFzKHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhZ3MucHVzaCguLi5mdWxsVGFncy5nZXQodHlwZSkudGFncy5maWx0ZXIodCA9PiBub2RlRGF0YS50YWdzW3R5cGVdLmZpbmQodDAgPT4gdC5uYW1lID09PSB0MCkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb290Lm5hbWUgPSB0YWdzLm1hcCh0ID0+IHQubmFtZSkuam9pbigpO1xuICAgICAgICAgICAgcm9vdC5maWxscyA9IFtdO1xuICAgICAgICAgICAgcm9vdC5sYXlvdXRNb2RlID0gJ0hPUklaT05UQUwnO1xuICAgICAgICAgICAgcm9vdC5sYXlvdXRBbGlnbiA9ICdJTkhFUklUJztcbiAgICAgICAgICAgIHJvb3QubGF5b3V0R3JvdyA9IDA7XG4gICAgICAgICAgICByb290LnByaW1hcnlBeGlzQWxpZ25JdGVtcyA9ICdNSU4nO1xuICAgICAgICAgICAgcm9vdC5wcmltYXJ5QXhpc1NpemluZ01vZGUgPSAnQVVUTyc7XG4gICAgICAgICAgICByb290LmNvdW50ZXJBeGlzU2l6aW5nTW9kZSA9ICdBVVRPJztcbiAgICAgICAgICAgIHJvb3QuaXRlbVNwYWNpbmcgPSA4O1xuICAgICAgICAgICAgdGFncy5mb3JFYWNoKHRhZyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZnJhbWUgPSBmaWdtYS5jcmVhdGVGcmFtZSgpO1xuICAgICAgICAgICAgICAgIC8vIGZyYW1lLnggPSBub2RlLng7XG4gICAgICAgICAgICAgICAgLy8gZnJhbWUueSA9IG5vZGUueSAtIDQwO1xuICAgICAgICAgICAgICAgIGZyYW1lLm5hbWUgPSB0YWcubmFtZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0gZmlnbWEuY3JlYXRlVGV4dCgpO1xuICAgICAgICAgICAgICAgIHRleHQuZm9udE5hbWUgPSB7XG4gICAgICAgICAgICAgICAgICAgIGZhbWlseTogXCJJbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogXCJTZW1pIEJvbGRcIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGV4dC5saW5lSGVpZ2h0ID0geyB2YWx1ZTogMjEsIHVuaXQ6ICdQSVhFTFMnIH07XG4gICAgICAgICAgICAgICAgdGV4dC5mb250U2l6ZSA9IDE0O1xuICAgICAgICAgICAgICAgIHRleHQuY2hhcmFjdGVycyA9IHRhZy5uYW1lO1xuICAgICAgICAgICAgICAgIHRleHQuZmlsbHMgPSBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJTT0xJRFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByOiB0YWcuY29sb3IuciAvIDI1NSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnOiB0YWcuY29sb3IuZyAvIDI1NSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiOiB0YWcuY29sb3IuYiAvIDI1NSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiB0YWcuY29sb3IuYVxuICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICAvLyB0ZXh0Lmh5cGVybGluayA9IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgdHlwZTogXCJVUkxcIixcbiAgICAgICAgICAgICAgICAvLyAgICAgdmFsdWU6IG5vZGVEYXRhXG4gICAgICAgICAgICAgICAgLy8gfTtcbiAgICAgICAgICAgICAgICBmcmFtZS5hcHBlbmRDaGlsZCh0ZXh0KTtcbiAgICAgICAgICAgICAgICBmcmFtZS5sYXlvdXRNb2RlID0gXCJIT1JJWk9OVEFMXCI7XG4gICAgICAgICAgICAgICAgZnJhbWUucHJpbWFyeUF4aXNTaXppbmdNb2RlID0gXCJBVVRPXCI7XG4gICAgICAgICAgICAgICAgZnJhbWUuY291bnRlckF4aXNTaXppbmdNb2RlID0gXCJBVVRPXCI7XG4gICAgICAgICAgICAgICAgZnJhbWUucGFkZGluZ1RvcCA9IDQ7XG4gICAgICAgICAgICAgICAgZnJhbWUucGFkZGluZ0JvdHRvbSA9IDQ7XG4gICAgICAgICAgICAgICAgZnJhbWUucGFkZGluZ0xlZnQgPSAxNjtcbiAgICAgICAgICAgICAgICBmcmFtZS5wYWRkaW5nUmlnaHQgPSAxNjtcbiAgICAgICAgICAgICAgICBmcmFtZS5jb3JuZXJSYWRpdXMgPSA0O1xuICAgICAgICAgICAgICAgIGZyYW1lLmZpbGxzID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiU09MSURcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcjogdGFnLmJhY2tncm91bmQuciAvIDI1NSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnOiB0YWcuYmFja2dyb3VuZC5nIC8gMjU1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGI6IHRhZy5iYWNrZ3JvdW5kLmIgLyAyNTUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgIGZyYW1lLnN0cm9rZXMgPSBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJTT0xJRFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHsgcjogMCwgZzogMCwgYjogMCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMC4wNVxuICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICByb290LmFwcGVuZENoaWxkKGZyYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBmaWdtYS5ncm91cChbcm9vdF0sIHBhZ2UpO1xuICAgICAgICAgICAgZ3JvdXAubmFtZSA9IFwiVGFnI1wiICsgbm9kZURhdGEubm9kZV9pZDtcbiAgICAgICAgICAgIHBhZ2UuYXBwZW5kQ2hpbGQoZ3JvdXApO1xuICAgICAgICAgICAgcGFnZS5zZXRQbHVnaW5EYXRhKG5vZGVEYXRhLm5vZGVfaWQsIGdyb3VwLmlkKTtcbiAgICAgICAgfSkuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBmaWdtYS5ub3RpZnkoXCJGb250IGZhbWlseSBub3QgZm91bmQhXCIsIHsgZXJyb3I6IHRydWUgfSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbmNvbnN0IHVubWFya05vZGUgPSAobm9kZUlkKSA9PiB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IG5vZGUgPSBmaWdtYS5nZXROb2RlQnlJZChub2RlSWQpO1xuICAgIGlmIChub2RlICYmIGlzRW1iZWROb2RlTGlrZShub2RlKSkge1xuICAgICAgICBub2RlLnNldFJlbGF1bmNoRGF0YSh7fSk7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSBnZXRQYWdlTm9kZShub2RlKTtcbiAgICAgICAgY29uc3QgdGlsZU5vZGVJZCA9IHBhZ2UuZ2V0UGx1Z2luRGF0YShub2RlSWQpO1xuICAgICAgICBpZiAodGlsZU5vZGVJZCkge1xuICAgICAgICAgICAgKF9hID0gZmlnbWEuZ2V0Tm9kZUJ5SWQodGlsZU5vZGVJZCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5mdW5jdGlvbiBpc0VtYmVkTm9kZUxpa2Uobm9kZSkge1xuICAgIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gZ2V0UGFnZU5vZGUobm9kZSkge1xuICAgIHdoaWxlIChub2RlLnR5cGUgIT09IFwiUEFHRVwiKSB7XG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG59XG5jb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICBmb3IgKGxldCBlbCBvZiBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24pIHtcbiAgICAgICAgY29uc3QgdGlsZU5vZGVJZCA9IGZpZ21hLmN1cnJlbnRQYWdlLmdldFBsdWdpbkRhdGEoZWwuaWQpO1xuICAgICAgICBpZiAodGlsZU5vZGVJZCkge1xuICAgICAgICAgICAgY29uc3QgdGlsZU5vZGUgPSBmaWdtYS5nZXROb2RlQnlJZCh0aWxlTm9kZUlkKTtcbiAgICAgICAgICAgIGlmICh0aWxlTm9kZSAmJiAodGlsZU5vZGUudHlwZSA9PT0gJ0dST1VQJyB8fCB0aWxlTm9kZS50eXBlID09PSAnRlJBTUUnKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aWxlTm9kZS54ICE9IGVsLnggfHwgdGlsZU5vZGUueSAhPSBlbC55IC0gb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRpbGVOb2RlLnggPSBlbC54O1xuICAgICAgICAgICAgICAgICAgICB0aWxlTm9kZS55ID0gZWwueSAtIG9mZnNldDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59LCA1MCk7XG5jb25zb2xlLmxvZyhcImNvZGVDYW52YXNUYWcgaW5pdCFcIik7XG5leHBvcnQgeyBpbnRlcnZhbCwgbWFya05vZGUsIHVubWFya05vZGUgfTtcbiIsImNvbnN0IGV2ZW50TGlzdGVuZXJzID0gW107XG5leHBvcnQgY29uc3QgZGlzcGF0Y2ggPSAoYWN0aW9uLCBkYXRhKSA9PiB7XG4gICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyBhY3Rpb24sIGRhdGEgfSk7XG59O1xuZXhwb3J0IGNvbnN0IGhhbmRsZUV2ZW50ID0gKHR5cGUsIGNhbGxiYWNrKSA9PiB7XG4gICAgZXZlbnRMaXN0ZW5lcnMucHVzaCh7IHR5cGUsIGNhbGxiYWNrIH0pO1xufTtcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IG1lc3NhZ2UgPT4ge1xuICAgIGZvciAobGV0IGV2ZW50TGlzdGVuZXIgb2YgZXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSBldmVudExpc3RlbmVyLnR5cGUpXG4gICAgICAgICAgICBldmVudExpc3RlbmVyLmNhbGxiYWNrKG1lc3NhZ2UuZGF0YSk7XG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=