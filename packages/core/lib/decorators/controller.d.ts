import 'reflect-metadata';
import { ControllerOptions, MiddlewareFn } from '../types';
export declare function Controller(options?: ControllerOptions): ClassDecorator;
export declare function ViewHandler(): MethodDecorator;
export declare function InjectMiddleware(middleware: MiddlewareFn[]): (target: any, propertyKey: any, descriptor: any) => void;
