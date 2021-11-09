import 'reflect-metadata'
import META_KEYS from 'jshero-constants';
import { ControllerOptions, MiddlewareFn } from '../types'


const MIDDLEWARE = '__MIDDLEWARE__'
export function Controller (options?: ControllerOptions): ClassDecorator {
  return (target: Function) => {    
    const prefix = options && options.prefix || ''
    Reflect.defineMetadata(META_KEYS.PREFIX, prefix, target);
    
    if (! Reflect.hasMetadata(META_KEYS.ROUTES, target)) {
      Reflect.defineMetadata(META_KEYS.ROUTES, [], target);
    }
    const middleware = options && options.middleware || []
    if (middleware.length > 0) {
      Reflect.defineMetadata(MIDDLEWARE, middleware, target)
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

export function injectMiddleware(target: Object) {
  if (!Reflect.hasMetadata(MIDDLEWARE, target)) {
    return []
  }
  return (Reflect.getMetadata(MIDDLEWARE, target) || []) as MiddlewareFn []
}