"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectMiddleware = exports.ViewHandler = exports.Controller = void 0;
require("reflect-metadata");
var jshero_constants_1 = __importDefault(require("jshero-constants"));
var MIDDLEWARE = '__MIDDLEWARE__';
function Controller(options) {
    return function (target) {
        var prefix = options && options.prefix || '';
        Reflect.defineMetadata(jshero_constants_1.default.PREFIX, prefix, target);
        if (!Reflect.hasMetadata(jshero_constants_1.default.ROUTES, target)) {
            Reflect.defineMetadata(jshero_constants_1.default.ROUTES, [], target);
        }
        var middleware = options && options.middleware || [];
        if (middleware.length > 0) {
            Reflect.defineMetadata(MIDDLEWARE, middleware, target);
        }
    };
}
exports.Controller = Controller;
;
function ViewHandler() {
    return function (target, propertyKey, descriptor) {
        if (!Reflect.hasMetadata(jshero_constants_1.default.ROUTES, target.constructor)) {
            Reflect.defineMetadata(jshero_constants_1.default.ROUTES, [], target.constructor);
        }
        Reflect.defineMetadata(jshero_constants_1.default.VIEW_HANDLER, propertyKey, target.constructor);
    };
}
exports.ViewHandler = ViewHandler;
function injectMiddleware(target) {
    if (!Reflect.hasMetadata(MIDDLEWARE, target)) {
        return [];
    }
    return (Reflect.getMetadata(MIDDLEWARE, target) || []);
}
exports.injectMiddleware = injectMiddleware;
