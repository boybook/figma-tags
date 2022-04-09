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


figma.showUI(__html__);
figma.ui.resize(288, 600);
//figma.clientStorage.setAsync("tags", undefined).then();
//figma.clientStorage.setAsync("nodes", undefined).then();
switch (figma.command) {
    case 'node':
    default:
        {
            let file = figma.fileKey;
            if (!file) {
                file = figma.root.getPluginData('file-id');
            }
            Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])("init", {
                file_id: file,
                selection: packageCurrentSelection()
            });
            break;
        }
}
// Handle events from UI
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
/*! exports provided: markNode, unmarkNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
setInterval(() => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGVDYW52YXNUYWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGVNZXNzYWdlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUE2RDtBQUNOO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksb0VBQVE7QUFDcEI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVFQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsb0VBQVE7QUFDaEIsS0FBSztBQUNMLENBQUM7QUFDRCx1RUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG9FQUFRO0FBQ2hCLEtBQUs7QUFDTCxDQUFDO0FBQ0QsdUVBQVc7QUFDWDtBQUNBLENBQUM7QUFDRCx1RUFBVztBQUNYLElBQUksK0RBQVE7QUFDWixDQUFDO0FBQ0QsdUVBQVc7QUFDWCxJQUFJLGlFQUFVO0FBQ2QsQ0FBQztBQUNEO0FBQ0EsSUFBSSxvRUFBUTtBQUNaLENBQUM7QUFDRDtBQUNBLElBQUksb0VBQVE7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hGQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsbUNBQW1DO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxnQ0FBZ0MsbUJBQW1CO0FBQ25EO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULG9EQUFvRCxjQUFjO0FBQ2xFO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDZ0M7Ozs7Ozs7Ozs7Ozs7QUNoSWhDO0FBQUE7QUFBQTtBQUFBO0FBQ087QUFDUCwwQkFBMEIsZUFBZTtBQUN6QztBQUNPO0FBQ1AseUJBQXlCLGlCQUFpQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY29kZS50c1wiKTtcbiIsImltcG9ydCB7IGRpc3BhdGNoLCBoYW5kbGVFdmVudCB9IGZyb20gJy4vY29kZU1lc3NhZ2VIYW5kbGVyJztcbmltcG9ydCB7IG1hcmtOb2RlLCB1bm1hcmtOb2RlIH0gZnJvbSBcIi4vY29kZUNhbnZhc1RhZ1wiO1xuZmlnbWEuc2hvd1VJKF9faHRtbF9fKTtcbmZpZ21hLnVpLnJlc2l6ZSgyODgsIDYwMCk7XG4vL2ZpZ21hLmNsaWVudFN0b3JhZ2Uuc2V0QXN5bmMoXCJ0YWdzXCIsIHVuZGVmaW5lZCkudGhlbigpO1xuLy9maWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKFwibm9kZXNcIiwgdW5kZWZpbmVkKS50aGVuKCk7XG5zd2l0Y2ggKGZpZ21hLmNvbW1hbmQpIHtcbiAgICBjYXNlICdub2RlJzpcbiAgICBkZWZhdWx0OlxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgZmlsZSA9IGZpZ21hLmZpbGVLZXk7XG4gICAgICAgICAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgICAgICAgICBmaWxlID0gZmlnbWEucm9vdC5nZXRQbHVnaW5EYXRhKCdmaWxlLWlkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkaXNwYXRjaChcImluaXRcIiwge1xuICAgICAgICAgICAgICAgIGZpbGVfaWQ6IGZpbGUsXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBwYWNrYWdlQ3VycmVudFNlbGVjdGlvbigpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG59XG4vLyBIYW5kbGUgZXZlbnRzIGZyb20gVUlcbmhhbmRsZUV2ZW50KCdjbGllbnQtc3RvcmFnZS1nZXQnLCAoZGF0YSkgPT4ge1xuICAgIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoZGF0YS5rZXkpLnRoZW4ociA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgICAgICAgIGtleTogZGF0YS5rZXksXG4gICAgICAgICAgICByZXN1bHQ6IHJcbiAgICAgICAgfTtcbiAgICAgICAgZGlzcGF0Y2goJ2NsaWVudC1zdG9yYWdlLWdldCcsIHJlc3VsdCk7XG4gICAgfSk7XG59KTtcbmhhbmRsZUV2ZW50KCdjbGllbnQtc3RvcmFnZS1zZXQnLCAoZGF0YSkgPT4ge1xuICAgIGZpZ21hLmNsaWVudFN0b3JhZ2Uuc2V0QXN5bmMoZGF0YS5rZXksIGRhdGEuZGF0YSkudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgICAgICAgIGtleTogZGF0YS5rZXksXG4gICAgICAgICAgICBzdWM6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgZGlzcGF0Y2goJ2NsaWVudC1zdG9yYWdlLXNldCcsIHJlc3VsdCk7XG4gICAgfSk7XG59KTtcbmhhbmRsZUV2ZW50KCdkb2N1bWVudC1wbHVnaW4tZGF0YS1zZXQnLCAoZGF0YSkgPT4ge1xuICAgIGZpZ21hLnJvb3Quc2V0UGx1Z2luRGF0YShkYXRhLmtleSwgZGF0YS52YWx1ZSk7XG59KTtcbmhhbmRsZUV2ZW50KCdjYW52YXMtbWFyay1ub2RlJywgKGRhdGEpID0+IHtcbiAgICBtYXJrTm9kZShuZXcgTWFwKEpTT04ucGFyc2UoZGF0YS5mdWxsVGFncykpLCBKU09OLnBhcnNlKGRhdGEubm9kZSkpO1xufSk7XG5oYW5kbGVFdmVudCgnY2FudmFzLXVubWFyay1ub2RlJywgKG5vZGVJZCkgPT4ge1xuICAgIHVubWFya05vZGUobm9kZUlkKTtcbn0pO1xuZmlnbWEub24oXCJzZWxlY3Rpb25jaGFuZ2VcIiwgKCkgPT4ge1xuICAgIGRpc3BhdGNoKFwic2VsZWN0aW9uY2hhbmdlXCIsIHBhY2thZ2VDdXJyZW50U2VsZWN0aW9uKCkpO1xufSk7XG5maWdtYS5vbihcImN1cnJlbnRwYWdlY2hhbmdlXCIsICgpID0+IHtcbiAgICBkaXNwYXRjaChcInNlbGVjdGlvbmNoYW5nZVwiLCBwYWNrYWdlQ3VycmVudFNlbGVjdGlvbigpKTtcbn0pO1xuZnVuY3Rpb24gcGFja2FnZUN1cnJlbnRTZWxlY3Rpb24oKSB7XG4gICAgY29uc3Qgbm9kZSA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbi5sZW5ndGggPiAwID8gZ2V0UGFnZVJvb3ROb2RlKGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvblswXSkgOiBmaWdtYS5jdXJyZW50UGFnZTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBub2RlLnR5cGUgPT09ICdQQUdFJyA/ICdQQUdFJyA6ICdGUkFNRScsXG4gICAgICAgIGlkOiBub2RlLmlkLFxuICAgICAgICBuYW1lOiBub2RlLm5hbWVcbiAgICB9O1xufVxuZnVuY3Rpb24gaXNSb290RnJhbWUobm9kZSkge1xuICAgIHJldHVybiBub2RlLnBhcmVudC50eXBlID09IFwiUEFHRVwiO1xufVxuZnVuY3Rpb24gZ2V0UGFnZVJvb3ROb2RlKG5vZGUpIHtcbiAgICB3aGlsZSAobm9kZS5wYXJlbnQudHlwZSAhPT0gXCJQQUdFXCIpIHtcbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbn1cbmZ1bmN0aW9uIGdldFBhZ2VOb2RlKG5vZGUpIHtcbiAgICB3aGlsZSAobm9kZS50eXBlICE9PSBcIlBBR0VcIikge1xuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnQ7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xufVxuZnVuY3Rpb24gaXNFbWJlZE5vZGVMaWtlKG5vZGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbiIsImNvbnN0IG1hcmtOb2RlID0gKGZ1bGxUYWdzLCBub2RlRGF0YSkgPT4ge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBub2RlID0gZmlnbWEuZ2V0Tm9kZUJ5SWQobm9kZURhdGEubm9kZV9pZCk7XG4gICAgaWYgKG5vZGUgJiYgaXNFbWJlZE5vZGVMaWtlKG5vZGUpKSB7XG4gICAgICAgIG5vZGUuc2V0UmVsYXVuY2hEYXRhKHtcbiAgICAgICAgICAgICdub2RlJzogbm9kZURhdGEudGl0bGUsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBwYWdlID0gZ2V0UGFnZU5vZGUobm9kZSk7XG4gICAgICAgIGlmIChwYWdlLmlkID09PSBub2RlLmlkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCB0aWxlTm9kZUlkID0gcGFnZS5nZXRQbHVnaW5EYXRhKG5vZGVEYXRhLm5vZGVfaWQpO1xuICAgICAgICBpZiAodGlsZU5vZGVJZCkge1xuICAgICAgICAgICAgKF9hID0gZmlnbWEuZ2V0Tm9kZUJ5SWQodGlsZU5vZGVJZCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBmaWdtYS5sb2FkRm9udEFzeW5jKHsgZmFtaWx5OiBcIkludGVyXCIsIHN0eWxlOiBcIk1lZGl1bVwiIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy9jb25zdCB0YWdGcmFtZXMgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHJvb3QgPSBmaWdtYS5jcmVhdGVGcmFtZSgpO1xuICAgICAgICAgICAgcm9vdC54ID0gbm9kZS54O1xuICAgICAgICAgICAgcm9vdC55ID0gbm9kZS55IC0gMzg7XG4gICAgICAgICAgICBjb25zdCB0YWdzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCB0eXBlIGluIG5vZGVEYXRhLnRhZ3MpIHtcbiAgICAgICAgICAgICAgICBpZiAoZnVsbFRhZ3MuaGFzKHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhZ3MucHVzaCguLi5mdWxsVGFncy5nZXQodHlwZSkudGFncy5maWx0ZXIodCA9PiBub2RlRGF0YS50YWdzW3R5cGVdLmZpbmQodDAgPT4gdC5uYW1lID09PSB0MCkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb290Lm5hbWUgPSB0YWdzLm1hcCh0ID0+IHQubmFtZSkuam9pbigpO1xuICAgICAgICAgICAgcm9vdC5maWxscyA9IFtdO1xuICAgICAgICAgICAgcm9vdC5sYXlvdXRNb2RlID0gJ0hPUklaT05UQUwnO1xuICAgICAgICAgICAgcm9vdC5sYXlvdXRBbGlnbiA9ICdJTkhFUklUJztcbiAgICAgICAgICAgIHJvb3QubGF5b3V0R3JvdyA9IDA7XG4gICAgICAgICAgICByb290LnByaW1hcnlBeGlzQWxpZ25JdGVtcyA9ICdNSU4nO1xuICAgICAgICAgICAgcm9vdC5wcmltYXJ5QXhpc1NpemluZ01vZGUgPSAnQVVUTyc7XG4gICAgICAgICAgICByb290LmNvdW50ZXJBeGlzU2l6aW5nTW9kZSA9ICdBVVRPJztcbiAgICAgICAgICAgIHJvb3QuaXRlbVNwYWNpbmcgPSA4O1xuICAgICAgICAgICAgdGFncy5mb3JFYWNoKHRhZyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZnJhbWUgPSBmaWdtYS5jcmVhdGVGcmFtZSgpO1xuICAgICAgICAgICAgICAgIC8vIGZyYW1lLnggPSBub2RlLng7XG4gICAgICAgICAgICAgICAgLy8gZnJhbWUueSA9IG5vZGUueSAtIDQwO1xuICAgICAgICAgICAgICAgIGZyYW1lLm5hbWUgPSB0YWcubmFtZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0gZmlnbWEuY3JlYXRlVGV4dCgpO1xuICAgICAgICAgICAgICAgIHRleHQuZm9udE5hbWUgPSB7XG4gICAgICAgICAgICAgICAgICAgIGZhbWlseTogXCJJbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogXCJNZWRpdW1cIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGV4dC5saW5lSGVpZ2h0ID0geyB2YWx1ZTogMTQsIHVuaXQ6ICdQSVhFTFMnIH07XG4gICAgICAgICAgICAgICAgdGV4dC5mb250U2l6ZSA9IDEyO1xuICAgICAgICAgICAgICAgIHRleHQuY2hhcmFjdGVycyA9IHRhZy5uYW1lO1xuICAgICAgICAgICAgICAgIHRleHQuZmlsbHMgPSBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJTT0xJRFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByOiB0YWcuY29sb3IuciAvIDI1NSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnOiB0YWcuY29sb3IuZyAvIDI1NSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiOiB0YWcuY29sb3IuYiAvIDI1NSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiB0YWcuY29sb3IuYVxuICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICAvLyB0ZXh0Lmh5cGVybGluayA9IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgdHlwZTogXCJVUkxcIixcbiAgICAgICAgICAgICAgICAvLyAgICAgdmFsdWU6IG5vZGVEYXRhXG4gICAgICAgICAgICAgICAgLy8gfTtcbiAgICAgICAgICAgICAgICBmcmFtZS5hcHBlbmRDaGlsZCh0ZXh0KTtcbiAgICAgICAgICAgICAgICBmcmFtZS5sYXlvdXRNb2RlID0gXCJIT1JJWk9OVEFMXCI7XG4gICAgICAgICAgICAgICAgZnJhbWUucHJpbWFyeUF4aXNTaXppbmdNb2RlID0gXCJBVVRPXCI7XG4gICAgICAgICAgICAgICAgZnJhbWUuY291bnRlckF4aXNTaXppbmdNb2RlID0gXCJBVVRPXCI7XG4gICAgICAgICAgICAgICAgZnJhbWUucGFkZGluZ1RvcCA9IDQ7XG4gICAgICAgICAgICAgICAgZnJhbWUucGFkZGluZ0JvdHRvbSA9IDQ7XG4gICAgICAgICAgICAgICAgZnJhbWUucGFkZGluZ0xlZnQgPSA4O1xuICAgICAgICAgICAgICAgIGZyYW1lLnBhZGRpbmdSaWdodCA9IDg7XG4gICAgICAgICAgICAgICAgZnJhbWUuY29ybmVyUmFkaXVzID0gNDtcbiAgICAgICAgICAgICAgICBmcmFtZS5maWxscyA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlNPTElEXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHI6IHRhZy5iYWNrZ3JvdW5kLnIgLyAyNTUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZzogdGFnLmJhY2tncm91bmQuZyAvIDI1NSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiOiB0YWcuYmFja2dyb3VuZC5iIC8gMjU1LFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICBmcmFtZS5zdHJva2VzID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiU09MSURcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB7IHI6IDAsIGc6IDAsIGI6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuMDVcbiAgICAgICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgcm9vdC5hcHBlbmRDaGlsZChmcmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZmlnbWEuZ3JvdXAoW3Jvb3RdLCBwYWdlKTtcbiAgICAgICAgICAgIGdyb3VwLm5hbWUgPSByb290Lm5hbWU7XG4gICAgICAgICAgICBwYWdlLmFwcGVuZENoaWxkKGdyb3VwKTtcbiAgICAgICAgICAgIHBhZ2Uuc2V0UGx1Z2luRGF0YShub2RlRGF0YS5ub2RlX2lkLCBncm91cC5pZCk7XG4gICAgICAgIH0pLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgZmlnbWEubm90aWZ5KFwiRm9udCBmYW1pbHkgbm90IGZvdW5kIVwiLCB7IGVycm9yOiB0cnVlIH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5jb25zdCB1bm1hcmtOb2RlID0gKG5vZGVJZCkgPT4ge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBub2RlID0gZmlnbWEuZ2V0Tm9kZUJ5SWQobm9kZUlkKTtcbiAgICBpZiAobm9kZSAmJiBpc0VtYmVkTm9kZUxpa2Uobm9kZSkpIHtcbiAgICAgICAgbm9kZS5zZXRSZWxhdW5jaERhdGEoe30pO1xuICAgICAgICBjb25zdCBwYWdlID0gZ2V0UGFnZU5vZGUobm9kZSk7XG4gICAgICAgIGNvbnN0IHRpbGVOb2RlSWQgPSBwYWdlLmdldFBsdWdpbkRhdGEobm9kZUlkKTtcbiAgICAgICAgaWYgKHRpbGVOb2RlSWQpIHtcbiAgICAgICAgICAgIChfYSA9IGZpZ21hLmdldE5vZGVCeUlkKHRpbGVOb2RlSWQpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuZnVuY3Rpb24gaXNFbWJlZE5vZGVMaWtlKG5vZGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGdldFBhZ2VOb2RlKG5vZGUpIHtcbiAgICB3aGlsZSAobm9kZS50eXBlICE9PSBcIlBBR0VcIikge1xuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnQ7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xufVxuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIGZvciAobGV0IGVsIG9mIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbikge1xuICAgICAgICBjb25zdCB0aWxlTm9kZUlkID0gZmlnbWEuY3VycmVudFBhZ2UuZ2V0UGx1Z2luRGF0YShlbC5pZCk7XG4gICAgICAgIGlmICh0aWxlTm9kZUlkKSB7XG4gICAgICAgICAgICBjb25zdCB0aWxlTm9kZSA9IGZpZ21hLmdldE5vZGVCeUlkKHRpbGVOb2RlSWQpO1xuICAgICAgICAgICAgaWYgKHRpbGVOb2RlICYmICh0aWxlTm9kZS50eXBlID09PSAnR1JPVVAnIHx8IHRpbGVOb2RlLnR5cGUgPT09ICdGUkFNRScpKSB7XG4gICAgICAgICAgICAgICAgdGlsZU5vZGUueCA9IGVsLng7XG4gICAgICAgICAgICAgICAgdGlsZU5vZGUueSA9IGVsLnkgLSAzODtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0sIDUwKTtcbmNvbnNvbGUubG9nKFwiY29kZUNhbnZhc1RhZyBpbml0IVwiKTtcbmV4cG9ydCB7IG1hcmtOb2RlLCB1bm1hcmtOb2RlIH07XG4iLCJjb25zdCBldmVudExpc3RlbmVycyA9IFtdO1xuZXhwb3J0IGNvbnN0IGRpc3BhdGNoID0gKGFjdGlvbiwgZGF0YSkgPT4ge1xuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgYWN0aW9uLCBkYXRhIH0pO1xufTtcbmV4cG9ydCBjb25zdCBoYW5kbGVFdmVudCA9ICh0eXBlLCBjYWxsYmFjaykgPT4ge1xuICAgIGV2ZW50TGlzdGVuZXJzLnB1c2goeyB0eXBlLCBjYWxsYmFjayB9KTtcbn07XG5maWdtYS51aS5vbm1lc3NhZ2UgPSBtZXNzYWdlID0+IHtcbiAgICBmb3IgKGxldCBldmVudExpc3RlbmVyIG9mIGV2ZW50TGlzdGVuZXJzKSB7XG4gICAgICAgIGlmIChtZXNzYWdlLmFjdGlvbiA9PT0gZXZlbnRMaXN0ZW5lci50eXBlKVxuICAgICAgICAgICAgZXZlbnRMaXN0ZW5lci5jYWxsYmFjayhtZXNzYWdlLmRhdGEpO1xuICAgIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9