import './polyfill';
import { CreateAppOptions } from '../types';
export declare function createServer(options: CreateAppOptions): {
    app: import("express-serve-static-core").Express;
    useAppMiddleware: () => void;
    useStaticMiddleware: () => void;
    useExceptionMiddleware: () => void;
};
