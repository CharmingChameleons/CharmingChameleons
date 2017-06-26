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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ReferenceError: [BABEL] /home/henri/workspace/CharmingChameleons/src/entry.jsx: Unknown option: /home/henri/workspace/CharmingChameleons/.babelrc.query\n    at Logger.error (/home/henri/workspace/CharmingChameleons/node_modules/babel-core/lib/transformation/file/logger.js:41:11)\n    at OptionManager.mergeOptions (/home/henri/workspace/CharmingChameleons/node_modules/babel-core/lib/transformation/file/options/option-manager.js:262:18)\n    at OptionManager.addConfig (/home/henri/workspace/CharmingChameleons/node_modules/babel-core/lib/transformation/file/options/option-manager.js:221:10)\n    at OptionManager.findConfigs (/home/henri/workspace/CharmingChameleons/node_modules/babel-core/lib/transformation/file/options/option-manager.js:364:16)\n    at OptionManager.init (/home/henri/workspace/CharmingChameleons/node_modules/babel-core/lib/transformation/file/options/option-manager.js:412:12)\n    at File.initOptions (/home/henri/workspace/CharmingChameleons/node_modules/babel-core/lib/transformation/file/index.js:191:75)\n    at new File (/home/henri/workspace/CharmingChameleons/node_modules/babel-core/lib/transformation/file/index.js:122:22)\n    at Pipeline.transform (/home/henri/workspace/CharmingChameleons/node_modules/babel-core/lib/transformation/pipeline.js:42:16)\n    at transpile (/home/henri/workspace/CharmingChameleons/node_modules/babel-loader/index.js:14:22)\n    at Object.module.exports (/home/henri/workspace/CharmingChameleons/node_modules/babel-loader/index.js:88:12)");

/***/ })
/******/ ]);