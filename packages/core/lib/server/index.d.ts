import './polyfill';
import { CreateAppOptions } from '../types';
export declare function createServer(options: CreateAppOptions): Promise<import("express-serve-static-core").Express>;