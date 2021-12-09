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
    var modules = (0, resolver_1.resolveRootModule)(options.bootstrap).modules;
    var Main = options.bootstrap;
    var state = window['__INITIAL_STATE__'] || {};
    var page = (window['__INITIAL_MODULE__'] || '');
    var App = function () { return react_1.default.createElement(main_1.Common, { modules: modules, pageState: state[page], url: '' }); };
    (0, react_dom_1.render)(react_1.default.createElement(Main, { App: App, initialState: state }), document.querySelector('#root'));
}
exports.createBrowserApp = createBrowserApp;
