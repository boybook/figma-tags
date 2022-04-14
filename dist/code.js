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
//figma.clientStorage.setAsync("tags", undefined).then();
//figma.clientStorage.setAsync("nodes", undefined).then();
//figma.clientStorage.setAsync("language", "ch").then();
//figma.root.setPluginData("file-id", "");
let file = figma.fileKey;
if (!file) {
    file = figma.root.getPluginData('file-id');
}
const storageInit = async () => {
    return await Promise.all([
        figma.clientStorage.getAsync("language"),
        figma.clientStorage.getAsync("access-token"),
        figma.clientStorage.getAsync("provider"),
    ]);
};
switch (figma.command) {
    case 'lookup': {
        (async () => {
            const [language, accessToken, provider] = await storageInit();
            Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])("init", {
                language: language ? language : "en",
                accessToken: accessToken,
                provider: provider,
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
            const [language, accessToken, provider] = await storageInit();
            Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])("init", {
                language: language ? language : "en",
                accessToken: accessToken,
                provider: provider,
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
Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('document-plugin-data-set', (data) => {
    figma.root.setPluginData(data.key, data.value);
});
Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('notify', (msg) => {
    figma.notify(msg);
});
Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('notify-err', (msg) => {
    figma.notify(msg, { error: true });
});
Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('canvas-mark-node', (data) => {
    Object(_codeCanvasTag__WEBPACK_IMPORTED_MODULE_1__["markNode"])(new Map(JSON.parse(data.fullTags)), JSON.parse(data.node));
});
Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('canvas-unmark-node', (nodeId) => {
    Object(_codeCanvasTag__WEBPACK_IMPORTED_MODULE_1__["unmarkNode"])(nodeId);
});
figma.on("selectionchange", () => {
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])("selectionchange", packageCurrentSelection());
});
figma.on("currentpagechange", () => {
    console.log("currentpagechange", figma.currentPage.selection);
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])("selectionchange", packageCurrentSelection());
});
figma.on("close", () => {
    clearInterval(_codeCanvasTag__WEBPACK_IMPORTED_MODULE_1__["interval"]);
});
function packageCurrentSelection() {
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
function isRootFrame(node) {
    return node.parent.type == "PAGE";
}
function getPageRootNode(node) {
    console.log("===========", node.parent);
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
        figma.loadFontAsync({ family: "Inter", style: "Medium" }).then(() => {
            //const tagFrames = [];
            const root = figma.createFrame();
            root.x = node.x;
            root.y = node.y - 38;
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
                        color: { r: 0, g: 0, b: 0 },
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
                tileNode.x = el.x;
                tileNode.y = el.y - 38;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGVDYW52YXNUYWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGVNZXNzYWdlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUE2RDtBQUNJO0FBQ2pFLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksb0VBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLG9FQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1RUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsdUVBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxvRUFBUTtBQUNoQixLQUFLO0FBQ0wsQ0FBQztBQUNELHVFQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsb0VBQVE7QUFDaEIsS0FBSztBQUNMLENBQUM7QUFDRCx1RUFBVztBQUNYO0FBQ0EsQ0FBQztBQUNELHVFQUFXO0FBQ1g7QUFDQSxDQUFDO0FBQ0QsdUVBQVc7QUFDWCx1QkFBdUIsY0FBYztBQUNyQyxDQUFDO0FBQ0QsdUVBQVc7QUFDWCxJQUFJLCtEQUFRO0FBQ1osQ0FBQztBQUNELHVFQUFXO0FBQ1gsSUFBSSxpRUFBVTtBQUNkLENBQUM7QUFDRDtBQUNBLElBQUksb0VBQVE7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBLElBQUksb0VBQVE7QUFDWixDQUFDO0FBQ0Q7QUFDQSxrQkFBa0IsdURBQVE7QUFDMUIsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoSkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixtQ0FBbUM7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLGdDQUFnQyxtQkFBbUI7QUFDbkQ7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Qsb0RBQW9ELGNBQWM7QUFDbEU7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUMwQzs7Ozs7Ozs7Ozs7OztBQ3BJMUM7QUFBQTtBQUFBO0FBQUE7QUFDTztBQUNQLDBCQUEwQixlQUFlO0FBQ3pDO0FBQ087QUFDUCx5QkFBeUIsaUJBQWlCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9jb2RlLnRzXCIpO1xuIiwiaW1wb3J0IHsgZGlzcGF0Y2gsIGhhbmRsZUV2ZW50IH0gZnJvbSAnLi9jb2RlTWVzc2FnZUhhbmRsZXInO1xuaW1wb3J0IHsgaW50ZXJ2YWwsIG1hcmtOb2RlLCB1bm1hcmtOb2RlIH0gZnJvbSBcIi4vY29kZUNhbnZhc1RhZ1wiO1xuZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7IHZpc2libGU6IGZhbHNlIH0pO1xubGV0IHVpU2hvd2VkID0gZmFsc2U7XG4vL2ZpZ21hLmNsaWVudFN0b3JhZ2Uuc2V0QXN5bmMoXCJ0YWdzXCIsIHVuZGVmaW5lZCkudGhlbigpO1xuLy9maWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKFwibm9kZXNcIiwgdW5kZWZpbmVkKS50aGVuKCk7XG4vL2ZpZ21hLmNsaWVudFN0b3JhZ2Uuc2V0QXN5bmMoXCJsYW5ndWFnZVwiLCBcImNoXCIpLnRoZW4oKTtcbi8vZmlnbWEucm9vdC5zZXRQbHVnaW5EYXRhKFwiZmlsZS1pZFwiLCBcIlwiKTtcbmxldCBmaWxlID0gZmlnbWEuZmlsZUtleTtcbmlmICghZmlsZSkge1xuICAgIGZpbGUgPSBmaWdtYS5yb290LmdldFBsdWdpbkRhdGEoJ2ZpbGUtaWQnKTtcbn1cbmNvbnN0IHN0b3JhZ2VJbml0ID0gYXN5bmMgKCkgPT4ge1xuICAgIHJldHVybiBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoXCJsYW5ndWFnZVwiKSxcbiAgICAgICAgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYyhcImFjY2Vzcy10b2tlblwiKSxcbiAgICAgICAgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYyhcInByb3ZpZGVyXCIpLFxuICAgIF0pO1xufTtcbnN3aXRjaCAoZmlnbWEuY29tbWFuZCkge1xuICAgIGNhc2UgJ2xvb2t1cCc6IHtcbiAgICAgICAgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IFtsYW5ndWFnZSwgYWNjZXNzVG9rZW4sIHByb3ZpZGVyXSA9IGF3YWl0IHN0b3JhZ2VJbml0KCk7XG4gICAgICAgICAgICBkaXNwYXRjaChcImluaXRcIiwge1xuICAgICAgICAgICAgICAgIGxhbmd1YWdlOiBsYW5ndWFnZSA/IGxhbmd1YWdlIDogXCJlblwiLFxuICAgICAgICAgICAgICAgIGFjY2Vzc1Rva2VuOiBhY2Nlc3NUb2tlbixcbiAgICAgICAgICAgICAgICBwcm92aWRlcjogcHJvdmlkZXIsXG4gICAgICAgICAgICAgICAgcGFnZTogJ1BhZ2VTZWxlY3QnLFxuICAgICAgICAgICAgICAgIGZpbGVJZDogZmlsZSxcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb246IHBhY2thZ2VDdXJyZW50U2VsZWN0aW9uKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KSgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSAnbm9kZSc6XG4gICAgZGVmYXVsdDoge1xuICAgICAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgW2xhbmd1YWdlLCBhY2Nlc3NUb2tlbiwgcHJvdmlkZXJdID0gYXdhaXQgc3RvcmFnZUluaXQoKTtcbiAgICAgICAgICAgIGRpc3BhdGNoKFwiaW5pdFwiLCB7XG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2U6IGxhbmd1YWdlID8gbGFuZ3VhZ2UgOiBcImVuXCIsXG4gICAgICAgICAgICAgICAgYWNjZXNzVG9rZW46IGFjY2Vzc1Rva2VuLFxuICAgICAgICAgICAgICAgIHByb3ZpZGVyOiBwcm92aWRlcixcbiAgICAgICAgICAgICAgICBwYWdlOiAnUGFnZU5vZGUnLFxuICAgICAgICAgICAgICAgIGZpbGVJZDogZmlsZSxcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb246IHBhY2thZ2VDdXJyZW50U2VsZWN0aW9uKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KSgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG59XG4vLyBIYW5kbGUgZXZlbnRzIGZyb20gVUlcbmhhbmRsZUV2ZW50KCdyZXNpemUnLCAoZGF0YSkgPT4ge1xuICAgIGlmICghdWlTaG93ZWQpIHtcbiAgICAgICAgZmlnbWEudWkuc2hvdygpO1xuICAgICAgICB1aVNob3dlZCA9IHRydWU7XG4gICAgfVxuICAgIGZpZ21hLnVpLnJlc2l6ZShkYXRhLndpZHRoLCBkYXRhLmhlaWdodCk7XG59KTtcbmhhbmRsZUV2ZW50KCdjbGllbnQtc3RvcmFnZS1nZXQnLCAoZGF0YSkgPT4ge1xuICAgIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoZGF0YS5rZXkpLnRoZW4ociA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgICAgICAgIGtleTogZGF0YS5rZXksXG4gICAgICAgICAgICByZXN1bHQ6IHJcbiAgICAgICAgfTtcbiAgICAgICAgZGlzcGF0Y2goJ2NsaWVudC1zdG9yYWdlLWdldCcsIHJlc3VsdCk7XG4gICAgfSk7XG59KTtcbmhhbmRsZUV2ZW50KCdjbGllbnQtc3RvcmFnZS1zZXQnLCAoZGF0YSkgPT4ge1xuICAgIGZpZ21hLmNsaWVudFN0b3JhZ2Uuc2V0QXN5bmMoZGF0YS5rZXksIGRhdGEuZGF0YSkudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgICAgICAgIGtleTogZGF0YS5rZXksXG4gICAgICAgICAgICBzdWM6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgZGlzcGF0Y2goJ2NsaWVudC1zdG9yYWdlLXNldCcsIHJlc3VsdCk7XG4gICAgfSk7XG59KTtcbmhhbmRsZUV2ZW50KCdkb2N1bWVudC1wbHVnaW4tZGF0YS1zZXQnLCAoZGF0YSkgPT4ge1xuICAgIGZpZ21hLnJvb3Quc2V0UGx1Z2luRGF0YShkYXRhLmtleSwgZGF0YS52YWx1ZSk7XG59KTtcbmhhbmRsZUV2ZW50KCdub3RpZnknLCAobXNnKSA9PiB7XG4gICAgZmlnbWEubm90aWZ5KG1zZyk7XG59KTtcbmhhbmRsZUV2ZW50KCdub3RpZnktZXJyJywgKG1zZykgPT4ge1xuICAgIGZpZ21hLm5vdGlmeShtc2csIHsgZXJyb3I6IHRydWUgfSk7XG59KTtcbmhhbmRsZUV2ZW50KCdjYW52YXMtbWFyay1ub2RlJywgKGRhdGEpID0+IHtcbiAgICBtYXJrTm9kZShuZXcgTWFwKEpTT04ucGFyc2UoZGF0YS5mdWxsVGFncykpLCBKU09OLnBhcnNlKGRhdGEubm9kZSkpO1xufSk7XG5oYW5kbGVFdmVudCgnY2FudmFzLXVubWFyay1ub2RlJywgKG5vZGVJZCkgPT4ge1xuICAgIHVubWFya05vZGUobm9kZUlkKTtcbn0pO1xuZmlnbWEub24oXCJzZWxlY3Rpb25jaGFuZ2VcIiwgKCkgPT4ge1xuICAgIGRpc3BhdGNoKFwic2VsZWN0aW9uY2hhbmdlXCIsIHBhY2thZ2VDdXJyZW50U2VsZWN0aW9uKCkpO1xufSk7XG5maWdtYS5vbihcImN1cnJlbnRwYWdlY2hhbmdlXCIsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcImN1cnJlbnRwYWdlY2hhbmdlXCIsIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbik7XG4gICAgZGlzcGF0Y2goXCJzZWxlY3Rpb25jaGFuZ2VcIiwgcGFja2FnZUN1cnJlbnRTZWxlY3Rpb24oKSk7XG59KTtcbmZpZ21hLm9uKFwiY2xvc2VcIiwgKCkgPT4ge1xuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xufSk7XG5mdW5jdGlvbiBwYWNrYWdlQ3VycmVudFNlbGVjdGlvbigpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBub2RlID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uLmxlbmd0aCA+IDAgPyBnZXRQYWdlUm9vdE5vZGUoZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uWzBdKSA6IGZpZ21hLmN1cnJlbnRQYWdlO1xuICAgICAgICBjb25zdCB3aWR0aCA9IGlzRW1iZWROb2RlTGlrZShub2RlKSA/IG5vZGUud2lkdGggOiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnNvbGUubG9nKFwid2lkdGhcIiwgd2lkdGgpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogbm9kZS50eXBlID09PSAnUEFHRScgPyAnUEFHRScgOiAnRlJBTUUnLFxuICAgICAgICAgICAgaWQ6IG5vZGUuaWQsXG4gICAgICAgICAgICBuYW1lOiBub2RlLm5hbWUsXG4gICAgICAgICAgICB3aWR0aDogd2lkdGhcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3BhY2thZ2VDdXJyZW50U2VsZWN0aW9uJywgZSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiAnUEFHRScsXG4gICAgICAgICAgICBpZDogZmlnbWEuY3VycmVudFBhZ2UuaWQsXG4gICAgICAgICAgICBuYW1lOiBmaWdtYS5jdXJyZW50UGFnZS5uYW1lLFxuICAgICAgICAgICAgd2lkdGg6IC0xXG4gICAgICAgIH07XG4gICAgfVxufVxuZnVuY3Rpb24gaXNSb290RnJhbWUobm9kZSkge1xuICAgIHJldHVybiBub2RlLnBhcmVudC50eXBlID09IFwiUEFHRVwiO1xufVxuZnVuY3Rpb24gZ2V0UGFnZVJvb3ROb2RlKG5vZGUpIHtcbiAgICBjb25zb2xlLmxvZyhcIj09PT09PT09PT09XCIsIG5vZGUucGFyZW50KTtcbiAgICBpZiAobm9kZS5wYXJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIHdoaWxlIChub2RlLnBhcmVudC50eXBlICE9PSBcIlBBR0VcIikge1xuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnQ7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xufVxuZnVuY3Rpb24gZ2V0UGFnZU5vZGUobm9kZSkge1xuICAgIHdoaWxlIChub2RlLnR5cGUgIT09IFwiUEFHRVwiKSB7XG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG59XG5mdW5jdGlvbiBpc0VtYmVkTm9kZUxpa2Uobm9kZSkge1xuICAgIHJldHVybiB0cnVlO1xufVxuIiwiY29uc3QgbWFya05vZGUgPSAoZnVsbFRhZ3MsIG5vZGVEYXRhKSA9PiB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IG5vZGUgPSBmaWdtYS5nZXROb2RlQnlJZChub2RlRGF0YS5ub2RlX2lkKTtcbiAgICBpZiAobm9kZSAmJiBpc0VtYmVkTm9kZUxpa2Uobm9kZSkpIHtcbiAgICAgICAgbm9kZS5zZXRSZWxhdW5jaERhdGEoe1xuICAgICAgICAgICAgJ25vZGUnOiBub2RlRGF0YS50aXRsZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSBnZXRQYWdlTm9kZShub2RlKTtcbiAgICAgICAgaWYgKHBhZ2UuaWQgPT09IG5vZGUuaWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHRpbGVOb2RlSWQgPSBwYWdlLmdldFBsdWdpbkRhdGEobm9kZURhdGEubm9kZV9pZCk7XG4gICAgICAgIGlmICh0aWxlTm9kZUlkKSB7XG4gICAgICAgICAgICAoX2EgPSBmaWdtYS5nZXROb2RlQnlJZCh0aWxlTm9kZUlkKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChPYmplY3QudmFsdWVzKG5vZGVEYXRhLnRhZ3MpLmZsYXQoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIOayoeacieS7u+S9leagh+etvlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZpZ21hLmxvYWRGb250QXN5bmMoeyBmYW1pbHk6IFwiSW50ZXJcIiwgc3R5bGU6IFwiTWVkaXVtXCIgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvL2NvbnN0IHRhZ0ZyYW1lcyA9IFtdO1xuICAgICAgICAgICAgY29uc3Qgcm9vdCA9IGZpZ21hLmNyZWF0ZUZyYW1lKCk7XG4gICAgICAgICAgICByb290LnggPSBub2RlLng7XG4gICAgICAgICAgICByb290LnkgPSBub2RlLnkgLSAzODtcbiAgICAgICAgICAgIGNvbnN0IHRhZ3MgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IHR5cGUgaW4gbm9kZURhdGEudGFncykge1xuICAgICAgICAgICAgICAgIGlmIChmdWxsVGFncy5oYXModHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFncy5wdXNoKC4uLmZ1bGxUYWdzLmdldCh0eXBlKS50YWdzLmZpbHRlcih0ID0+IG5vZGVEYXRhLnRhZ3NbdHlwZV0uZmluZCh0MCA9PiB0Lm5hbWUgPT09IHQwKSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJvb3QubmFtZSA9IHRhZ3MubWFwKHQgPT4gdC5uYW1lKS5qb2luKCk7XG4gICAgICAgICAgICByb290LmZpbGxzID0gW107XG4gICAgICAgICAgICByb290LmxheW91dE1vZGUgPSAnSE9SSVpPTlRBTCc7XG4gICAgICAgICAgICByb290LmxheW91dEFsaWduID0gJ0lOSEVSSVQnO1xuICAgICAgICAgICAgcm9vdC5sYXlvdXRHcm93ID0gMDtcbiAgICAgICAgICAgIHJvb3QucHJpbWFyeUF4aXNBbGlnbkl0ZW1zID0gJ01JTic7XG4gICAgICAgICAgICByb290LnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9ICdBVVRPJztcbiAgICAgICAgICAgIHJvb3QuY291bnRlckF4aXNTaXppbmdNb2RlID0gJ0FVVE8nO1xuICAgICAgICAgICAgcm9vdC5pdGVtU3BhY2luZyA9IDg7XG4gICAgICAgICAgICB0YWdzLmZvckVhY2godGFnID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmcmFtZSA9IGZpZ21hLmNyZWF0ZUZyYW1lKCk7XG4gICAgICAgICAgICAgICAgLy8gZnJhbWUueCA9IG5vZGUueDtcbiAgICAgICAgICAgICAgICAvLyBmcmFtZS55ID0gbm9kZS55IC0gNDA7XG4gICAgICAgICAgICAgICAgZnJhbWUubmFtZSA9IHRhZy5uYW1lO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRleHQgPSBmaWdtYS5jcmVhdGVUZXh0KCk7XG4gICAgICAgICAgICAgICAgdGV4dC5mb250TmFtZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZmFtaWx5OiBcIkludGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiBcIk1lZGl1bVwiXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0ZXh0LmxpbmVIZWlnaHQgPSB7IHZhbHVlOiAxNCwgdW5pdDogJ1BJWEVMUycgfTtcbiAgICAgICAgICAgICAgICB0ZXh0LmZvbnRTaXplID0gMTI7XG4gICAgICAgICAgICAgICAgdGV4dC5jaGFyYWN0ZXJzID0gdGFnLm5hbWU7XG4gICAgICAgICAgICAgICAgdGV4dC5maWxscyA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlNPTElEXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHI6IHRhZy5jb2xvci5yIC8gMjU1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGc6IHRhZy5jb2xvci5nIC8gMjU1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGI6IHRhZy5jb2xvci5iIC8gMjU1LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IHRhZy5jb2xvci5hXG4gICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgIC8vIHRleHQuaHlwZXJsaW5rID0ge1xuICAgICAgICAgICAgICAgIC8vICAgICB0eXBlOiBcIlVSTFwiLFxuICAgICAgICAgICAgICAgIC8vICAgICB2YWx1ZTogbm9kZURhdGFcbiAgICAgICAgICAgICAgICAvLyB9O1xuICAgICAgICAgICAgICAgIGZyYW1lLmFwcGVuZENoaWxkKHRleHQpO1xuICAgICAgICAgICAgICAgIGZyYW1lLmxheW91dE1vZGUgPSBcIkhPUklaT05UQUxcIjtcbiAgICAgICAgICAgICAgICBmcmFtZS5wcmltYXJ5QXhpc1NpemluZ01vZGUgPSBcIkFVVE9cIjtcbiAgICAgICAgICAgICAgICBmcmFtZS5jb3VudGVyQXhpc1NpemluZ01vZGUgPSBcIkFVVE9cIjtcbiAgICAgICAgICAgICAgICBmcmFtZS5wYWRkaW5nVG9wID0gNDtcbiAgICAgICAgICAgICAgICBmcmFtZS5wYWRkaW5nQm90dG9tID0gNDtcbiAgICAgICAgICAgICAgICBmcmFtZS5wYWRkaW5nTGVmdCA9IDg7XG4gICAgICAgICAgICAgICAgZnJhbWUucGFkZGluZ1JpZ2h0ID0gODtcbiAgICAgICAgICAgICAgICBmcmFtZS5jb3JuZXJSYWRpdXMgPSA0O1xuICAgICAgICAgICAgICAgIGZyYW1lLmZpbGxzID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiU09MSURcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcjogdGFnLmJhY2tncm91bmQuciAvIDI1NSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnOiB0YWcuYmFja2dyb3VuZC5nIC8gMjU1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGI6IHRhZy5iYWNrZ3JvdW5kLmIgLyAyNTUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgIGZyYW1lLnN0cm9rZXMgPSBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJTT0xJRFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHsgcjogMCwgZzogMCwgYjogMCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMC4wNVxuICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICByb290LmFwcGVuZENoaWxkKGZyYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBmaWdtYS5ncm91cChbcm9vdF0sIHBhZ2UpO1xuICAgICAgICAgICAgZ3JvdXAubmFtZSA9IHJvb3QubmFtZTtcbiAgICAgICAgICAgIHBhZ2UuYXBwZW5kQ2hpbGQoZ3JvdXApO1xuICAgICAgICAgICAgcGFnZS5zZXRQbHVnaW5EYXRhKG5vZGVEYXRhLm5vZGVfaWQsIGdyb3VwLmlkKTtcbiAgICAgICAgfSkuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBmaWdtYS5ub3RpZnkoXCJGb250IGZhbWlseSBub3QgZm91bmQhXCIsIHsgZXJyb3I6IHRydWUgfSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbmNvbnN0IHVubWFya05vZGUgPSAobm9kZUlkKSA9PiB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IG5vZGUgPSBmaWdtYS5nZXROb2RlQnlJZChub2RlSWQpO1xuICAgIGlmIChub2RlICYmIGlzRW1iZWROb2RlTGlrZShub2RlKSkge1xuICAgICAgICBub2RlLnNldFJlbGF1bmNoRGF0YSh7fSk7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSBnZXRQYWdlTm9kZShub2RlKTtcbiAgICAgICAgY29uc3QgdGlsZU5vZGVJZCA9IHBhZ2UuZ2V0UGx1Z2luRGF0YShub2RlSWQpO1xuICAgICAgICBpZiAodGlsZU5vZGVJZCkge1xuICAgICAgICAgICAgKF9hID0gZmlnbWEuZ2V0Tm9kZUJ5SWQodGlsZU5vZGVJZCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5mdW5jdGlvbiBpc0VtYmVkTm9kZUxpa2Uobm9kZSkge1xuICAgIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gZ2V0UGFnZU5vZGUobm9kZSkge1xuICAgIHdoaWxlIChub2RlLnR5cGUgIT09IFwiUEFHRVwiKSB7XG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG59XG5jb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICBmb3IgKGxldCBlbCBvZiBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24pIHtcbiAgICAgICAgY29uc3QgdGlsZU5vZGVJZCA9IGZpZ21hLmN1cnJlbnRQYWdlLmdldFBsdWdpbkRhdGEoZWwuaWQpO1xuICAgICAgICBpZiAodGlsZU5vZGVJZCkge1xuICAgICAgICAgICAgY29uc3QgdGlsZU5vZGUgPSBmaWdtYS5nZXROb2RlQnlJZCh0aWxlTm9kZUlkKTtcbiAgICAgICAgICAgIGlmICh0aWxlTm9kZSAmJiAodGlsZU5vZGUudHlwZSA9PT0gJ0dST1VQJyB8fCB0aWxlTm9kZS50eXBlID09PSAnRlJBTUUnKSkge1xuICAgICAgICAgICAgICAgIHRpbGVOb2RlLnggPSBlbC54O1xuICAgICAgICAgICAgICAgIHRpbGVOb2RlLnkgPSBlbC55IC0gMzg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59LCA1MCk7XG5jb25zb2xlLmxvZyhcImNvZGVDYW52YXNUYWcgaW5pdCFcIik7XG5leHBvcnQgeyBpbnRlcnZhbCwgbWFya05vZGUsIHVubWFya05vZGUgfTtcbiIsImNvbnN0IGV2ZW50TGlzdGVuZXJzID0gW107XG5leHBvcnQgY29uc3QgZGlzcGF0Y2ggPSAoYWN0aW9uLCBkYXRhKSA9PiB7XG4gICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyBhY3Rpb24sIGRhdGEgfSk7XG59O1xuZXhwb3J0IGNvbnN0IGhhbmRsZUV2ZW50ID0gKHR5cGUsIGNhbGxiYWNrKSA9PiB7XG4gICAgZXZlbnRMaXN0ZW5lcnMucHVzaCh7IHR5cGUsIGNhbGxiYWNrIH0pO1xufTtcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IG1lc3NhZ2UgPT4ge1xuICAgIGZvciAobGV0IGV2ZW50TGlzdGVuZXIgb2YgZXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSBldmVudExpc3RlbmVyLnR5cGUpXG4gICAgICAgICAgICBldmVudExpc3RlbmVyLmNhbGxiYWNrKG1lc3NhZ2UuZGF0YSk7XG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=