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
exports.requestContextMiddleware = exports.sendError = exports.errorLogger = void 0;
var fs_1 = __importDefault(require("fs"));
var exceptions_1 = require("../exceptions");
var utils_1 = require("./utils");
var types_1 = require("../types");
function errorLogger(err, req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("errorLogger", err.message);
            req.error = err;
            next();
            return [2 /*return*/];
        });
    });
}
exports.errorLogger = errorLogger;
function sendError(req, res) {
    var statusCode = req.error && req.error.status || 404;
    var message = req.error && req.error.message || 'Not Found';
    var appName = process.env['JSHERO_APPNAME'] || 'JSHERO';
    if (statusCode === types_1.HttpStatusCode.RedirectMovedPermanent || statusCode === types_1.HttpStatusCode.RedirectTemporary) {
        console.log(req.url);
        res.writeHead(statusCode, { location: req.error.destination }).end();
    }
    else {
        var fileSource = (0, utils_1.resolveApp)("build/browser/" + statusCode + ".html");
        res.status(statusCode);
        if (fs_1.default.existsSync(fileSource))
            res.sendFile(fileSource);
        else
            res.send("\n      <html>\n      <head>\n      <meta charset=\"UTF-8\">\n      <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n      <title>" + appName + "</title><style>\n      .container {\n        width: 100%;\n        height: 100vh;\n        display: flex;\n        align-items: center;\n        flex-direction: column;\n        justify-content: center;\n      }\n      </style>\n      </head>\n      <body>\n        <div class=\"container\">\n          <h1>" + statusCode + "</h1>\n          <p>" + message + "</p>\n        </div>\n      </body>\n      </html>\n      ");
    }
}
exports.sendError = sendError;
function requestContextMiddleware(req, res, next) {
    req.redirect = function (destination, permanent) {
        if (permanent === void 0) { permanent = false; }
        req.url = destination;
        throw new exceptions_1.Redirect(destination, permanent);
    };
    req.notFound = function (message) {
        throw new exceptions_1.NotFoundException(message);
    };
    req.unAuthorized = function (message) {
        throw new exceptions_1.UnAuthorizedException(message);
    };
    req.forbidden = function (message) {
        throw new exceptions_1.ForbiddenException(message);
    };
    req.badRequest = function (message) {
        res.setHeader('Errors', message);
        throw new exceptions_1.BadRequestException(message);
    };
    next();
}
exports.requestContextMiddleware = requestContextMiddleware;
