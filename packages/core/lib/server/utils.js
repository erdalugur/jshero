"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHtml = exports.resolveApp = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
function resolveApp(relativePath) {
    return path_1.default.join(path_1.default.resolve(process.cwd()), relativePath);
}
exports.resolveApp = resolveApp;
var html = '';
function readHtml(staticPath) {
    if (html === '') {
        html = fs_1.default.readFileSync(staticPath + "/index.html", { encoding: 'utf-8' });
    }
    return html;
}
exports.readHtml = readHtml;
