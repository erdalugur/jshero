"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Common = void 0;
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
function Common(_a) {
    var modules = _a.modules, pageState = _a.pageState, url = _a.url;
    function renderModules() {
        return (react_1.default.createElement(react_router_dom_1.Switch, null, modules.map(function (_a) {
            var Component = _a.view, x = __rest(_a, ["view"]);
            return (react_1.default.createElement(react_router_dom_1.Route, __assign({ key: x.path }, x),
                react_1.default.createElement(Component, __assign({}, pageState))));
        })));
    }
    var RouterComponent = (process.env['BROWSER'] ? react_router_dom_1.BrowserRouter : react_router_dom_1.StaticRouter);
    return (react_1.default.createElement(RouterComponent, { location: url }, renderModules()));
}
exports.Common = Common;
