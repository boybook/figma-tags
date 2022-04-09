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
    console.log("currentpagechange", figma.currentPage.selection);
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])("selectionchange", packageCurrentSelection());
});
figma.on("close", () => {
    clearInterval(_codeCanvasTag__WEBPACK_IMPORTED_MODULE_1__["interval"]);
});
function packageCurrentSelection() {
    try {
        const node = figma.currentPage.selection.length > 0 ? getPageRootNode(figma.currentPage.selection[0]) : figma.currentPage;
        return {
            type: node.type === 'PAGE' ? 'PAGE' : 'FRAME',
            id: node.id,
            name: node.name
        };
    }
    catch (e) {
        console.log('packageCurrentSelection', e);
        return {
            type: 'PAGE',
            id: figma.currentPage.id,
            name: figma.currentPage.name
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGVDYW52YXNUYWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGVNZXNzYWdlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUE2RDtBQUNJO0FBQ2pFLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxvRUFBUTtBQUNoQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG9FQUFRO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVFQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCx1RUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG9FQUFRO0FBQ2hCLEtBQUs7QUFDTCxDQUFDO0FBQ0QsdUVBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxvRUFBUTtBQUNoQixLQUFLO0FBQ0wsQ0FBQztBQUNELHVFQUFXO0FBQ1g7QUFDQSxDQUFDO0FBQ0QsdUVBQVc7QUFDWCxJQUFJLCtEQUFRO0FBQ1osQ0FBQztBQUNELHVFQUFXO0FBQ1gsSUFBSSxpRUFBVTtBQUNkLENBQUM7QUFDRDtBQUNBLElBQUksb0VBQVE7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBLElBQUksb0VBQVE7QUFDWixDQUFDO0FBQ0Q7QUFDQSxrQkFBa0IsdURBQVE7QUFDMUIsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDakhBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLG1DQUFtQztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsZ0NBQWdDLG1CQUFtQjtBQUNuRDtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxvREFBb0QsY0FBYztBQUNsRTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQzBDOzs7Ozs7Ozs7Ozs7O0FDaEkxQztBQUFBO0FBQUE7QUFBQTtBQUNPO0FBQ1AsMEJBQTBCLGVBQWU7QUFDekM7QUFDTztBQUNQLHlCQUF5QixpQkFBaUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2NvZGUudHNcIik7XG4iLCJpbXBvcnQgeyBkaXNwYXRjaCwgaGFuZGxlRXZlbnQgfSBmcm9tICcuL2NvZGVNZXNzYWdlSGFuZGxlcic7XG5pbXBvcnQgeyBpbnRlcnZhbCwgbWFya05vZGUsIHVubWFya05vZGUgfSBmcm9tIFwiLi9jb2RlQ2FudmFzVGFnXCI7XG5maWdtYS5zaG93VUkoX19odG1sX18sIHsgdmlzaWJsZTogZmFsc2UgfSk7XG5sZXQgdWlTaG93ZWQgPSBmYWxzZTtcbi8vZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYyhcInRhZ3NcIiwgdW5kZWZpbmVkKS50aGVuKCk7XG4vL2ZpZ21hLmNsaWVudFN0b3JhZ2Uuc2V0QXN5bmMoXCJub2Rlc1wiLCB1bmRlZmluZWQpLnRoZW4oKTtcbmxldCBmaWxlID0gZmlnbWEuZmlsZUtleTtcbmlmICghZmlsZSkge1xuICAgIGZpbGUgPSBmaWdtYS5yb290LmdldFBsdWdpbkRhdGEoJ2ZpbGUtaWQnKTtcbn1cbnN3aXRjaCAoZmlnbWEuY29tbWFuZCkge1xuICAgIGNhc2UgJ2xvb2t1cCc6IHtcbiAgICAgICAgZGlzcGF0Y2goXCJpbml0XCIsIHtcbiAgICAgICAgICAgIHBhZ2U6ICdQYWdlU2VsZWN0JyxcbiAgICAgICAgICAgIGZpbGVJZDogZmlsZSxcbiAgICAgICAgICAgIHNlbGVjdGlvbjogcGFja2FnZUN1cnJlbnRTZWxlY3Rpb24oKVxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgJ25vZGUnOlxuICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgZGlzcGF0Y2goXCJpbml0XCIsIHtcbiAgICAgICAgICAgIHBhZ2U6ICdQYWdlTm9kZScsXG4gICAgICAgICAgICBmaWxlSWQ6IGZpbGUsXG4gICAgICAgICAgICBzZWxlY3Rpb246IHBhY2thZ2VDdXJyZW50U2VsZWN0aW9uKClcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbn1cbi8vIEhhbmRsZSBldmVudHMgZnJvbSBVSVxuaGFuZGxlRXZlbnQoJ3Jlc2l6ZScsIChkYXRhKSA9PiB7XG4gICAgaWYgKCF1aVNob3dlZCkge1xuICAgICAgICBmaWdtYS51aS5zaG93KCk7XG4gICAgICAgIHVpU2hvd2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgZmlnbWEudWkucmVzaXplKGRhdGEud2lkdGgsIGRhdGEuaGVpZ2h0KTtcbn0pO1xuaGFuZGxlRXZlbnQoJ2NsaWVudC1zdG9yYWdlLWdldCcsIChkYXRhKSA9PiB7XG4gICAgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYyhkYXRhLmtleSkudGhlbihyID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICAgICAga2V5OiBkYXRhLmtleSxcbiAgICAgICAgICAgIHJlc3VsdDogclxuICAgICAgICB9O1xuICAgICAgICBkaXNwYXRjaCgnY2xpZW50LXN0b3JhZ2UtZ2V0JywgcmVzdWx0KTtcbiAgICB9KTtcbn0pO1xuaGFuZGxlRXZlbnQoJ2NsaWVudC1zdG9yYWdlLXNldCcsIChkYXRhKSA9PiB7XG4gICAgZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYyhkYXRhLmtleSwgZGF0YS5kYXRhKS50aGVuKCgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICAgICAga2V5OiBkYXRhLmtleSxcbiAgICAgICAgICAgIHN1YzogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICBkaXNwYXRjaCgnY2xpZW50LXN0b3JhZ2Utc2V0JywgcmVzdWx0KTtcbiAgICB9KTtcbn0pO1xuaGFuZGxlRXZlbnQoJ2RvY3VtZW50LXBsdWdpbi1kYXRhLXNldCcsIChkYXRhKSA9PiB7XG4gICAgZmlnbWEucm9vdC5zZXRQbHVnaW5EYXRhKGRhdGEua2V5LCBkYXRhLnZhbHVlKTtcbn0pO1xuaGFuZGxlRXZlbnQoJ2NhbnZhcy1tYXJrLW5vZGUnLCAoZGF0YSkgPT4ge1xuICAgIG1hcmtOb2RlKG5ldyBNYXAoSlNPTi5wYXJzZShkYXRhLmZ1bGxUYWdzKSksIEpTT04ucGFyc2UoZGF0YS5ub2RlKSk7XG59KTtcbmhhbmRsZUV2ZW50KCdjYW52YXMtdW5tYXJrLW5vZGUnLCAobm9kZUlkKSA9PiB7XG4gICAgdW5tYXJrTm9kZShub2RlSWQpO1xufSk7XG5maWdtYS5vbihcInNlbGVjdGlvbmNoYW5nZVwiLCAoKSA9PiB7XG4gICAgZGlzcGF0Y2goXCJzZWxlY3Rpb25jaGFuZ2VcIiwgcGFja2FnZUN1cnJlbnRTZWxlY3Rpb24oKSk7XG59KTtcbmZpZ21hLm9uKFwiY3VycmVudHBhZ2VjaGFuZ2VcIiwgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiY3VycmVudHBhZ2VjaGFuZ2VcIiwgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uKTtcbiAgICBkaXNwYXRjaChcInNlbGVjdGlvbmNoYW5nZVwiLCBwYWNrYWdlQ3VycmVudFNlbGVjdGlvbigpKTtcbn0pO1xuZmlnbWEub24oXCJjbG9zZVwiLCAoKSA9PiB7XG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG59KTtcbmZ1bmN0aW9uIHBhY2thZ2VDdXJyZW50U2VsZWN0aW9uKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24ubGVuZ3RoID4gMCA/IGdldFBhZ2VSb290Tm9kZShmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF0pIDogZmlnbWEuY3VycmVudFBhZ2U7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBub2RlLnR5cGUgPT09ICdQQUdFJyA/ICdQQUdFJyA6ICdGUkFNRScsXG4gICAgICAgICAgICBpZDogbm9kZS5pZCxcbiAgICAgICAgICAgIG5hbWU6IG5vZGUubmFtZVxuICAgICAgICB9O1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZygncGFja2FnZUN1cnJlbnRTZWxlY3Rpb24nLCBlKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6ICdQQUdFJyxcbiAgICAgICAgICAgIGlkOiBmaWdtYS5jdXJyZW50UGFnZS5pZCxcbiAgICAgICAgICAgIG5hbWU6IGZpZ21hLmN1cnJlbnRQYWdlLm5hbWVcbiAgICAgICAgfTtcbiAgICB9XG59XG5mdW5jdGlvbiBpc1Jvb3RGcmFtZShub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUucGFyZW50LnR5cGUgPT0gXCJQQUdFXCI7XG59XG5mdW5jdGlvbiBnZXRQYWdlUm9vdE5vZGUobm9kZSkge1xuICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT1cIiwgbm9kZS5wYXJlbnQpO1xuICAgIGlmIChub2RlLnBhcmVudCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgd2hpbGUgKG5vZGUucGFyZW50LnR5cGUgIT09IFwiUEFHRVwiKSB7XG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG59XG5mdW5jdGlvbiBnZXRQYWdlTm9kZShub2RlKSB7XG4gICAgd2hpbGUgKG5vZGUudHlwZSAhPT0gXCJQQUdFXCIpIHtcbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbn1cbmZ1bmN0aW9uIGlzRW1iZWROb2RlTGlrZShub2RlKSB7XG4gICAgcmV0dXJuIHRydWU7XG59XG4iLCJjb25zdCBtYXJrTm9kZSA9IChmdWxsVGFncywgbm9kZURhdGEpID0+IHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3Qgbm9kZSA9IGZpZ21hLmdldE5vZGVCeUlkKG5vZGVEYXRhLm5vZGVfaWQpO1xuICAgIGlmIChub2RlICYmIGlzRW1iZWROb2RlTGlrZShub2RlKSkge1xuICAgICAgICBub2RlLnNldFJlbGF1bmNoRGF0YSh7XG4gICAgICAgICAgICAnbm9kZSc6IG5vZGVEYXRhLnRpdGxlLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcGFnZSA9IGdldFBhZ2VOb2RlKG5vZGUpO1xuICAgICAgICBpZiAocGFnZS5pZCA9PT0gbm9kZS5pZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgdGlsZU5vZGVJZCA9IHBhZ2UuZ2V0UGx1Z2luRGF0YShub2RlRGF0YS5ub2RlX2lkKTtcbiAgICAgICAgaWYgKHRpbGVOb2RlSWQpIHtcbiAgICAgICAgICAgIChfYSA9IGZpZ21hLmdldE5vZGVCeUlkKHRpbGVOb2RlSWQpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZmlnbWEubG9hZEZvbnRBc3luYyh7IGZhbWlseTogXCJJbnRlclwiLCBzdHlsZTogXCJNZWRpdW1cIiB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vY29uc3QgdGFnRnJhbWVzID0gW107XG4gICAgICAgICAgICBjb25zdCByb290ID0gZmlnbWEuY3JlYXRlRnJhbWUoKTtcbiAgICAgICAgICAgIHJvb3QueCA9IG5vZGUueDtcbiAgICAgICAgICAgIHJvb3QueSA9IG5vZGUueSAtIDM4O1xuICAgICAgICAgICAgY29uc3QgdGFncyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgdHlwZSBpbiBub2RlRGF0YS50YWdzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZ1bGxUYWdzLmhhcyh0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICB0YWdzLnB1c2goLi4uZnVsbFRhZ3MuZ2V0KHR5cGUpLnRhZ3MuZmlsdGVyKHQgPT4gbm9kZURhdGEudGFnc1t0eXBlXS5maW5kKHQwID0+IHQubmFtZSA9PT0gdDApKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcm9vdC5uYW1lID0gdGFncy5tYXAodCA9PiB0Lm5hbWUpLmpvaW4oKTtcbiAgICAgICAgICAgIHJvb3QuZmlsbHMgPSBbXTtcbiAgICAgICAgICAgIHJvb3QubGF5b3V0TW9kZSA9ICdIT1JJWk9OVEFMJztcbiAgICAgICAgICAgIHJvb3QubGF5b3V0QWxpZ24gPSAnSU5IRVJJVCc7XG4gICAgICAgICAgICByb290LmxheW91dEdyb3cgPSAwO1xuICAgICAgICAgICAgcm9vdC5wcmltYXJ5QXhpc0FsaWduSXRlbXMgPSAnTUlOJztcbiAgICAgICAgICAgIHJvb3QucHJpbWFyeUF4aXNTaXppbmdNb2RlID0gJ0FVVE8nO1xuICAgICAgICAgICAgcm9vdC5jb3VudGVyQXhpc1NpemluZ01vZGUgPSAnQVVUTyc7XG4gICAgICAgICAgICByb290Lml0ZW1TcGFjaW5nID0gODtcbiAgICAgICAgICAgIHRhZ3MuZm9yRWFjaCh0YWcgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZyYW1lID0gZmlnbWEuY3JlYXRlRnJhbWUoKTtcbiAgICAgICAgICAgICAgICAvLyBmcmFtZS54ID0gbm9kZS54O1xuICAgICAgICAgICAgICAgIC8vIGZyYW1lLnkgPSBub2RlLnkgLSA0MDtcbiAgICAgICAgICAgICAgICBmcmFtZS5uYW1lID0gdGFnLm5hbWU7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9IGZpZ21hLmNyZWF0ZVRleHQoKTtcbiAgICAgICAgICAgICAgICB0ZXh0LmZvbnROYW1lID0ge1xuICAgICAgICAgICAgICAgICAgICBmYW1pbHk6IFwiSW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IFwiTWVkaXVtXCJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRleHQubGluZUhlaWdodCA9IHsgdmFsdWU6IDE0LCB1bml0OiAnUElYRUxTJyB9O1xuICAgICAgICAgICAgICAgIHRleHQuZm9udFNpemUgPSAxMjtcbiAgICAgICAgICAgICAgICB0ZXh0LmNoYXJhY3RlcnMgPSB0YWcubmFtZTtcbiAgICAgICAgICAgICAgICB0ZXh0LmZpbGxzID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiU09MSURcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcjogdGFnLmNvbG9yLnIgLyAyNTUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZzogdGFnLmNvbG9yLmcgLyAyNTUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYjogdGFnLmNvbG9yLmIgLyAyNTUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogdGFnLmNvbG9yLmFcbiAgICAgICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgLy8gdGV4dC5oeXBlcmxpbmsgPSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIHR5cGU6IFwiVVJMXCIsXG4gICAgICAgICAgICAgICAgLy8gICAgIHZhbHVlOiBub2RlRGF0YVxuICAgICAgICAgICAgICAgIC8vIH07XG4gICAgICAgICAgICAgICAgZnJhbWUuYXBwZW5kQ2hpbGQodGV4dCk7XG4gICAgICAgICAgICAgICAgZnJhbWUubGF5b3V0TW9kZSA9IFwiSE9SSVpPTlRBTFwiO1xuICAgICAgICAgICAgICAgIGZyYW1lLnByaW1hcnlBeGlzU2l6aW5nTW9kZSA9IFwiQVVUT1wiO1xuICAgICAgICAgICAgICAgIGZyYW1lLmNvdW50ZXJBeGlzU2l6aW5nTW9kZSA9IFwiQVVUT1wiO1xuICAgICAgICAgICAgICAgIGZyYW1lLnBhZGRpbmdUb3AgPSA0O1xuICAgICAgICAgICAgICAgIGZyYW1lLnBhZGRpbmdCb3R0b20gPSA0O1xuICAgICAgICAgICAgICAgIGZyYW1lLnBhZGRpbmdMZWZ0ID0gODtcbiAgICAgICAgICAgICAgICBmcmFtZS5wYWRkaW5nUmlnaHQgPSA4O1xuICAgICAgICAgICAgICAgIGZyYW1lLmNvcm5lclJhZGl1cyA9IDQ7XG4gICAgICAgICAgICAgICAgZnJhbWUuZmlsbHMgPSBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJTT0xJRFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByOiB0YWcuYmFja2dyb3VuZC5yIC8gMjU1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGc6IHRhZy5iYWNrZ3JvdW5kLmcgLyAyNTUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYjogdGFnLmJhY2tncm91bmQuYiAvIDI1NSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgZnJhbWUuc3Ryb2tlcyA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlNPTElEXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogeyByOiAwLCBnOiAwLCBiOiAwIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLjA1XG4gICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgIHJvb3QuYXBwZW5kQ2hpbGQoZnJhbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IGZpZ21hLmdyb3VwKFtyb290XSwgcGFnZSk7XG4gICAgICAgICAgICBncm91cC5uYW1lID0gcm9vdC5uYW1lO1xuICAgICAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChncm91cCk7XG4gICAgICAgICAgICBwYWdlLnNldFBsdWdpbkRhdGEobm9kZURhdGEubm9kZV9pZCwgZ3JvdXAuaWQpO1xuICAgICAgICB9KS5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGZpZ21hLm5vdGlmeShcIkZvbnQgZmFtaWx5IG5vdCBmb3VuZCFcIiwgeyBlcnJvcjogdHJ1ZSB9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuY29uc3QgdW5tYXJrTm9kZSA9IChub2RlSWQpID0+IHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3Qgbm9kZSA9IGZpZ21hLmdldE5vZGVCeUlkKG5vZGVJZCk7XG4gICAgaWYgKG5vZGUgJiYgaXNFbWJlZE5vZGVMaWtlKG5vZGUpKSB7XG4gICAgICAgIG5vZGUuc2V0UmVsYXVuY2hEYXRhKHt9KTtcbiAgICAgICAgY29uc3QgcGFnZSA9IGdldFBhZ2VOb2RlKG5vZGUpO1xuICAgICAgICBjb25zdCB0aWxlTm9kZUlkID0gcGFnZS5nZXRQbHVnaW5EYXRhKG5vZGVJZCk7XG4gICAgICAgIGlmICh0aWxlTm9kZUlkKSB7XG4gICAgICAgICAgICAoX2EgPSBmaWdtYS5nZXROb2RlQnlJZCh0aWxlTm9kZUlkKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgfVxufTtcbmZ1bmN0aW9uIGlzRW1iZWROb2RlTGlrZShub2RlKSB7XG4gICAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBnZXRQYWdlTm9kZShub2RlKSB7XG4gICAgd2hpbGUgKG5vZGUudHlwZSAhPT0gXCJQQUdFXCIpIHtcbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbn1cbmNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIGZvciAobGV0IGVsIG9mIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbikge1xuICAgICAgICBjb25zdCB0aWxlTm9kZUlkID0gZmlnbWEuY3VycmVudFBhZ2UuZ2V0UGx1Z2luRGF0YShlbC5pZCk7XG4gICAgICAgIGlmICh0aWxlTm9kZUlkKSB7XG4gICAgICAgICAgICBjb25zdCB0aWxlTm9kZSA9IGZpZ21hLmdldE5vZGVCeUlkKHRpbGVOb2RlSWQpO1xuICAgICAgICAgICAgaWYgKHRpbGVOb2RlICYmICh0aWxlTm9kZS50eXBlID09PSAnR1JPVVAnIHx8IHRpbGVOb2RlLnR5cGUgPT09ICdGUkFNRScpKSB7XG4gICAgICAgICAgICAgICAgdGlsZU5vZGUueCA9IGVsLng7XG4gICAgICAgICAgICAgICAgdGlsZU5vZGUueSA9IGVsLnkgLSAzODtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0sIDUwKTtcbmNvbnNvbGUubG9nKFwiY29kZUNhbnZhc1RhZyBpbml0IVwiKTtcbmV4cG9ydCB7IGludGVydmFsLCBtYXJrTm9kZSwgdW5tYXJrTm9kZSB9O1xuIiwiY29uc3QgZXZlbnRMaXN0ZW5lcnMgPSBbXTtcbmV4cG9ydCBjb25zdCBkaXNwYXRjaCA9IChhY3Rpb24sIGRhdGEpID0+IHtcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IGFjdGlvbiwgZGF0YSB9KTtcbn07XG5leHBvcnQgY29uc3QgaGFuZGxlRXZlbnQgPSAodHlwZSwgY2FsbGJhY2spID0+IHtcbiAgICBldmVudExpc3RlbmVycy5wdXNoKHsgdHlwZSwgY2FsbGJhY2sgfSk7XG59O1xuZmlnbWEudWkub25tZXNzYWdlID0gbWVzc2FnZSA9PiB7XG4gICAgZm9yIChsZXQgZXZlbnRMaXN0ZW5lciBvZiBldmVudExpc3RlbmVycykge1xuICAgICAgICBpZiAobWVzc2FnZS5hY3Rpb24gPT09IGV2ZW50TGlzdGVuZXIudHlwZSlcbiAgICAgICAgICAgIGV2ZW50TGlzdGVuZXIuY2FsbGJhY2sobWVzc2FnZS5kYXRhKTtcbiAgICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==