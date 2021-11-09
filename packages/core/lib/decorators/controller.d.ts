import 'reflect-metadata';
import { ControllerOptions, MiddlewareFn } from '../types';
export declare function Controller(options?: ControllerOptions): ClassDecorator;
export declare function ViewHandler(): MethodDecorator;
export declare function injectMiddleware(target: Object): MiddlewareFn[];
