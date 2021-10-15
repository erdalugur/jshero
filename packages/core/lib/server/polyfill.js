"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
if (!process.env.BROWSER) {
    global.window = {
        document: {},
        __INITIAL_STATE__: {}
    };
    global.fetch = isomorphic_fetch_1.default;
    global.document = {};
}
