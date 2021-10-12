import { AppModule, RouteDefinition } from "../types";
import { WithOutputCache } from "../cache";
declare function resolveController(target: Object): {
    fn: {
        (req: any, res: any, next: any): Promise<any>;
        (req: any, res: any, next: any, method?: string): Promise<any>;
    };
    resolveRoutes: () => Array<RouteDefinition>;
    resolvePrefix: () => string;
    withOutputCache: typeof WithOutputCache;
};
export declare function resolveRootModule(bootstrap: object): {
    providers: Function[];
    modules: AppModule[];
    reducers: Record<string, any>;
    configureStore: Function;
    resolveController: typeof resolveController;
};
export {};
