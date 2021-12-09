"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootModuleType = exports.HttpStatusCode = exports.HttpMethods = void 0;
var HttpMethods;
(function (HttpMethods) {
    HttpMethods["GET"] = "get";
    HttpMethods["POST"] = "post";
    HttpMethods["PUT"] = "put";
    HttpMethods["OPTIONS"] = "options";
    HttpMethods["DELETE"] = "delete";
})(HttpMethods = exports.HttpMethods || (exports.HttpMethods = {}));
var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["RedirectMovedPermanent"] = 301] = "RedirectMovedPermanent";
    HttpStatusCode[HttpStatusCode["RedirectTemporary"] = 302] = "RedirectTemporary";
    HttpStatusCode[HttpStatusCode["BadRequest"] = 400] = "BadRequest";
    HttpStatusCode[HttpStatusCode["UnAuthorized"] = 401] = "UnAuthorized";
    HttpStatusCode[HttpStatusCode["Forbidden"] = 403] = "Forbidden";
    HttpStatusCode[HttpStatusCode["NotFound"] = 404] = "NotFound";
    HttpStatusCode[HttpStatusCode["InternalServer"] = 500] = "InternalServer";
})(HttpStatusCode = exports.HttpStatusCode || (exports.HttpStatusCode = {}));
var RootModuleType = /** @class */ (function () {
    function RootModuleType() {
    }
    return RootModuleType;
}());
exports.RootModuleType = RootModuleType;
