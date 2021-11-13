import { CombinedAppModule, RouteDefinition, MiddlewareFn } from "../types";
import { WithOutputCache } from "../cache";
declare function resolveController(target: Object): {
    fn: {
        <T>(req: any, res: any, next: any): Promise<T>;
        <T_1>(req: any, res: any, next: any, method?: string): Promise<T_1>;
    };
    resolveRoutes: () => Array<RouteDefinition>;
    resolvePrefix: () => string;
    withOutputCache: typeof WithOutputCache;
    resolveMiddleware: () => MiddlewareFn[];
    injectedMiddleware: {
        (propertyKey: string): MiddlewareFn[];
        (viewhandler?: boolean): MiddlewareFn[];
    };
};
export declare function resolveRootModule(bootstrap: object): {
    providers: Function[];
    modules: CombinedAppModule[];
    resolveController: typeof resolveController;
};
export {};
