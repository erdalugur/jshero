"use strict";
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
exports.getInjectionsPerRequest = exports.Injector = void 0;
require("reflect-metadata");
var jshero_constants_1 = __importDefault(require("jshero-constants"));
// eslint-disable-next-line new-parens
exports.Injector = new /** @class */ (function () {
    function class_1() {
    }
    // resolving instances
    class_1.prototype.resolve = function (target) {
        // tokens are required dependencies, while injections are resolved tokens from the Injector
        var tokens = Reflect.getMetadata('design:paramtypes', target) || [], injections = tokens.map(function (token) { return exports.Injector.resolve(token); });
        return new (target.bind.apply(target, __spreadArray([void 0], injections, false)))();
    };
    return class_1;
}());
function getInjectionsPerRequest(_a) {
    var instance = _a.instance, methodName = _a.methodName, next = _a.next, req = _a.req, res = _a.res;
    var props = [];
    if (Reflect.hasMetadata(jshero_constants_1.default.BODY, instance, methodName)) {
        var index = Reflect.getMetadata(jshero_constants_1.default.BODY, instance, methodName);
        props[index] = req.body;
    }
    if (Reflect.hasMetadata(jshero_constants_1.default.PARAM, instance, methodName)) {
        var _b = Reflect.getMetadata(jshero_constants_1.default.PARAM, instance, methodName), parameter = _b.parameter, index = _b.index;
        props[index] = req.params[parameter];
    }
    if (Reflect.hasMetadata(jshero_constants_1.default.REQUEST, instance, methodName)) {
        var index = Reflect.getMetadata(jshero_constants_1.default.REQUEST, instance, methodName);
        props[index] = req;
    }
    if (Reflect.hasMetadata(jshero_constants_1.default.RESPONSE, instance, methodName)) {
        var index = Reflect.getMetadata(jshero_constants_1.default.RESPONSE, instance, methodName);
        props[index] = res;
    }
    if (Reflect.hasMetadata(jshero_constants_1.default.NEXT, instance, methodName)) {
        var index = Reflect.getMetadata(jshero_constants_1.default.NEXT, instance, methodName);
        props[index] = next;
    }
    return props;
}
exports.getInjectionsPerRequest = getInjectionsPerRequest;
