"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderModule = void 0;
var react_helmet_1 = require("react-helmet");
var utils_1 = require("./utils");
var main_1 = require("../main");
var server_1 = require("react-dom/server");
var react_1 = __importDefault(require("react"));
var staticPath = (0, utils_1.resolveApp)('build/browser');
var template = (0, utils_1.readHtml)(staticPath);
function renderModule(_a) {
    var module = _a.module, modules = _a.modules, data = _a.data, bootstrap = _a.bootstrap;
    return __awaiter(this, void 0, void 0, function () {
        function getInitialProps() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (bootstrap.getInitialProps) {
                        return [2 /*return*/, bootstrap.getInitialProps({ App: App, initialState: initialState, render: render })];
                    }
                    return [2 /*return*/, Promise.resolve(render(App))];
                });
            });
        }
        var initialState, App, render, _b, html, css, state, helmet, regexp, htmlTag, head, body, script;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    initialState = (_c = {}, _c[module.name] = data, _c);
                    App = function () { return react_1.default.createElement(main_1.Common, { modules: modules, pageState: data, url: module.path }); };
                    render = function (App) { return ({ html: (0, server_1.renderToString)(react_1.default.createElement(App, null)), css: '', initialState: initialState }); };
                    return [4 /*yield*/, getInitialProps()];
                case 1:
                    _b = _d.sent(), html = _b.html, css = _b.css, state = _b.initialState;
                    helmet = react_helmet_1.Helmet.renderStatic();
                    regexp = / data-react-helmet="true"/g;
                    htmlTag = helmet.htmlAttributes.toString().replace(regexp, ''), head = [
                        helmet.title.toString().replace(regexp, ''),
                        helmet.meta.toString().replace(regexp, ''),
                        helmet.style.toString().replace(regexp, ''),
                        helmet.link.toString().replace(regexp, ''),
                    ].join(''), body = helmet.bodyAttributes.toString().replace(regexp, ''), script = helmet.script.toString().replace(regexp, '');
                    return [2 /*return*/, template
                            .replace('<html', "<html " + htmlTag)
                            .replace('</head>', head + "</head>")
                            .replace('</head>', css ? "<style type=\"text/css\" id=\"server-side-styles\">" + css + "</style></head>" : '</head>')
                            .replace('<body', "<body " + body)
                            .replace('<div id="root"></div>', "<div id=\"root\">" + html + "</div>\n  <script>\n    window.__INITIAL_STATE__ = " + JSON.stringify(state).replace(/</g, '\\u003c') + "\n    window.__INITIAL_MODULE__ = '" + module.name + "'\n  </script>\n  ")
                            .replace('</body>', script + "</body>")];
            }
        });
    });
}
exports.renderModule = renderModule;
