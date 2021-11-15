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
var react_router_dom_1 = require("react-router-dom");
function createBrowserApp(options) {
    var modules = (0, resolver_1.resolveRootModule)(options.bootstrap).modules;
    var Main = options.bootstrap;
    var state = window['__INITIAL_STATE__'] || {};
    var page = (window['__INITIAL_MODULE__'] || '');
    function App() {
        return (react_1.default.createElement("div", { suppressHydrationWarning: true },
            react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement(main_1.Common, { modules: modules, pageState: state[page] }))));
    }
    (0, react_dom_1.hydrate)(react_1.default.createElement(Main, { path: window.location.pathname, initialState: state, App: App }), document.querySelector('#root'));
}
exports.createBrowserApp = createBrowserApp;
