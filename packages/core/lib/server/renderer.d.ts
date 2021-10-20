import './polyfill';
import { AppModule } from 'src';
interface Renderer {
    url: string;
    store: any;
    modules: AppModule[];
}
export declare function createRenderer({ url, store, modules }: Renderer): {
    render(): string;
};
export {};
