import { CreateAppOptions } from '../types';
declare global {
    interface Window {
        __INITIAL_STATE__: any;
    }
}
export declare function createBrowserApp(options: CreateAppOptions): void;
