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
let file = figma.fileKey;
if (!file) {
    file = figma.root.getPluginData('file-id');
}
switch (figma.command) {
    case 'lookup': {
        Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])("init", {
            page: 'PageSelect',
            fileId: file,
            selection: packageCurrentSelection()
        });
        break;
    }
    case 'node':
    default: {
        Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])("init", {
            page: 'PageNode',
            fileId: file,
            selection: packageCurrentSelection()
        });
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
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])("selectionchange", packageCurrentSelection());
});
figma.on("close", () => {
    clearInterval(_codeCanvasTag__WEBPACK_IMPORTED_MODULE_1__["interval"]);
});
function packageCurrentSelection() {
    const node = figma.currentPage.selection.length > 0 ? getPageRootNode(figma.currentPage.selection[0]) : figma.currentPage;
    return {
        type: node.type === 'PAGE' ? 'PAGE' : 'FRAME',
        id: node.id,
        name: node.name
    };
}
function isRootFrame(node) {
    return node.parent.type == "PAGE";
}
function getPageRootNode(node) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGVDYW52YXNUYWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGVNZXNzYWdlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUE2RDtBQUNJO0FBQ2pFLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxvRUFBUTtBQUNoQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG9FQUFRO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVFQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCx1RUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG9FQUFRO0FBQ2hCLEtBQUs7QUFDTCxDQUFDO0FBQ0QsdUVBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxvRUFBUTtBQUNoQixLQUFLO0FBQ0wsQ0FBQztBQUNELHVFQUFXO0FBQ1g7QUFDQSxDQUFDO0FBQ0QsdUVBQVc7QUFDWCxJQUFJLCtEQUFRO0FBQ1osQ0FBQztBQUNELHVFQUFXO0FBQ1gsSUFBSSxpRUFBVTtBQUNkLENBQUM7QUFDRDtBQUNBLElBQUksb0VBQVE7QUFDWixDQUFDO0FBQ0Q7QUFDQSxJQUFJLG9FQUFRO0FBQ1osQ0FBQztBQUNEO0FBQ0Esa0JBQWtCLHVEQUFRO0FBQzFCLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLG1DQUFtQztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsZ0NBQWdDLG1CQUFtQjtBQUNuRDtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxvREFBb0QsY0FBYztBQUNsRTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQzBDOzs7Ozs7Ozs7Ozs7O0FDaEkxQztBQUFBO0FBQUE7QUFBQTtBQUNPO0FBQ1AsMEJBQTBCLGVBQWU7QUFDekM7QUFDTztBQUNQLHlCQUF5QixpQkFBaUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2NvZGUudHNcIik7XG4iLCJpbXBvcnQgeyBkaXNwYXRjaCwgaGFuZGxlRXZlbnQgfSBmcm9tICcuL2NvZGVNZXNzYWdlSGFuZGxlcic7XG5pbXBvcnQgeyBpbnRlcnZhbCwgbWFya05vZGUsIHVubWFya05vZGUgfSBmcm9tIFwiLi9jb2RlQ2FudmFzVGFnXCI7XG5maWdtYS5zaG93VUkoX19odG1sX18sIHsgdmlzaWJsZTogZmFsc2UgfSk7XG5sZXQgdWlTaG93ZWQgPSBmYWxzZTtcbi8vZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYyhcInRhZ3NcIiwgdW5kZWZpbmVkKS50aGVuKCk7XG4vL2ZpZ21hLmNsaWVudFN0b3JhZ2Uuc2V0QXN5bmMoXCJub2Rlc1wiLCB1bmRlZmluZWQpLnRoZW4oKTtcbmxldCBmaWxlID0gZmlnbWEuZmlsZUtleTtcbmlmICghZmlsZSkge1xuICAgIGZpbGUgPSBmaWdtYS5yb290LmdldFBsdWdpbkRhdGEoJ2ZpbGUtaWQnKTtcbn1cbnN3aXRjaCAoZmlnbWEuY29tbWFuZCkge1xuICAgIGNhc2UgJ2xvb2t1cCc6IHtcbiAgICAgICAgZGlzcGF0Y2goXCJpbml0XCIsIHtcbiAgICAgICAgICAgIHBhZ2U6ICdQYWdlU2VsZWN0JyxcbiAgICAgICAgICAgIGZpbGVJZDogZmlsZSxcbiAgICAgICAgICAgIHNlbGVjdGlvbjogcGFja2FnZUN1cnJlbnRTZWxlY3Rpb24oKVxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgJ25vZGUnOlxuICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgZGlzcGF0Y2goXCJpbml0XCIsIHtcbiAgICAgICAgICAgIHBhZ2U6ICdQYWdlTm9kZScsXG4gICAgICAgICAgICBmaWxlSWQ6IGZpbGUsXG4gICAgICAgICAgICBzZWxlY3Rpb246IHBhY2thZ2VDdXJyZW50U2VsZWN0aW9uKClcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbn1cbi8vIEhhbmRsZSBldmVudHMgZnJvbSBVSVxuaGFuZGxlRXZlbnQoJ3Jlc2l6ZScsIChkYXRhKSA9PiB7XG4gICAgaWYgKCF1aVNob3dlZCkge1xuICAgICAgICBmaWdtYS51aS5zaG93KCk7XG4gICAgICAgIHVpU2hvd2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgZmlnbWEudWkucmVzaXplKGRhdGEud2lkdGgsIGRhdGEuaGVpZ2h0KTtcbn0pO1xuaGFuZGxlRXZlbnQoJ2NsaWVudC1zdG9yYWdlLWdldCcsIChkYXRhKSA9PiB7XG4gICAgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYyhkYXRhLmtleSkudGhlbihyID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICAgICAga2V5OiBkYXRhLmtleSxcbiAgICAgICAgICAgIHJlc3VsdDogclxuICAgICAgICB9O1xuICAgICAgICBkaXNwYXRjaCgnY2xpZW50LXN0b3JhZ2UtZ2V0JywgcmVzdWx0KTtcbiAgICB9KTtcbn0pO1xuaGFuZGxlRXZlbnQoJ2NsaWVudC1zdG9yYWdlLXNldCcsIChkYXRhKSA9PiB7XG4gICAgZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYyhkYXRhLmtleSwgZGF0YS5kYXRhKS50aGVuKCgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICAgICAga2V5OiBkYXRhLmtleSxcbiAgICAgICAgICAgIHN1YzogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICBkaXNwYXRjaCgnY2xpZW50LXN0b3JhZ2Utc2V0JywgcmVzdWx0KTtcbiAgICB9KTtcbn0pO1xuaGFuZGxlRXZlbnQoJ2RvY3VtZW50LXBsdWdpbi1kYXRhLXNldCcsIChkYXRhKSA9PiB7XG4gICAgZmlnbWEucm9vdC5zZXRQbHVnaW5EYXRhKGRhdGEua2V5LCBkYXRhLnZhbHVlKTtcbn0pO1xuaGFuZGxlRXZlbnQoJ2NhbnZhcy1tYXJrLW5vZGUnLCAoZGF0YSkgPT4ge1xuICAgIG1hcmtOb2RlKG5ldyBNYXAoSlNPTi5wYXJzZShkYXRhLmZ1bGxUYWdzKSksIEpTT04ucGFyc2UoZGF0YS5ub2RlKSk7XG59KTtcbmhhbmRsZUV2ZW50KCdjYW52YXMtdW5tYXJrLW5vZGUnLCAobm9kZUlkKSA9PiB7XG4gICAgdW5tYXJrTm9kZShub2RlSWQpO1xufSk7XG5maWdtYS5vbihcInNlbGVjdGlvbmNoYW5nZVwiLCAoKSA9PiB7XG4gICAgZGlzcGF0Y2goXCJzZWxlY3Rpb25jaGFuZ2VcIiwgcGFja2FnZUN1cnJlbnRTZWxlY3Rpb24oKSk7XG59KTtcbmZpZ21hLm9uKFwiY3VycmVudHBhZ2VjaGFuZ2VcIiwgKCkgPT4ge1xuICAgIGRpc3BhdGNoKFwic2VsZWN0aW9uY2hhbmdlXCIsIHBhY2thZ2VDdXJyZW50U2VsZWN0aW9uKCkpO1xufSk7XG5maWdtYS5vbihcImNsb3NlXCIsICgpID0+IHtcbiAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbn0pO1xuZnVuY3Rpb24gcGFja2FnZUN1cnJlbnRTZWxlY3Rpb24oKSB7XG4gICAgY29uc3Qgbm9kZSA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbi5sZW5ndGggPiAwID8gZ2V0UGFnZVJvb3ROb2RlKGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvblswXSkgOiBmaWdtYS5jdXJyZW50UGFnZTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBub2RlLnR5cGUgPT09ICdQQUdFJyA/ICdQQUdFJyA6ICdGUkFNRScsXG4gICAgICAgIGlkOiBub2RlLmlkLFxuICAgICAgICBuYW1lOiBub2RlLm5hbWVcbiAgICB9O1xufVxuZnVuY3Rpb24gaXNSb290RnJhbWUobm9kZSkge1xuICAgIHJldHVybiBub2RlLnBhcmVudC50eXBlID09IFwiUEFHRVwiO1xufVxuZnVuY3Rpb24gZ2V0UGFnZVJvb3ROb2RlKG5vZGUpIHtcbiAgICB3aGlsZSAobm9kZS5wYXJlbnQudHlwZSAhPT0gXCJQQUdFXCIpIHtcbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbn1cbmZ1bmN0aW9uIGdldFBhZ2VOb2RlKG5vZGUpIHtcbiAgICB3aGlsZSAobm9kZS50eXBlICE9PSBcIlBBR0VcIikge1xuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnQ7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xufVxuZnVuY3Rpb24gaXNFbWJlZE5vZGVMaWtlKG5vZGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbiIsImNvbnN0IG1hcmtOb2RlID0gKGZ1bGxUYWdzLCBub2RlRGF0YSkgPT4ge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBub2RlID0gZmlnbWEuZ2V0Tm9kZUJ5SWQobm9kZURhdGEubm9kZV9pZCk7XG4gICAgaWYgKG5vZGUgJiYgaXNFbWJlZE5vZGVMaWtlKG5vZGUpKSB7XG4gICAgICAgIG5vZGUuc2V0UmVsYXVuY2hEYXRhKHtcbiAgICAgICAgICAgICdub2RlJzogbm9kZURhdGEudGl0bGUsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBwYWdlID0gZ2V0UGFnZU5vZGUobm9kZSk7XG4gICAgICAgIGlmIChwYWdlLmlkID09PSBub2RlLmlkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCB0aWxlTm9kZUlkID0gcGFnZS5nZXRQbHVnaW5EYXRhKG5vZGVEYXRhLm5vZGVfaWQpO1xuICAgICAgICBpZiAodGlsZU5vZGVJZCkge1xuICAgICAgICAgICAgKF9hID0gZmlnbWEuZ2V0Tm9kZUJ5SWQodGlsZU5vZGVJZCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBmaWdtYS5sb2FkRm9udEFzeW5jKHsgZmFtaWx5OiBcIkludGVyXCIsIHN0eWxlOiBcIk1lZGl1bVwiIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy9jb25zdCB0YWdGcmFtZXMgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHJvb3QgPSBmaWdtYS5jcmVhdGVGcmFtZSgpO1xuICAgICAgICAgICAgcm9vdC54ID0gbm9kZS54O1xuICAgICAgICAgICAgcm9vdC55ID0gbm9kZS55IC0gMzg7XG4gICAgICAgICAgICBjb25zdCB0YWdzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCB0eXBlIGluIG5vZGVEYXRhLnRhZ3MpIHtcbiAgICAgICAgICAgICAgICBpZiAoZnVsbFRhZ3MuaGFzKHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhZ3MucHVzaCguLi5mdWxsVGFncy5nZXQodHlwZSkudGFncy5maWx0ZXIodCA9PiBub2RlRGF0YS50YWdzW3R5cGVdLmZpbmQodDAgPT4gdC5uYW1lID09PSB0MCkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb290Lm5hbWUgPSB0YWdzLm1hcCh0ID0+IHQubmFtZSkuam9pbigpO1xuICAgICAgICAgICAgcm9vdC5maWxscyA9IFtdO1xuICAgICAgICAgICAgcm9vdC5sYXlvdXRNb2RlID0gJ0hPUklaT05UQUwnO1xuICAgICAgICAgICAgcm9vdC5sYXlvdXRBbGlnbiA9ICdJTkhFUklUJztcbiAgICAgICAgICAgIHJvb3QubGF5b3V0R3JvdyA9IDA7XG4gICAgICAgICAgICByb290LnByaW1hcnlBeGlzQWxpZ25JdGVtcyA9ICdNSU4nO1xuICAgICAgICAgICAgcm9vdC5wcmltYXJ5QXhpc1NpemluZ01vZGUgPSAnQVVUTyc7XG4gICAgICAgICAgICByb290LmNvdW50ZXJBeGlzU2l6aW5nTW9kZSA9ICdBVVRPJztcbiAgICAgICAgICAgIHJvb3QuaXRlbVNwYWNpbmcgPSA4O1xuICAgICAgICAgICAgdGFncy5mb3JFYWNoKHRhZyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZnJhbWUgPSBmaWdtYS5jcmVhdGVGcmFtZSgpO1xuICAgICAgICAgICAgICAgIC8vIGZyYW1lLnggPSBub2RlLng7XG4gICAgICAgICAgICAgICAgLy8gZnJhbWUueSA9IG5vZGUueSAtIDQwO1xuICAgICAgICAgICAgICAgIGZyYW1lLm5hbWUgPSB0YWcubmFtZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0gZmlnbWEuY3JlYXRlVGV4dCgpO1xuICAgICAgICAgICAgICAgIHRleHQuZm9udE5hbWUgPSB7XG4gICAgICAgICAgICAgICAgICAgIGZhbWlseTogXCJJbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogXCJNZWRpdW1cIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGV4dC5saW5lSGVpZ2h0ID0geyB2YWx1ZTogMTQsIHVuaXQ6ICdQSVhFTFMnIH07XG4gICAgICAgICAgICAgICAgdGV4dC5mb250U2l6ZSA9IDEyO1xuICAgICAgICAgICAgICAgIHRleHQuY2hhcmFjdGVycyA9IHRhZy5uYW1lO1xuICAgICAgICAgICAgICAgIHRleHQuZmlsbHMgPSBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJTT0xJRFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByOiB0YWcuY29sb3IuciAvIDI1NSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnOiB0YWcuY29sb3IuZyAvIDI1NSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiOiB0YWcuY29sb3IuYiAvIDI1NSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiB0YWcuY29sb3IuYVxuICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICAvLyB0ZXh0Lmh5cGVybGluayA9IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgdHlwZTogXCJVUkxcIixcbiAgICAgICAgICAgICAgICAvLyAgICAgdmFsdWU6IG5vZGVEYXRhXG4gICAgICAgICAgICAgICAgLy8gfTtcbiAgICAgICAgICAgICAgICBmcmFtZS5hcHBlbmRDaGlsZCh0ZXh0KTtcbiAgICAgICAgICAgICAgICBmcmFtZS5sYXlvdXRNb2RlID0gXCJIT1JJWk9OVEFMXCI7XG4gICAgICAgICAgICAgICAgZnJhbWUucHJpbWFyeUF4aXNTaXppbmdNb2RlID0gXCJBVVRPXCI7XG4gICAgICAgICAgICAgICAgZnJhbWUuY291bnRlckF4aXNTaXppbmdNb2RlID0gXCJBVVRPXCI7XG4gICAgICAgICAgICAgICAgZnJhbWUucGFkZGluZ1RvcCA9IDQ7XG4gICAgICAgICAgICAgICAgZnJhbWUucGFkZGluZ0JvdHRvbSA9IDQ7XG4gICAgICAgICAgICAgICAgZnJhbWUucGFkZGluZ0xlZnQgPSA4O1xuICAgICAgICAgICAgICAgIGZyYW1lLnBhZGRpbmdSaWdodCA9IDg7XG4gICAgICAgICAgICAgICAgZnJhbWUuY29ybmVyUmFkaXVzID0gNDtcbiAgICAgICAgICAgICAgICBmcmFtZS5maWxscyA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlNPTElEXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHI6IHRhZy5iYWNrZ3JvdW5kLnIgLyAyNTUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZzogdGFnLmJhY2tncm91bmQuZyAvIDI1NSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiOiB0YWcuYmFja2dyb3VuZC5iIC8gMjU1LFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICBmcmFtZS5zdHJva2VzID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiU09MSURcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB7IHI6IDAsIGc6IDAsIGI6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuMDVcbiAgICAgICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgcm9vdC5hcHBlbmRDaGlsZChmcmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZmlnbWEuZ3JvdXAoW3Jvb3RdLCBwYWdlKTtcbiAgICAgICAgICAgIGdyb3VwLm5hbWUgPSByb290Lm5hbWU7XG4gICAgICAgICAgICBwYWdlLmFwcGVuZENoaWxkKGdyb3VwKTtcbiAgICAgICAgICAgIHBhZ2Uuc2V0UGx1Z2luRGF0YShub2RlRGF0YS5ub2RlX2lkLCBncm91cC5pZCk7XG4gICAgICAgIH0pLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgZmlnbWEubm90aWZ5KFwiRm9udCBmYW1pbHkgbm90IGZvdW5kIVwiLCB7IGVycm9yOiB0cnVlIH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5jb25zdCB1bm1hcmtOb2RlID0gKG5vZGVJZCkgPT4ge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBub2RlID0gZmlnbWEuZ2V0Tm9kZUJ5SWQobm9kZUlkKTtcbiAgICBpZiAobm9kZSAmJiBpc0VtYmVkTm9kZUxpa2Uobm9kZSkpIHtcbiAgICAgICAgbm9kZS5zZXRSZWxhdW5jaERhdGEoe30pO1xuICAgICAgICBjb25zdCBwYWdlID0gZ2V0UGFnZU5vZGUobm9kZSk7XG4gICAgICAgIGNvbnN0IHRpbGVOb2RlSWQgPSBwYWdlLmdldFBsdWdpbkRhdGEobm9kZUlkKTtcbiAgICAgICAgaWYgKHRpbGVOb2RlSWQpIHtcbiAgICAgICAgICAgIChfYSA9IGZpZ21hLmdldE5vZGVCeUlkKHRpbGVOb2RlSWQpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuZnVuY3Rpb24gaXNFbWJlZE5vZGVMaWtlKG5vZGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGdldFBhZ2VOb2RlKG5vZGUpIHtcbiAgICB3aGlsZSAobm9kZS50eXBlICE9PSBcIlBBR0VcIikge1xuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnQ7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xufVxuY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgZm9yIChsZXQgZWwgb2YgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IHRpbGVOb2RlSWQgPSBmaWdtYS5jdXJyZW50UGFnZS5nZXRQbHVnaW5EYXRhKGVsLmlkKTtcbiAgICAgICAgaWYgKHRpbGVOb2RlSWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHRpbGVOb2RlID0gZmlnbWEuZ2V0Tm9kZUJ5SWQodGlsZU5vZGVJZCk7XG4gICAgICAgICAgICBpZiAodGlsZU5vZGUgJiYgKHRpbGVOb2RlLnR5cGUgPT09ICdHUk9VUCcgfHwgdGlsZU5vZGUudHlwZSA9PT0gJ0ZSQU1FJykpIHtcbiAgICAgICAgICAgICAgICB0aWxlTm9kZS54ID0gZWwueDtcbiAgICAgICAgICAgICAgICB0aWxlTm9kZS55ID0gZWwueSAtIDM4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSwgNTApO1xuY29uc29sZS5sb2coXCJjb2RlQ2FudmFzVGFnIGluaXQhXCIpO1xuZXhwb3J0IHsgaW50ZXJ2YWwsIG1hcmtOb2RlLCB1bm1hcmtOb2RlIH07XG4iLCJjb25zdCBldmVudExpc3RlbmVycyA9IFtdO1xuZXhwb3J0IGNvbnN0IGRpc3BhdGNoID0gKGFjdGlvbiwgZGF0YSkgPT4ge1xuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgYWN0aW9uLCBkYXRhIH0pO1xufTtcbmV4cG9ydCBjb25zdCBoYW5kbGVFdmVudCA9ICh0eXBlLCBjYWxsYmFjaykgPT4ge1xuICAgIGV2ZW50TGlzdGVuZXJzLnB1c2goeyB0eXBlLCBjYWxsYmFjayB9KTtcbn07XG5maWdtYS51aS5vbm1lc3NhZ2UgPSBtZXNzYWdlID0+IHtcbiAgICBmb3IgKGxldCBldmVudExpc3RlbmVyIG9mIGV2ZW50TGlzdGVuZXJzKSB7XG4gICAgICAgIGlmIChtZXNzYWdlLmFjdGlvbiA9PT0gZXZlbnRMaXN0ZW5lci50eXBlKVxuICAgICAgICAgICAgZXZlbnRMaXN0ZW5lci5jYWxsYmFjayhtZXNzYWdlLmRhdGEpO1xuICAgIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9