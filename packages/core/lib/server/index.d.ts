import './polyfill';
import { CreateAppOptions } from '../types';
declare const app: import("express-serve-static-core").Express;
export declare function createServer(options: CreateAppOptions): Promise<typeof app>;
export {};
