"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRenderer = void 0;
var react_1 = __importDefault(require("react"));
var server_1 = require("react-dom/server");
var react_router_dom_1 = require("react-router-dom");
var react_jss_1 = require("react-jss");
var fs_1 = __importDefault(require("fs"));
var react_helmet_1 = require("react-helmet");
var main_1 = require("../main");
var utils_1 = require("./utils");
var staticPath = (0, utils_1.resolveApp)('build/browser');
function createRenderer(_a) {
    var url = _a.url, store = _a.store, modules = _a.modules;
    var sheets = new react_jss_1.SheetsRegistry();
    var markup = (0, server_1.renderToString)(react_1.default.createElement(react_jss_1.JssProvider, { registry: sheets },
        react_1.default.createElement(react_router_dom_1.StaticRouter, { location: url }, (0, main_1.createApp)(store, modules))));
    return {
        render: function () {
            var template = fs_1.default.readFileSync(staticPath + "/index.html", { encoding: 'utf-8' });
            var helmet = react_helmet_1.Helmet.renderStatic();
            var regexp = / data-react-helmet="true"/g;
            var html = helmet.htmlAttributes.toString().replace(regexp, ''), head = [
                helmet.title.toString().replace(regexp, ''),
                helmet.meta.toString().replace(regexp, ''),
                helmet.link.toString().replace(regexp, '')
            ].join(''), body = helmet.bodyAttributes.toString().replace(regexp, ''), script = helmet.script.toString().replace(regexp, '');
            return template
                .replace('<html', "<html " + html)
                .replace('</head>', head + "</head>")
                .replace('</head>', "<style type=\"text/css\" id=\"server-side-styles\">" + sheets.toString() + "</style></head>")
                .replace('<body', "<body " + body)
                .replace('<div id="root"></div>', "<div id=\"root\">" + markup + "</div>\n      <script>\n        window.__INITIAL_STATE__ = " + JSON.stringify(store.getState()).replace(/</g, '\\u003c') + "\n      </script>\n      ")
                .replace('</body>', script + "</body>");
        }
    };
}
exports.createRenderer = createRenderer;
