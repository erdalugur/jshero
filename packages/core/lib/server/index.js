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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
require("./polyfill");
var resolver_1 = require("../resolver");
var express_1 = __importDefault(require("express"));
var compression_1 = __importDefault(require("compression"));
var utils_1 = require("./utils");
var middleware_1 = require("./middleware");
var renderer_1 = require("./renderer");
var server_1 = require("react-dom/server");
var react_1 = __importDefault(require("react"));
var main_1 = require("../main");
var react_router_1 = require("react-router");
var staticPath = (0, utils_1.resolveApp)('build/browser');
function createServer(options) {
    var app = (0, express_1.default)();
    app.use((0, compression_1.default)());
    app.use(middleware_1.requestContextMiddleware);
    var router = express_1.default.Router();
    function useMiddleware() {
        var _this = this;
        var _a = (0, resolver_1.resolveRootModule)(options.bootstrap), modules = _a.modules, resolveController = _a.resolveController;
        modules.forEach(function (x, i) {
            var _a = resolveController(x.controller), fn = _a.fn, resolvePrefix = _a.resolvePrefix, resolveRoutes = _a.resolveRoutes, withOutputCache = _a.withOutputCache, resolveMiddleware = _a.resolveMiddleware, injectedMiddleware = _a.injectedMiddleware;
            var middlewares = resolveMiddleware();
            if (x.view) {
                var allMiddleware = __spreadArray(__spreadArray([], middlewares, true), injectedMiddleware(true), true);
                router.get(x.path, allMiddleware, function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                    var key, page, error_1;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                key = "_" + x.path + "_" + x.name + "_key";
                                return [4 /*yield*/, withOutputCache(key, x.outputCache, function () { return __awaiter(_this, void 0, void 0, function () {
                                        var render, data;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    render = function (data) {
                                                        var _a;
                                                        var Main = options.bootstrap;
                                                        var state = (_a = {}, _a[x.name] = data, _a);
                                                        function App() {
                                                            return (react_1.default.createElement(react_router_1.StaticRouter, { location: req.url },
                                                                react_1.default.createElement(main_1.Common, { modules: modules, pageState: data })));
                                                        }
                                                        var html = (0, server_1.renderToString)(react_1.default.createElement(Main, { initialState: state, path: req.url, App: App }));
                                                        return (0, renderer_1.renderFullPage)(html, state, x.name);
                                                    };
                                                    return [4 /*yield*/, fn(req, res, next)];
                                                case 1:
                                                    data = _a.sent();
                                                    return [2 /*return*/, render(data)];
                                            }
                                        });
                                    }); })
                                    // send page html
                                ];
                            case 1:
                                page = _a.sent();
                                // send page html
                                res.send(page);
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
                var route = (prefix + x.path + path).replace('//', '/');
                var allMiddleware = __spreadArray(__spreadArray([], middlewares, true), injectedMiddleware(methodName), true);
                router[requestMethod](route, allMiddleware, function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                    var result, error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, fn(req, res, next, methodName)];
                            case 1:
                                result = _a.sent();
                                res.status(200).json(result);
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
        app.use(router);
    }
    function useStaticMiddleware() {
        app.get('*.*', express_1.default.static(staticPath));
    }
    function useExceptionMiddleware() {
        app.use(middleware_1.errorLogger);
        app.use(middleware_1.sendError);
    }
    return {
        app: app,
        useAppMiddleware: useMiddleware,
        useStaticMiddleware: useStaticMiddleware,
        useExceptionMiddleware: useExceptionMiddleware
    };
}
exports.createServer = createServer;
