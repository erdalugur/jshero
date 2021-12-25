"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = exports.ViewHandler = exports.Controller = void 0;
require("reflect-metadata");
var jshero_constants_1 = __importDefault(require("jshero-constants"));
var constants_1 = require("../constants");
function Controller(options) {
    return function (target) {
        var prefix = options && options.prefix || '';
        Reflect.defineMetadata(jshero_constants_1.default.PREFIX, prefix, target);
        if (!Reflect.hasMetadata(jshero_constants_1.default.ROUTES, target)) {
            Reflect.defineMetadata(jshero_constants_1.default.ROUTES, [], target);
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
function Middleware(middleware) {
    if (middleware === void 0) { middleware = []; }
    return function (target, propertyKey) {
        if (propertyKey === void 0) { propertyKey = ''; }
        if (propertyKey === '') {
            Reflect.defineMetadata(constants_1.MIDDLEWARE, middleware, target);
            return;
        }
        var middlewares = Reflect.getMetadata(constants_1.INJECT_MIDDLEWARE, target.constructor) || [];
        middlewares.push({
            propertyKey: propertyKey.toString(),
            middlewares: middleware
        });
        Reflect.defineMetadata(constants_1.INJECT_MIDDLEWARE, middlewares, target.constructor);
    };
}
exports.Middleware = Middleware;
