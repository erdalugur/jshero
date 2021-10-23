"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Head = void 0;
var react_1 = __importDefault(require("react"));
var react_helmet_1 = require("react-helmet");
function Head(props) {
    return (react_1.default.createElement(react_helmet_1.Helmet, null, props.children));
}
exports.Head = Head;
