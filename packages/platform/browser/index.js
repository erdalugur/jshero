"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBrowserApp = void 0;
var jshero_core_1 = require("jshero-core");
var react_1 = __importDefault(require("react"));
var react_dom_1 = require("react-dom");
var react_router_dom_1 = require("react-router-dom");
var main_1 = require("../main");
function createBrowserApp(options) {
    var _a = (0, jshero_core_1.resolveBootstrap)(options.bootstrap), modules = _a.modules, reducers = _a.reducers, configureStore = _a.configureStore;
    var store = configureStore(window.__INITIAL_STATE__ || {}, reducers);
    (0, react_dom_1.hydrate)(react_1.default.createElement(react_router_dom_1.BrowserRouter, null, (0, main_1.createApp)(store, modules)), document.querySelector('#root'));
}
exports.createBrowserApp = createBrowserApp;
