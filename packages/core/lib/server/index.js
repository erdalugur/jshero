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
exports.createServer = void 0;
require("./polyfill");
var react_1 = __importDefault(require("react"));
var server_1 = require("react-dom/server");
var react_router_dom_1 = require("react-router-dom");
var react_jss_1 = require("react-jss");
var resolver_1 = require("../resolver");
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var react_helmet_1 = require("react-helmet");
var main_1 = require("../main");
var compression_1 = __importDefault(require("compression"));
function resolveApp(relativePath) {
    return path_1.default.join(path_1.default.resolve(process.cwd()), relativePath);
}
function createRenderer(url, store, modules) {
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
var staticPath = resolveApp('build/browser');
function createServer(options) {
    return __awaiter(this, void 0, void 0, function () {
        function useMiddeware() {
            var _this = this;
            var _a = (0, resolver_1.resolveRootModule)(options.bootstrap), modules = _a.modules, reducers = _a.reducers, configureStore = _a.configureStore, resolveController = _a.resolveController;
            modules.forEach(function (x) {
                var _a = resolveController(x.controller), fn = _a.fn, resolvePrefix = _a.resolvePrefix, resolveRoutes = _a.resolveRoutes, withOutputCache = _a.withOutputCache;
                if (x.view) {
                    router.get(x.path, function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                        var cacheKey, result, error_1;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    cacheKey = "__" + x.path + "__" + x.name + "__";
                                    return [4 /*yield*/, withOutputCache(cacheKey, x.outputCache || 0, function () { return __awaiter(_this, void 0, void 0, function () {
                                            var result, store, render;
                                            var _a;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0: return [4 /*yield*/, fn(req, res, next)];
                                                    case 1:
                                                        result = _b.sent();
                                                        store = configureStore((_a = {}, _a[x.name] = result, _a), reducers);
                                                        render = createRenderer(req.url, store, modules).render;
                                                        return [2 /*return*/, render()];
                                                }
                                            });
                                        }); })];
                                case 1:
                                    result = _a.sent();
                                    res.send(result);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_1 = _a.sent();
                                    next(error_1);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                }
                // api routes
                var prefix = resolvePrefix();
                var routes = resolveRoutes();
                routes.forEach(function (_a) {
                    var methodName = _a.methodName, requestMethod = _a.requestMethod, path = _a.path;
                    router[requestMethod](prefix + path, function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                        var result, error_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, fn(req, res, next, methodName)];
                                case 1:
                                    result = _a.sent();
                                    res.json(result);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_2 = _a.sent();
                                    next(error_2);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                });
            });
            return router;
        }
        var app, router;
        return __generator(this, function (_a) {
            app = (0, express_1.default)();
            app.use((0, compression_1.default)());
            router = express_1.default.Router();
            app.use(useMiddeware());
            app.get('*.*', express_1.default.static(staticPath));
            return [2 /*return*/, app];
        });
    });
}
exports.createServer = createServer;
