import 'reflect-metadata';
import { ControllerOptions, RouteDefinition } from '../types';
export declare function Controller(options?: ControllerOptions): ClassDecorator;
export declare function ViewHandler(): MethodDecorator;
export declare function resolvePrefix(object: any, defaultValue: string): string;
export declare function resolveViewHandler(target: any): any;
export declare function resolveRoutes(target: any): Array<RouteDefinition>;
