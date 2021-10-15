"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBrowserApp = void 0;
var resolver_1 = require("../resolver");
var react_1 = __importDefault(require("react"));
var react_dom_1 = require("react-dom");
var react_router_dom_1 = require("react-router-dom");
var main_1 = require("../main");
function createBrowserApp(options) {
    var _a = (0, resolver_1.resolveRootModule)(options.bootstrap), modules = _a.modules, reducers = _a.reducers, configureStore = _a.configureStore;
    var store = configureStore(window['__INITIAL_STATE__'] || {}, reducers);
    (0, react_dom_1.hydrate)(react_1.default.createElement(react_router_dom_1.BrowserRouter, null, (0, main_1.createApp)(store, modules)), document.querySelector('#root'), function () {
        var _a;
        var ssStyles = document.querySelector('#server-side-styles');
        (_a = ssStyles === null || ssStyles === void 0 ? void 0 : ssStyles.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(ssStyles);
    });
}
exports.createBrowserApp = createBrowserApp;
