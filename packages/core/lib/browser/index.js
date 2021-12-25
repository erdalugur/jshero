"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBrowserApp = void 0;
var resolver_1 = require("../resolver");
var react_1 = __importDefault(require("react"));
var react_dom_1 = require("react-dom");
var main_1 = require("../main");
function createBrowserApp(options) {
    var _a;
    var modules = (0, resolver_1.resolveRootModule)(options.bootstrap).modules;
    var Main = options.bootstrap;
    var _b = (JSON.parse((_a = document.querySelector('#__JSHERO_DATA__')) === null || _a === void 0 ? void 0 : _a.textContent) || { module: '', props: {} }), props = _b.props, module = _b.module;
    var App = function () { return react_1.default.createElement(main_1.Common, { modules: modules, pageState: props[module], url: '' }); };
    (0, react_dom_1.render)(react_1.default.createElement(Main, { App: App, initialState: props }), document.querySelector('#root'));
}
exports.createBrowserApp = createBrowserApp;
