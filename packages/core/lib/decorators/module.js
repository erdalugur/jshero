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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
var jshero_constants_1 = __importDefault(require("jshero-constants"));
function Module(options) {
    return function (target) {
        if (options.providers && options.providers.length > 0) {
            Reflect.defineMetadata(jshero_constants_1.default.APP_MODULE, {
                providers: options.providers,
                configureStore: options.configureStore
            }, target);
        }
        else {
            Reflect.defineMetadata(jshero_constants_1.default.APP_MODULE, __assign({}, options), target);
        }
    };
}
exports.Module = Module;
