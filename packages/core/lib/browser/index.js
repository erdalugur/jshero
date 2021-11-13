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
    var App = options.bootstrap;
    var getInitialState = function () { return window['__INITIAL_STATE__'] || {}; };
    var appModules = modules.map(function (x) {
        x.getInitialState = getInitialState;
        return x;
    });
    (0, react_dom_1.hydrate)(react_1.default.createElement(App, { path: window.location.pathname, initialState: getInitialState() }, (0, main_1.createApp)(appModules)), document.querySelector('#root'));
}
exports.createBrowserApp = createBrowserApp;
