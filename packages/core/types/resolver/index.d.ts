import { AppModule, RouteDefinition } from "../types";
declare function resolveController(target: Object): {
    instance: any;
    fn: (req: any, res: any, next: any) => Promise<any>;
    resolveRoutes: () => Array<RouteDefinition>;
    resolvePrefix: () => string;
    createApiFn: (methodName: string, req: any, res: any, next: any) => () => Promise<any>;
};
export declare function resolveRootModule(bootstrap: object): {
    providers: Function[];
    modules: AppModule[];
    reducers: Record<string, any>;
    configureStore: Function;
    resolveController: typeof resolveController;
};
export {};
