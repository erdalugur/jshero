"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Redirect = exports.InternalServerErrorException = exports.UnAuthorizedException = exports.ForbiddenException = exports.BadRequestException = exports.NotFoundException = exports.HttpException = void 0;
var types_1 = require("../types");
var NOT_FOUND = 'Not Found', BAD_REQUEST = 'BadRequest', FORBIDDEN = 'Forbidden', UN_AUTHORIZED = 'UnAuthorized', INTERNAL_SERVER_ERROR = 'Internal Server Error';
/**
 * @example
 * throw new HttpException("your error message", your_status_number)
 */
var HttpException = /** @class */ (function () {
    function HttpException(message, status) {
        this.status = status;
        this.trustedException = true;
        this.message = this.defaultMessage(status, message);
    }
    HttpException.prototype.defaultMessage = function (statusCode, message) {
        if (typeof (message) === 'undefined') {
            switch (statusCode) {
                case types_1.HttpStatusCode.BadRequest:
                    return BAD_REQUEST;
                case types_1.HttpStatusCode.InternalServer:
                    return INTERNAL_SERVER_ERROR;
                case types_1.HttpStatusCode.UnAuthorized:
                    return UN_AUTHORIZED;
                case types_1.HttpStatusCode.NotFound:
                    return NOT_FOUND;
                case types_1.HttpStatusCode.Forbidden:
                    return FORBIDDEN;
            }
        }
        else {
            return message;
        }
    };
    return HttpException;
}());
exports.HttpException = HttpException;
/**
 * @example
 * throw new NotFoundException()
 */
var NotFoundException = /** @class */ (function (_super) {
    __extends(NotFoundException, _super);
    function NotFoundException(message) {
        return _super.call(this, message, types_1.HttpStatusCode.NotFound) || this;
    }
    return NotFoundException;
}(HttpException));
exports.NotFoundException = NotFoundException;
/**
 * @example
 * throw new BadRequestException()
 */
var BadRequestException = /** @class */ (function (_super) {
    __extends(BadRequestException, _super);
    function BadRequestException(message) {
        return _super.call(this, message, types_1.HttpStatusCode.BadRequest) || this;
    }
    return BadRequestException;
}(HttpException));
exports.BadRequestException = BadRequestException;
/**
 * @example
 * throw new ForbiddenException()
 */
var ForbiddenException = /** @class */ (function (_super) {
    __extends(ForbiddenException, _super);
    function ForbiddenException(message) {
        return _super.call(this, message, types_1.HttpStatusCode.Forbidden) || this;
    }
    return ForbiddenException;
}(HttpException));
exports.ForbiddenException = ForbiddenException;
/**
 * @example
 * throw new UnAuthorizedException()
 */
var UnAuthorizedException = /** @class */ (function (_super) {
    __extends(UnAuthorizedException, _super);
    function UnAuthorizedException(message) {
        return _super.call(this, message, types_1.HttpStatusCode.UnAuthorized) || this;
    }
    return UnAuthorizedException;
}(HttpException));
exports.UnAuthorizedException = UnAuthorizedException;
/**
 * @example
 * throw new InternalServerErrorException()
 */
var InternalServerErrorException = /** @class */ (function (_super) {
    __extends(InternalServerErrorException, _super);
    function InternalServerErrorException(message) {
        return _super.call(this, message, types_1.HttpStatusCode.InternalServer) || this;
    }
    return InternalServerErrorException;
}(HttpException));
exports.InternalServerErrorException = InternalServerErrorException;
var Redirect = /** @class */ (function (_super) {
    __extends(Redirect, _super);
    function Redirect(destination, permanent) {
        if (permanent === void 0) { permanent = false; }
        var _this = _super.call(this, 'redirect', permanent ? types_1.HttpStatusCode.RedirectMovedPermanent : types_1.HttpStatusCode.RedirectTemporary) || this;
        _this.statusCode = types_1.HttpStatusCode.RedirectTemporary;
        _this.redirectionResult = true;
        _this.destination = destination;
        _this.statusCode = permanent ? types_1.HttpStatusCode.RedirectMovedPermanent : types_1.HttpStatusCode.RedirectTemporary;
        return _this;
    }
    return Redirect;
}(HttpException));
exports.Redirect = Redirect;
