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
var react_1 = __importDefault(require("react"));
var server_1 = require("react-dom/server");
var react_router_dom_1 = require("react-router-dom");
var react_jss_1 = require("react-jss");
var jshero_core_1 = require("jshero-core");
var main_1 = require("../main");
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var parcel_bundler_1 = __importDefault(require("parcel-bundler"));
function createAsset() {
    return __awaiter(this, void 0, void 0, function () {
        var staticFolder, html, devHtml, bundler, entryAsset;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    staticFolder = path_1.default.resolve(process.cwd(), 'build/output');
                    html = '';
                    if (!(process.env['NODE_ENV'] === 'production')) return [3 /*break*/, 1];
                    html = fs_1.default.readFileSync(staticFolder + "/index.html", { encoding: 'utf-8' });
                    return [3 /*break*/, 3];
                case 1:
                    devHtml = path_1.default.resolve(process.cwd(), 'src/index.html');
                    bundler = new parcel_bundler_1.default(devHtml, {
                        outDir: 'build/output',
                        minify: true
                    });
                    return [4 /*yield*/, bundler.bundle()];
                case 2:
                    entryAsset = (_a.sent()).entryAsset;
                    html = entryAsset.generated.html;
                    _a.label = 3;
                case 3: return [2 /*return*/, { template: html, staticFolder: staticFolder }];
            }
        });
    });
}
function createServer(options) {
    return __awaiter(this, void 0, void 0, function () {
        function useMiddeware() {
            var _this = this;
            var _a = (0, jshero_core_1.resolveBootstrap)(options.bootstrap), modules = _a.modules, reducers = _a.reducers, configureStore = _a.configureStore;
            function createRenderer(url, initialState) {
                var store = configureStore(initialState, reducers);
                var sheets = new react_jss_1.SheetsRegistry();
                var markup = (0, server_1.renderToString)(react_1.default.createElement(react_jss_1.JssProvider, { registry: sheets },
                    react_1.default.createElement(react_router_dom_1.StaticRouter, { location: url }, (0, main_1.createApp)(store, modules))));
                return {
                    render: function () {
                        var _a;
                        return template
                            .replace('<title></title>', ((_a = initialState === null || initialState === void 0 ? void 0 : initialState.meta) === null || _a === void 0 ? void 0 : _a.title) || '')
                            .replace('<style type="text/css" id="server-side-styles">', "\n            <style type=\"text/css\" id=\"server-side-styles\">\n              " + sheets.toString() + "\n            </style>\n          ")
                            .replace('<div id="root"></div>', "\n          <div id=\"root\">" + markup + "</div>\n          <script>\n            window.__INITIAL_STATE__ = " + JSON.stringify(store.getState()).replace(/</g, '\\u003c') + "\n          </script>\n          ");
                    }
                };
            }
            modules.forEach(function (x) {
                if (x.view) {
                    router.get(x.path, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var viewHandler, result, initialState, render;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, (0, jshero_core_1.resolveViewHandler)(x.controller)];
                                case 1:
                                    viewHandler = _b.sent();
                                    return [4 /*yield*/, viewHandler()];
                                case 2:
                                    result = _b.sent();
                                    initialState = (_a = {}, _a[x.name] = result, _a);
                                    render = createRenderer(req.url, initialState).render;
                                    res.send(render());
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
                // api routes
                var prefix = (0, jshero_core_1.resolvePrefix)(x.controller, x.path);
                var routes = (0, jshero_core_1.resolveRoutes)(x.controller);
                routes.forEach(function (_a) {
                    var methodName = _a.methodName, requestMethod = _a.requestMethod, path = _a.path;
                    var instance = jshero_core_1.Injector.resolve(x.controller);
                    router[requestMethod](prefix + path, function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                        var injections, result, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    injections = (0, jshero_core_1.getInjectionsPerRequest)({ instance: instance, methodName: methodName, req: req, res: res, next: next });
                                    return [4 /*yield*/, instance[methodName].apply(instance, injections)];
                                case 1:
                                    result = _a.sent();
                                    res.json(result);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_1 = _a.sent();
                                    next(error_1);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                });
            });
            return router;
        }
        var router, _a, staticFolder, template;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("application running " + process.env['NODE_ENV'] + " mode");
                    router = express_1.default.Router();
                    return [4 /*yield*/, createAsset()];
                case 1:
                    _a = _b.sent(), staticFolder = _a.staticFolder, template = _a.template;
                    router.get('*.*', express_1.default.static(staticFolder));
                    return [2 /*return*/, { useMiddeware: useMiddeware }];
            }
        });
    });
}
exports.createServer = createServer;
