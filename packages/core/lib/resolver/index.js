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
exports.resolveRootModule = void 0;
var jshero_constants_1 = __importDefault(require("jshero-constants"));
var decorators_1 = require("../decorators");
var cache_1 = require("../cache");
var exceptions_1 = require("../exceptions");
var constants_1 = require("../constants");
function resolveController(target) {
    function createFn(methodName, req, res, next) {
        var _a;
        var _this = this;
        var instance = decorators_1.Injector.resolve(target);
        var injections = (0, decorators_1.getInjectionsPerRequest)({ instance: instance, methodName: methodName, req: req, res: res, next: next });
        var fn = (_a = instance[methodName]).bind.apply(_a, __spreadArray([instance], injections, false));
        var cache = cache_1.cacheManager.get(target, methodName);
        if (cache)
            return function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, cache];
            }); }); };
        return function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fn()];
                    case 1:
                        result = _a.sent();
                        if (cache)
                            cache_1.cacheManager.set(methodName, result, target);
                        return [2 /*return*/, result];
                }
            });
        }); };
    }
    function fn(req, res, next, method) {
        if (method === void 0) { method = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var methodName;
            return __generator(this, function (_a) {
                methodName = method || Reflect.getMetadata(jshero_constants_1.default.VIEW_HANDLER, target) || '';
                if (methodName === '') {
                    throw new exceptions_1.InternalServerErrorException('View handler not found');
                }
                return [2 /*return*/, createFn(methodName, req, res, next)()];
            });
        });
    }
    function resolvePrefix() {
        var prefix = Reflect.getMetadata(jshero_constants_1.default.PREFIX, target) || '';
        return prefix.startsWith('/api') ? prefix : "/api" + prefix;
    }
    function resolveRoutes() {
        return Reflect.getMetadata(jshero_constants_1.default.ROUTES, target) || [];
    }
    function resolveMiddleware() {
        if (!Reflect.hasMetadata(constants_1.MIDDLEWARE, target)) {
            return [];
        }
        return (Reflect.getMetadata(constants_1.MIDDLEWARE, target) || []);
    }
    function injectedMiddleware(param) {
        var propertyKey = '';
        if (typeof (param) === 'boolean') {
            propertyKey = Reflect.getMetadata(jshero_constants_1.default.VIEW_HANDLER, target);
        }
        else {
            propertyKey = param;
        }
        var middlewares = (Reflect.getMetadata(constants_1.INJECT_MIDDLEWARE, target) || []);
        var record = middlewares.find(function (x) { return x.propertyKey === propertyKey; });
        var response = [];
        if (record) {
            response = record.middlewares;
        }
        return response;
    }
    return {
        fn: fn,
        resolveRoutes: resolveRoutes,
        resolvePrefix: resolvePrefix,
        withOutputCache: cache_1.WithOutputCache,
        resolveMiddleware: resolveMiddleware,
        injectedMiddleware: injectedMiddleware
    };
}
function resolveRootModule(bootstrap) {
    function getModule(module) {
        return (Reflect.getMetadata(jshero_constants_1.default.APP_MODULE, module) || []);
    }
    var _a = getModule(bootstrap), providers = _a.providers, configureStore = _a.configureStore;
    function getReducers() {
        var reducers = {};
        providers.forEach(function (x) {
            var _a = getModule(x), reducer = _a.reducer, name = _a.name;
            reducers[name] = reducer;
        });
        return reducers;
    }
    function getModules() {
        var modules = [];
        providers.forEach(function (x) {
            modules.push(getModule(x));
        });
        return modules;
    }
    return {
        providers: providers,
        modules: getModules(),
        reducers: getReducers(),
        configureStore: configureStore,
        resolveController: resolveController
    };
}
exports.resolveRootModule = resolveRootModule;
