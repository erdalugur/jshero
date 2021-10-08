import { AppModule } from "../types";
export declare function resolveBootstrap(bootstrap: object): {
    providers: Function[];
    modules: AppModule[];
    reducers: Record<string, any>;
    configureStore: Function;
};
