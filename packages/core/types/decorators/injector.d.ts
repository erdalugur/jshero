import 'reflect-metadata';
import { InjectPerRequest } from '../types';
export declare const Injector: {
    resolve(target: any): any;
};
export declare function getInjectionsPerRequest({ instance, methodName, next, req, res }: InjectPerRequest): any[];
