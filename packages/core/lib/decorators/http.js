"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryStringMap = exports.Ctx = exports.Param = exports.Next = exports.Res = exports.Req = exports.Body = exports.Options = exports.Delete = exports.Put = exports.Post = exports.Get = void 0;
require("reflect-metadata");
var jshero_constants_1 = __importDefault(require("jshero-constants"));
var types_1 = require("../types");
var constants_1 = require("../constants");
function makeRouteMethod(options) {
    return function (target, propertyKey, descriptor) {
        if (!Reflect.hasMetadata(jshero_constants_1.default.ROUTES, target.constructor)) {
            Reflect.defineMetadata(jshero_constants_1.default.ROUTES, [], target.constructor);
        }
        var routes = Reflect.getMetadata(jshero_constants_1.default.ROUTES, target.constructor) || [];
        routes.push({
            requestMethod: options.method,
            path: options.path,
            methodName: propertyKey
        });
        Reflect.defineMetadata(jshero_constants_1.default.ROUTES, routes, target.constructor);
    };
}
function Get(path) {
    if (path === void 0) { path = ''; }
    return makeRouteMethod({ method: types_1.HttpMethods.GET, path: path });
}
exports.Get = Get;
;
function Post(path) {
    if (path === void 0) { path = ''; }
    return makeRouteMethod({ method: types_1.HttpMethods.POST, path: path });
}
exports.Post = Post;
;
function Put(path) {
    if (path === void 0) { path = ''; }
    return makeRouteMethod({ method: types_1.HttpMethods.PUT, path: path });
}
exports.Put = Put;
;
function Delete(path) {
    if (path === void 0) { path = ''; }
    return makeRouteMethod({ method: types_1.HttpMethods.DELETE, path: path });
}
exports.Delete = Delete;
;
function Options(path) {
    if (path === void 0) { path = ''; }
    return makeRouteMethod({ method: types_1.HttpMethods.OPTIONS, path: path });
}
exports.Options = Options;
function createParameterDecorator(metaKey) {
    return function (target, key, index) {
        Reflect.defineMetadata(metaKey, index, target, key);
    };
}
/**
 * @example
 * testMethod(@Body() test: T)
 */
var Body = function () { return createParameterDecorator(jshero_constants_1.default.BODY); };
exports.Body = Body;
/**
 * @example
 * testMethod(@Req() req: HttpRequest)
 */
var Req = function () { return createParameterDecorator(jshero_constants_1.default.REQUEST); };
exports.Req = Req;
/**
 * @example
 * testMethod(@Res() res: HttpResponse)
 */
var Res = function () { return createParameterDecorator(jshero_constants_1.default.RESPONSE); };
exports.Res = Res;
/**
 * @example
 * testMethod(@Next() next: HttpNextFunction)
 */
var Next = function () { return createParameterDecorator(jshero_constants_1.default.NEXT); };
exports.Next = Next;
/**
 * @example
 * testMethod(@Param('id') id: string)
 */
function Param(parameter) {
    return function (target, key, index) {
        Reflect.defineMetadata(jshero_constants_1.default.PARAM, { parameter: parameter, index: index }, target, key);
    };
}
exports.Param = Param;
var Ctx = function () { return createParameterDecorator(constants_1.HTTP_CONTEXT); };
exports.Ctx = Ctx;
var QueryStringMap = function () { return createParameterDecorator(constants_1.QUERY_STRING); };
exports.QueryStringMap = QueryStringMap;
