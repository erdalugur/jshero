import 'reflect-metadata'
import META_KEYS from 'jshero-constants';
import { ControllerOptions } from '../types'

export function Controller (options?: ControllerOptions): ClassDecorator {
  return (target: Function) => {    
    const prefix = options && options.prefix || ''
    Reflect.defineMetadata(META_KEYS.PREFIX, prefix, target);
    
    if (! Reflect.hasMetadata(META_KEYS.ROUTES, target)) {
      Reflect.defineMetadata(META_KEYS.ROUTES, [], target);
    }
  };
};

export function ViewHandler (): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    if (!Reflect.hasMetadata(META_KEYS.ROUTES, target.constructor)) {
      Reflect.defineMetadata(META_KEYS.ROUTES, [], target.constructor);
    }
    
    Reflect.defineMetadata(META_KEYS.VIEW_HANDLER, propertyKey, target.constructor)
  };
}