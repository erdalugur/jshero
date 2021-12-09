import { RootModuleType, CombinedAppModule } from '../types';
interface RenderProps {
    data: any;
    modules: CombinedAppModule[];
    module: CombinedAppModule;
    bootstrap: RootModuleType;
}
export declare function renderModule({ module, modules, data, bootstrap }: RenderProps): Promise<string>;
export {};
