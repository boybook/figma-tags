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
//figma.clientStorage.setAsync("provider", undefined).then();
//figma.clientStorage.setAsync("access-token", undefined).then();
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
            checkSelectCanvasTag();
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
            checkSelectCanvasTag();
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
Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('notify', (msg) => {
    if (typeof msg === 'string') {
        figma.notify(msg);
    }
    else {
        figma.notify(JSON.stringify(msg));
    }
});
Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('notify-err', (msg) => {
    if (typeof msg === 'string') {
        figma.notify(msg, { error: true });
    }
    else {
        figma.notify(JSON.stringify(msg), { error: true });
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
figma.on("selectionchange", () => {
    // 点击标签的Group，自动选择到对应的内容
    checkSelectCanvasTag();
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])("selectionchange", packageCurrentSelection());
});
figma.on("currentpagechange", () => {
    console.log("currentpagechange", figma.currentPage.selection);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGVDYW52YXNUYWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGVNZXNzYWdlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUE2RDtBQUNJO0FBQ2pFLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksb0VBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDMEM7Ozs7Ozs7Ozs7Ozs7QUN2STFDO0FBQUE7QUFBQTtBQUFBO0FBQ087QUFDUCwwQkFBMEIsZUFBZTtBQUN6QztBQUNPO0FBQ1AseUJBQXlCLGlCQUFpQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY29kZS50c1wiKTtcbiIsImltcG9ydCB7IGRpc3BhdGNoLCBoYW5kbGVFdmVudCB9IGZyb20gJy4vY29kZU1lc3NhZ2VIYW5kbGVyJztcbmltcG9ydCB7IGludGVydmFsLCBtYXJrTm9kZSwgdW5tYXJrTm9kZSB9IGZyb20gXCIuL2NvZGVDYW52YXNUYWdcIjtcbmZpZ21hLnNob3dVSShfX2h0bWxfXywgeyB2aXNpYmxlOiBmYWxzZSB9KTtcbmxldCB1aVNob3dlZCA9IGZhbHNlO1xuLy9maWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKFwidGFnc1wiLCB1bmRlZmluZWQpLnRoZW4oKTtcbi8vZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYyhcIm5vZGVzXCIsIHVuZGVmaW5lZCkudGhlbigpO1xuLy9maWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKFwibGFuZ3VhZ2VcIiwgXCJjaFwiKS50aGVuKCk7XG4vL2ZpZ21hLmNsaWVudFN0b3JhZ2Uuc2V0QXN5bmMoXCJwcm92aWRlclwiLCB1bmRlZmluZWQpLnRoZW4oKTtcbi8vZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYyhcImFjY2Vzcy10b2tlblwiLCB1bmRlZmluZWQpLnRoZW4oKTtcbi8vZmlnbWEucm9vdC5zZXRQbHVnaW5EYXRhKFwiZmlsZS1pZFwiLCBcIlwiKTtcbmxldCBmaWxlID0gZmlnbWEuZmlsZUtleTtcbmlmICghZmlsZSkge1xuICAgIGZpbGUgPSBmaWdtYS5yb290LmdldFBsdWdpbkRhdGEoJ2ZpbGUtaWQnKTtcbn1cbmNvbnN0IHN0b3JhZ2VJbml0ID0gYXN5bmMgKCkgPT4ge1xuICAgIHJldHVybiBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoXCJsYW5ndWFnZVwiKSxcbiAgICAgICAgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYyhcImFjY2Vzcy10b2tlblwiKSxcbiAgICAgICAgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYyhcInByb3ZpZGVyXCIpLFxuICAgIF0pO1xufTtcbnN3aXRjaCAoZmlnbWEuY29tbWFuZCkge1xuICAgIGNhc2UgJ2xvb2t1cCc6IHtcbiAgICAgICAgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IFtsYW5ndWFnZSwgYWNjZXNzVG9rZW4sIHByb3ZpZGVyXSA9IGF3YWl0IHN0b3JhZ2VJbml0KCk7XG4gICAgICAgICAgICBjaGVja1NlbGVjdENhbnZhc1RhZygpO1xuICAgICAgICAgICAgZGlzcGF0Y2goXCJpbml0XCIsIHtcbiAgICAgICAgICAgICAgICBsYW5ndWFnZTogbGFuZ3VhZ2UgPyBsYW5ndWFnZSA6IFwiZW5cIixcbiAgICAgICAgICAgICAgICBhY2Nlc3NUb2tlbjogYWNjZXNzVG9rZW4sXG4gICAgICAgICAgICAgICAgcHJvdmlkZXI6IHByb3ZpZGVyLFxuICAgICAgICAgICAgICAgIHBhZ2U6ICdQYWdlU2VsZWN0JyxcbiAgICAgICAgICAgICAgICBmaWxlSWQ6IGZpbGUsXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBwYWNrYWdlQ3VycmVudFNlbGVjdGlvbigpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgJ25vZGUnOlxuICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IFtsYW5ndWFnZSwgYWNjZXNzVG9rZW4sIHByb3ZpZGVyXSA9IGF3YWl0IHN0b3JhZ2VJbml0KCk7XG4gICAgICAgICAgICBjaGVja1NlbGVjdENhbnZhc1RhZygpO1xuICAgICAgICAgICAgZGlzcGF0Y2goXCJpbml0XCIsIHtcbiAgICAgICAgICAgICAgICBsYW5ndWFnZTogbGFuZ3VhZ2UgPyBsYW5ndWFnZSA6IFwiZW5cIixcbiAgICAgICAgICAgICAgICBhY2Nlc3NUb2tlbjogYWNjZXNzVG9rZW4sXG4gICAgICAgICAgICAgICAgcHJvdmlkZXI6IHByb3ZpZGVyLFxuICAgICAgICAgICAgICAgIHBhZ2U6ICdQYWdlTm9kZScsXG4gICAgICAgICAgICAgICAgZmlsZUlkOiBmaWxlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogcGFja2FnZUN1cnJlbnRTZWxlY3Rpb24oKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbn1cbi8vIEhhbmRsZSBldmVudHMgZnJvbSBVSVxuaGFuZGxlRXZlbnQoJ3Jlc2l6ZScsIChkYXRhKSA9PiB7XG4gICAgaWYgKCF1aVNob3dlZCkge1xuICAgICAgICBmaWdtYS51aS5zaG93KCk7XG4gICAgICAgIHVpU2hvd2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgZmlnbWEudWkucmVzaXplKGRhdGEud2lkdGgsIGRhdGEuaGVpZ2h0KTtcbn0pO1xuaGFuZGxlRXZlbnQoJ2NsaWVudC1zdG9yYWdlLWdldCcsIChkYXRhKSA9PiB7XG4gICAgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYyhkYXRhLmtleSkudGhlbihyID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICAgICAga2V5OiBkYXRhLmtleSxcbiAgICAgICAgICAgIHJlc3VsdDogclxuICAgICAgICB9O1xuICAgICAgICBkaXNwYXRjaCgnY2xpZW50LXN0b3JhZ2UtZ2V0JywgcmVzdWx0KTtcbiAgICB9KTtcbn0pO1xuaGFuZGxlRXZlbnQoJ2NsaWVudC1zdG9yYWdlLXNldCcsIChkYXRhKSA9PiB7XG4gICAgZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYyhkYXRhLmtleSwgZGF0YS5kYXRhKS50aGVuKCgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICAgICAga2V5OiBkYXRhLmtleSxcbiAgICAgICAgICAgIHN1YzogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICBkaXNwYXRjaCgnY2xpZW50LXN0b3JhZ2Utc2V0JywgcmVzdWx0KTtcbiAgICB9KTtcbn0pO1xuaGFuZGxlRXZlbnQoJ2RvY3VtZW50LXBsdWdpbi1kYXRhLWdldCcsIChrZXkpID0+IHtcbiAgICA7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgdmFsdWU6IGZpZ21hLnJvb3QuZ2V0UGx1Z2luRGF0YShrZXkpXG4gICAgfTtcbiAgICBkaXNwYXRjaCgnZG9jdW1lbnQtcGx1Z2luLWRhdGEtZ2V0JywgcmVzdWx0KTtcbn0pO1xuaGFuZGxlRXZlbnQoJ2RvY3VtZW50LXBsdWdpbi1kYXRhLXNldCcsIChkYXRhKSA9PiB7XG4gICAgZmlnbWEucm9vdC5zZXRQbHVnaW5EYXRhKGRhdGEua2V5LCBkYXRhLnZhbHVlKTtcbiAgICBkaXNwYXRjaCgnZG9jdW1lbnQtcGx1Z2luLWRhdGEtc2V0Jywge1xuICAgICAgICBrZXk6IGRhdGEua2V5LFxuICAgICAgICBzdWM6IHRydWVcbiAgICB9KTtcbn0pO1xuaGFuZGxlRXZlbnQoJ25vdGlmeScsIChtc2cpID0+IHtcbiAgICBpZiAodHlwZW9mIG1zZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZmlnbWEubm90aWZ5KG1zZyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmaWdtYS5ub3RpZnkoSlNPTi5zdHJpbmdpZnkobXNnKSk7XG4gICAgfVxufSk7XG5oYW5kbGVFdmVudCgnbm90aWZ5LWVycicsIChtc2cpID0+IHtcbiAgICBpZiAodHlwZW9mIG1zZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZmlnbWEubm90aWZ5KG1zZywgeyBlcnJvcjogdHJ1ZSB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZpZ21hLm5vdGlmeShKU09OLnN0cmluZ2lmeShtc2cpLCB7IGVycm9yOiB0cnVlIH0pO1xuICAgIH1cbn0pO1xuaGFuZGxlRXZlbnQoJ2NhbnZhcy1tYXJrLW5vZGUnLCAoZGF0YSkgPT4ge1xuICAgIG1hcmtOb2RlKG5ldyBNYXAoSlNPTi5wYXJzZShkYXRhLmZ1bGxUYWdzKSksIEpTT04ucGFyc2UoZGF0YS5ub2RlKSk7XG59KTtcbmhhbmRsZUV2ZW50KCdjYW52YXMtdW5tYXJrLW5vZGUnLCAobm9kZUlkKSA9PiB7XG4gICAgdW5tYXJrTm9kZShub2RlSWQpO1xufSk7XG5oYW5kbGVFdmVudCgncmVxdWVzdC1zZWxlY3Rpb24nLCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJyZXF1ZXN0LXNlbGVjdGlvblwiLCBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24pO1xuICAgIGRpc3BhdGNoKFwic2VsZWN0aW9uY2hhbmdlXCIsIHBhY2thZ2VDdXJyZW50U2VsZWN0aW9uKCkpO1xufSk7XG5maWdtYS5vbihcInNlbGVjdGlvbmNoYW5nZVwiLCAoKSA9PiB7XG4gICAgLy8g54K55Ye75qCH562+55qER3JvdXDvvIzoh6rliqjpgInmi6nliLDlr7nlupTnmoTlhoXlrrlcbiAgICBjaGVja1NlbGVjdENhbnZhc1RhZygpO1xuICAgIGRpc3BhdGNoKFwic2VsZWN0aW9uY2hhbmdlXCIsIHBhY2thZ2VDdXJyZW50U2VsZWN0aW9uKCkpO1xufSk7XG5maWdtYS5vbihcImN1cnJlbnRwYWdlY2hhbmdlXCIsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcImN1cnJlbnRwYWdlY2hhbmdlXCIsIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbik7XG4gICAgZGlzcGF0Y2goXCJzZWxlY3Rpb25jaGFuZ2VcIiwgcGFja2FnZUN1cnJlbnRTZWxlY3Rpb24oKSk7XG59KTtcbmZpZ21hLm9uKFwiY2xvc2VcIiwgKCkgPT4ge1xuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xufSk7XG5mdW5jdGlvbiBjaGVja1NlbGVjdENhbnZhc1RhZygpIHtcbiAgICBpZiAoZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uWzBdO1xuICAgICAgICBpZiAoc2VsZWN0LnR5cGUgPT09ICdHUk9VUCcgJiYgc2VsZWN0Lm5hbWUuc3RhcnRzV2l0aChcIlRhZyNcIikpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVJZCA9IHNlbGVjdC5uYW1lLnNsaWNlKDQpO1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IGZpZ21hLmdldE5vZGVCeUlkKG5vZGVJZCk7XG4gICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlID0gZ2V0UGFnZU5vZGUobm9kZSk7XG4gICAgICAgICAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gW25vZGVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gcGFja2FnZUN1cnJlbnRTZWxlY3Rpb24oKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbi5sZW5ndGggPiAwID8gZ2V0UGFnZVJvb3ROb2RlKGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvblswXSkgOiBmaWdtYS5jdXJyZW50UGFnZTtcbiAgICAgICAgY29uc3Qgd2lkdGggPSBpc0VtYmVkTm9kZUxpa2Uobm9kZSkgPyBub2RlLndpZHRoIDogdW5kZWZpbmVkO1xuICAgICAgICBjb25zb2xlLmxvZyhcIndpZHRoXCIsIHdpZHRoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IG5vZGUudHlwZSA9PT0gJ1BBR0UnID8gJ1BBR0UnIDogJ0ZSQU1FJyxcbiAgICAgICAgICAgIGlkOiBub2RlLmlkLFxuICAgICAgICAgICAgbmFtZTogbm9kZS5uYW1lLFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwYWNrYWdlQ3VycmVudFNlbGVjdGlvbicsIGUpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogJ1BBR0UnLFxuICAgICAgICAgICAgaWQ6IGZpZ21hLmN1cnJlbnRQYWdlLmlkLFxuICAgICAgICAgICAgbmFtZTogZmlnbWEuY3VycmVudFBhZ2UubmFtZSxcbiAgICAgICAgICAgIHdpZHRoOiAtMVxuICAgICAgICB9O1xuICAgIH1cbn1cbmZ1bmN0aW9uIGlzUm9vdEZyYW1lKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5wYXJlbnQudHlwZSA9PSBcIlBBR0VcIjtcbn1cbmZ1bmN0aW9uIGdldFBhZ2VSb290Tm9kZShub2RlKSB7XG4gICAgY29uc29sZS5sb2coXCI9PT09PT09PT09PVwiLCBub2RlLnBhcmVudCk7XG4gICAgaWYgKG5vZGUucGFyZW50ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICB3aGlsZSAobm9kZS5wYXJlbnQudHlwZSAhPT0gXCJQQUdFXCIpIHtcbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbn1cbmZ1bmN0aW9uIGdldFBhZ2VOb2RlKG5vZGUpIHtcbiAgICB3aGlsZSAobm9kZS50eXBlICE9PSBcIlBBR0VcIikge1xuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnQ7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xufVxuZnVuY3Rpb24gaXNFbWJlZE5vZGVMaWtlKG5vZGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbiIsImNvbnN0IG9mZnNldCA9IDQ5O1xuY29uc3QgbWFya05vZGUgPSAoZnVsbFRhZ3MsIG5vZGVEYXRhKSA9PiB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IG5vZGUgPSBmaWdtYS5nZXROb2RlQnlJZChub2RlRGF0YS5ub2RlX2lkKTtcbiAgICBpZiAobm9kZSAmJiBpc0VtYmVkTm9kZUxpa2Uobm9kZSkpIHtcbiAgICAgICAgbm9kZS5zZXRSZWxhdW5jaERhdGEoe1xuICAgICAgICAgICAgJ25vZGUnOiBub2RlRGF0YS50aXRsZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSBnZXRQYWdlTm9kZShub2RlKTtcbiAgICAgICAgaWYgKHBhZ2UuaWQgPT09IG5vZGUuaWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHRpbGVOb2RlSWQgPSBwYWdlLmdldFBsdWdpbkRhdGEobm9kZURhdGEubm9kZV9pZCk7XG4gICAgICAgIGlmICh0aWxlTm9kZUlkKSB7XG4gICAgICAgICAgICAoX2EgPSBmaWdtYS5nZXROb2RlQnlJZCh0aWxlTm9kZUlkKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChPYmplY3QudmFsdWVzKG5vZGVEYXRhLnRhZ3MpLmZsYXQoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIOayoeacieS7u+S9leagh+etvlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZpZ21hLmxvYWRGb250QXN5bmMoeyBmYW1pbHk6IFwiSW50ZXJcIiwgc3R5bGU6IFwiU2VtaSBCb2xkXCIgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvL2NvbnN0IHRhZ0ZyYW1lcyA9IFtdO1xuICAgICAgICAgICAgY29uc3Qgcm9vdCA9IGZpZ21hLmNyZWF0ZUZyYW1lKCk7XG4gICAgICAgICAgICByb290LnggPSBub2RlLng7XG4gICAgICAgICAgICByb290LnkgPSBub2RlLnkgLSBvZmZzZXQ7XG4gICAgICAgICAgICBjb25zdCB0YWdzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCB0eXBlIGluIG5vZGVEYXRhLnRhZ3MpIHtcbiAgICAgICAgICAgICAgICBpZiAoZnVsbFRhZ3MuaGFzKHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhZ3MucHVzaCguLi5mdWxsVGFncy5nZXQodHlwZSkudGFncy5maWx0ZXIodCA9PiBub2RlRGF0YS50YWdzW3R5cGVdLmZpbmQodDAgPT4gdC5uYW1lID09PSB0MCkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb290Lm5hbWUgPSB0YWdzLm1hcCh0ID0+IHQubmFtZSkuam9pbigpO1xuICAgICAgICAgICAgcm9vdC5maWxscyA9IFtdO1xuICAgICAgICAgICAgcm9vdC5sYXlvdXRNb2RlID0gJ0hPUklaT05UQUwnO1xuICAgICAgICAgICAgcm9vdC5sYXlvdXRBbGlnbiA9ICdJTkhFUklUJztcbiAgICAgICAgICAgIHJvb3QubGF5b3V0R3JvdyA9IDA7XG4gICAgICAgICAgICByb290LnByaW1hcnlBeGlzQWxpZ25JdGVtcyA9ICdNSU4nO1xuICAgICAgICAgICAgcm9vdC5wcmltYXJ5QXhpc1NpemluZ01vZGUgPSAnQVVUTyc7XG4gICAgICAgICAgICByb290LmNvdW50ZXJBeGlzU2l6aW5nTW9kZSA9ICdBVVRPJztcbiAgICAgICAgICAgIHJvb3QuaXRlbVNwYWNpbmcgPSA4O1xuICAgICAgICAgICAgdGFncy5mb3JFYWNoKHRhZyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZnJhbWUgPSBmaWdtYS5jcmVhdGVGcmFtZSgpO1xuICAgICAgICAgICAgICAgIC8vIGZyYW1lLnggPSBub2RlLng7XG4gICAgICAgICAgICAgICAgLy8gZnJhbWUueSA9IG5vZGUueSAtIDQwO1xuICAgICAgICAgICAgICAgIGZyYW1lLm5hbWUgPSB0YWcubmFtZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0gZmlnbWEuY3JlYXRlVGV4dCgpO1xuICAgICAgICAgICAgICAgIHRleHQuZm9udE5hbWUgPSB7XG4gICAgICAgICAgICAgICAgICAgIGZhbWlseTogXCJJbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogXCJTZW1pIEJvbGRcIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGV4dC5saW5lSGVpZ2h0ID0geyB2YWx1ZTogMjEsIHVuaXQ6ICdQSVhFTFMnIH07XG4gICAgICAgICAgICAgICAgdGV4dC5mb250U2l6ZSA9IDE0O1xuICAgICAgICAgICAgICAgIHRleHQuY2hhcmFjdGVycyA9IHRhZy5uYW1lO1xuICAgICAgICAgICAgICAgIHRleHQuZmlsbHMgPSBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJTT0xJRFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByOiB0YWcuY29sb3IuciAvIDI1NSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnOiB0YWcuY29sb3IuZyAvIDI1NSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiOiB0YWcuY29sb3IuYiAvIDI1NSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiB0YWcuY29sb3IuYVxuICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICAvLyB0ZXh0Lmh5cGVybGluayA9IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgdHlwZTogXCJVUkxcIixcbiAgICAgICAgICAgICAgICAvLyAgICAgdmFsdWU6IG5vZGVEYXRhXG4gICAgICAgICAgICAgICAgLy8gfTtcbiAgICAgICAgICAgICAgICBmcmFtZS5hcHBlbmRDaGlsZCh0ZXh0KTtcbiAgICAgICAgICAgICAgICBmcmFtZS5sYXlvdXRNb2RlID0gXCJIT1JJWk9OVEFMXCI7XG4gICAgICAgICAgICAgICAgZnJhbWUucHJpbWFyeUF4aXNTaXppbmdNb2RlID0gXCJBVVRPXCI7XG4gICAgICAgICAgICAgICAgZnJhbWUuY291bnRlckF4aXNTaXppbmdNb2RlID0gXCJBVVRPXCI7XG4gICAgICAgICAgICAgICAgZnJhbWUucGFkZGluZ1RvcCA9IDQ7XG4gICAgICAgICAgICAgICAgZnJhbWUucGFkZGluZ0JvdHRvbSA9IDQ7XG4gICAgICAgICAgICAgICAgZnJhbWUucGFkZGluZ0xlZnQgPSAxNjtcbiAgICAgICAgICAgICAgICBmcmFtZS5wYWRkaW5nUmlnaHQgPSAxNjtcbiAgICAgICAgICAgICAgICBmcmFtZS5jb3JuZXJSYWRpdXMgPSA0O1xuICAgICAgICAgICAgICAgIGZyYW1lLmZpbGxzID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiU09MSURcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcjogdGFnLmJhY2tncm91bmQuciAvIDI1NSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnOiB0YWcuYmFja2dyb3VuZC5nIC8gMjU1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGI6IHRhZy5iYWNrZ3JvdW5kLmIgLyAyNTUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgIGZyYW1lLnN0cm9rZXMgPSBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJTT0xJRFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHsgcjogMCwgZzogMCwgYjogMCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMC4wNVxuICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICByb290LmFwcGVuZENoaWxkKGZyYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBmaWdtYS5ncm91cChbcm9vdF0sIHBhZ2UpO1xuICAgICAgICAgICAgZ3JvdXAubmFtZSA9IFwiVGFnI1wiICsgbm9kZURhdGEubm9kZV9pZDtcbiAgICAgICAgICAgIHBhZ2UuYXBwZW5kQ2hpbGQoZ3JvdXApO1xuICAgICAgICAgICAgcGFnZS5zZXRQbHVnaW5EYXRhKG5vZGVEYXRhLm5vZGVfaWQsIGdyb3VwLmlkKTtcbiAgICAgICAgfSkuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBmaWdtYS5ub3RpZnkoXCJGb250IGZhbWlseSBub3QgZm91bmQhXCIsIHsgZXJyb3I6IHRydWUgfSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbmNvbnN0IHVubWFya05vZGUgPSAobm9kZUlkKSA9PiB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IG5vZGUgPSBmaWdtYS5nZXROb2RlQnlJZChub2RlSWQpO1xuICAgIGlmIChub2RlICYmIGlzRW1iZWROb2RlTGlrZShub2RlKSkge1xuICAgICAgICBub2RlLnNldFJlbGF1bmNoRGF0YSh7fSk7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSBnZXRQYWdlTm9kZShub2RlKTtcbiAgICAgICAgY29uc3QgdGlsZU5vZGVJZCA9IHBhZ2UuZ2V0UGx1Z2luRGF0YShub2RlSWQpO1xuICAgICAgICBpZiAodGlsZU5vZGVJZCkge1xuICAgICAgICAgICAgKF9hID0gZmlnbWEuZ2V0Tm9kZUJ5SWQodGlsZU5vZGVJZCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5mdW5jdGlvbiBpc0VtYmVkTm9kZUxpa2Uobm9kZSkge1xuICAgIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gZ2V0UGFnZU5vZGUobm9kZSkge1xuICAgIHdoaWxlIChub2RlLnR5cGUgIT09IFwiUEFHRVwiKSB7XG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG59XG5jb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICBmb3IgKGxldCBlbCBvZiBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24pIHtcbiAgICAgICAgY29uc3QgdGlsZU5vZGVJZCA9IGZpZ21hLmN1cnJlbnRQYWdlLmdldFBsdWdpbkRhdGEoZWwuaWQpO1xuICAgICAgICBpZiAodGlsZU5vZGVJZCkge1xuICAgICAgICAgICAgY29uc3QgdGlsZU5vZGUgPSBmaWdtYS5nZXROb2RlQnlJZCh0aWxlTm9kZUlkKTtcbiAgICAgICAgICAgIGlmICh0aWxlTm9kZSAmJiAodGlsZU5vZGUudHlwZSA9PT0gJ0dST1VQJyB8fCB0aWxlTm9kZS50eXBlID09PSAnRlJBTUUnKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aWxlTm9kZS54ICE9IGVsLnggfHwgdGlsZU5vZGUueSAhPSBlbC55IC0gb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRpbGVOb2RlLnggPSBlbC54O1xuICAgICAgICAgICAgICAgICAgICB0aWxlTm9kZS55ID0gZWwueSAtIG9mZnNldDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59LCA1MCk7XG5jb25zb2xlLmxvZyhcImNvZGVDYW52YXNUYWcgaW5pdCFcIik7XG5leHBvcnQgeyBpbnRlcnZhbCwgbWFya05vZGUsIHVubWFya05vZGUgfTtcbiIsImNvbnN0IGV2ZW50TGlzdGVuZXJzID0gW107XG5leHBvcnQgY29uc3QgZGlzcGF0Y2ggPSAoYWN0aW9uLCBkYXRhKSA9PiB7XG4gICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyBhY3Rpb24sIGRhdGEgfSk7XG59O1xuZXhwb3J0IGNvbnN0IGhhbmRsZUV2ZW50ID0gKHR5cGUsIGNhbGxiYWNrKSA9PiB7XG4gICAgZXZlbnRMaXN0ZW5lcnMucHVzaCh7IHR5cGUsIGNhbGxiYWNrIH0pO1xufTtcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IG1lc3NhZ2UgPT4ge1xuICAgIGZvciAobGV0IGV2ZW50TGlzdGVuZXIgb2YgZXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSBldmVudExpc3RlbmVyLnR5cGUpXG4gICAgICAgICAgICBldmVudExpc3RlbmVyLmNhbGxiYWNrKG1lc3NhZ2UuZGF0YSk7XG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=