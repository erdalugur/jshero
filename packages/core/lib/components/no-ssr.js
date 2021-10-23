"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoSSR = void 0;
var react_1 = __importDefault(require("react"));
function NoSSR(props) {
    if (process.env.BROWSER) {
        return (react_1.default.createElement(react_1.default.Fragment, null, props.children));
    }
    return null;
}
exports.NoSSR = NoSSR;
