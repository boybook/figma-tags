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

figma.showUI(__html__);
figma.ui.resize(288, 600);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGVNZXNzYWdlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBNkQ7QUFFN0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN2QixLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFFMUIsUUFBUSxLQUFLLENBQUMsT0FBTyxFQUFFO0lBQ3RCLEtBQUssTUFBTSxDQUFDO0lBQ1o7UUFDQTtZQUNDLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDekIsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDVixJQUFJLEdBQUcs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QU8sSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7UUFDNUIsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDbkI7SUFDRCxPQUFrQixJQUFJLENBQUM7QUFDeEIsQ0FBQztBQUVELFNBQVMsZUFBZSxDQUFDLElBQWM7SUFDdEMsT0FBTyxJQUFJLENBQUM7QUFDYixDQUFDOzs7Ozs7Ozs7Ozs7O0FDakZEO0FBQUE7QUFBQTtBQUFBLE1BQU0sY0FBYyxHQUEyQyxFQUFFLENBQUM7QUFDM0QsTUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFjLEVBQUUsSUFBVSxFQUFFLEVBQUU7SUFDdEQsS0FBSyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUN4QyxDQUFDLENBQUM7QUFDSyxNQUFNLFdBQVcsR0FBRyxDQUFDLElBQVksRUFBRSxRQUFrQixFQUFFLEVBQUU7SUFDL0QsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQ3pDLENBQUMsQ0FBQztBQUNGLEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxFQUFFO0lBQzlCLEtBQUssSUFBSSxhQUFhLElBQUksY0FBYyxFQUFFO1FBQ3pDLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxhQUFhLENBQUMsSUFBSTtZQUFFLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2hGO0FBQ0YsQ0FBQyxDQUFDIiwiZmlsZSI6ImNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9jb2RlLnRzXCIpO1xuIiwiaW1wb3J0IHsgZGlzcGF0Y2gsIGhhbmRsZUV2ZW50IH0gZnJvbSAnLi9jb2RlTWVzc2FnZUhhbmRsZXInO1xuaW1wb3J0IFNlbGVjdGlvbkNoYW5nZSA9IFRyYW5zZmVyLkN1cnJlbnRTZWxlY3Rpb247XG5maWdtYS5zaG93VUkoX19odG1sX18pO1xuZmlnbWEudWkucmVzaXplKDI4OCwgNjAwKTtcblxuc3dpdGNoIChmaWdtYS5jb21tYW5kKSB7XG5cdGNhc2UgJ25vZGUnOlxuXHRkZWZhdWx0OlxuXHR7XG5cdFx0bGV0IGZpbGUgPSBmaWdtYS5maWxlS2V5O1xuXHRcdGlmICghZmlsZSkge1xuXHRcdFx0ZmlsZSA9IGZpZ21hLnJvb3QuZ2V0UGx1Z2luRGF0YSgnZmlsZS1pZCcpO1xuXHRcdH1cblx0XHRkaXNwYXRjaChcImluaXRcIiwgPFRyYW5zZmVyLkluaXREYXRhPiB7XG5cdFx0XHRmaWxlX2lkOiBmaWxlLFxuXHRcdFx0c2VsZWN0aW9uOiBwYWNrYWdlQ3VycmVudFNlbGVjdGlvbigpXG5cdFx0fSk7XG5cdFx0YnJlYWs7XG5cdH1cbn1cblxuLy8gSGFuZGxlIGV2ZW50cyBmcm9tIFVJXG5oYW5kbGVFdmVudCgnY2xpZW50LXN0b3JhZ2UtZ2V0JywgKGRhdGE6IFRyYW5zZmVyLkNsaWVudFN0b3JhZ2VHZXRSZXF1ZXN0KSA9PiB7XG5cdGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoZGF0YS5rZXkpLnRoZW4ociA9PiB7XG5cdFx0Y29uc3QgcmVzdWx0OiBUcmFuc2Zlci5DbGllbnRTdG9yYWdlR2V0UmVzdWx0ID0ge1xuXHRcdFx0a2V5OiBkYXRhLmtleSxcblx0XHRcdHJlc3VsdDogclxuXHRcdH1cblx0XHRkaXNwYXRjaCgnY2xpZW50LXN0b3JhZ2UtZ2V0JywgcmVzdWx0KTtcblx0fSk7XG59KTtcbmhhbmRsZUV2ZW50KCdjbGllbnQtc3RvcmFnZS1zZXQnLCAoZGF0YTogVHJhbnNmZXIuQ2xpZW50U3RvcmFnZVNldFJlcXVlc3QpID0+IHtcblx0ZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYyhkYXRhLmtleSwgZGF0YS5kYXRhKS50aGVuKCgpID0+IHtcblx0XHRjb25zdCByZXN1bHQ6IFRyYW5zZmVyLkNsaWVudFN0b3JhZ2VTZXRSZXN1bHQgPSB7XG5cdFx0XHRrZXk6IGRhdGEua2V5LFxuXHRcdFx0c3VjOiB0cnVlXG5cdFx0fVxuXHRcdGRpc3BhdGNoKCdjbGllbnQtc3RvcmFnZS1zZXQnLCByZXN1bHQpO1xuXHR9KTtcbn0pO1xuaGFuZGxlRXZlbnQoJ2RvY3VtZW50LXBsdWdpbi1kYXRhLXNldCcsIChkYXRhOiBUcmFuc2Zlci5Eb2N1bWVudFBsdWdpbkRhdGEpID0+IHtcblx0ZmlnbWEucm9vdC5zZXRQbHVnaW5EYXRhKGRhdGEua2V5LCBkYXRhLnZhbHVlKTtcbn0pXG5cbmZpZ21hLm9uKFwic2VsZWN0aW9uY2hhbmdlXCIsICgpID0+IHtcblx0ZGlzcGF0Y2goXCJzZWxlY3Rpb25jaGFuZ2VcIiwgcGFja2FnZUN1cnJlbnRTZWxlY3Rpb24oKSk7XG59KTtcblxuZmlnbWEub24oXCJjdXJyZW50cGFnZWNoYW5nZVwiLCAoKSA9PiB7XG5cdGRpc3BhdGNoKFwic2VsZWN0aW9uY2hhbmdlXCIsIHBhY2thZ2VDdXJyZW50U2VsZWN0aW9uKCkpO1xufSk7XG5cbmZ1bmN0aW9uIHBhY2thZ2VDdXJyZW50U2VsZWN0aW9uKCkgOiBTZWxlY3Rpb25DaGFuZ2Uge1xuXHRjb25zdCBub2RlID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uLmxlbmd0aCA+IDAgPyBnZXRQYWdlUm9vdE5vZGUoZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uWzBdKSA6IGZpZ21hLmN1cnJlbnRQYWdlO1xuXHRyZXR1cm4ge1xuXHRcdHR5cGU6IG5vZGUudHlwZSA9PT0gJ1BBR0UnID8gJ1BBR0UnIDogJ0ZSQU1FJyxcblx0XHRpZDogbm9kZS5pZCxcblx0XHRuYW1lOiBub2RlLm5hbWVcblx0fTtcbn1cblxuZnVuY3Rpb24gaXNSb290RnJhbWUobm9kZTogQmFzZU5vZGUpOiBub2RlIGlzIEZyYW1lTm9kZSB8IENvbXBvbmVudE5vZGUgfCBJbnN0YW5jZU5vZGUge1xuXHRyZXR1cm4gbm9kZS5wYXJlbnQudHlwZSA9PSBcIlBBR0VcIjtcbn1cblxuZnVuY3Rpb24gZ2V0UGFnZVJvb3ROb2RlKG5vZGU6IEJhc2VOb2RlKTogU2NlbmVOb2RlIHtcblx0d2hpbGUgKG5vZGUucGFyZW50LnR5cGUgIT09IFwiUEFHRVwiKSB7XG5cdFx0bm9kZSA9IG5vZGUucGFyZW50O1xuXHR9XG5cdHJldHVybiA8U2NlbmVOb2RlPiBub2RlO1xufVxuXG5mdW5jdGlvbiBnZXRQYWdlTm9kZShub2RlOiBCYXNlTm9kZSk6IFBhZ2VOb2RlIHtcblx0d2hpbGUgKG5vZGUudHlwZSAhPT0gXCJQQUdFXCIpIHtcblx0XHRub2RlID0gbm9kZS5wYXJlbnQ7XG5cdH1cblx0cmV0dXJuIDxQYWdlTm9kZT4gbm9kZTtcbn1cblxuZnVuY3Rpb24gaXNFbWJlZE5vZGVMaWtlKG5vZGU6IEJhc2VOb2RlKTogbm9kZSBpcyBFbWJlZE5vZGUge1xuXHRyZXR1cm4gdHJ1ZTtcbn0iLCJjb25zdCBldmVudExpc3RlbmVyczogeyB0eXBlOiBTdHJpbmc7IGNhbGxiYWNrOiBGdW5jdGlvbiB9W10gPSBbXTtcbmV4cG9ydCBjb25zdCBkaXNwYXRjaCA9IChhY3Rpb246IFN0cmluZywgZGF0YT86IGFueSkgPT4ge1xuXHRmaWdtYS51aS5wb3N0TWVzc2FnZSh7IGFjdGlvbiwgZGF0YSB9KTtcbn07XG5leHBvcnQgY29uc3QgaGFuZGxlRXZlbnQgPSAodHlwZTogU3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pID0+IHtcblx0ZXZlbnRMaXN0ZW5lcnMucHVzaCh7IHR5cGUsIGNhbGxiYWNrIH0pO1xufTtcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IG1lc3NhZ2UgPT4ge1xuXHRmb3IgKGxldCBldmVudExpc3RlbmVyIG9mIGV2ZW50TGlzdGVuZXJzKSB7XG5cdFx0aWYgKG1lc3NhZ2UuYWN0aW9uID09PSBldmVudExpc3RlbmVyLnR5cGUpIGV2ZW50TGlzdGVuZXIuY2FsbGJhY2sobWVzc2FnZS5kYXRhKTtcblx0fVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=