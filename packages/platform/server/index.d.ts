import { CreateAppOptions } from '../types';
export declare function createServer(options: CreateAppOptions): Promise<{
    useMiddeware: () => import("express-serve-static-core").Router;
}>;
