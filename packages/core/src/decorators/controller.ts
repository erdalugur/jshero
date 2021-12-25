import 'reflect-metadata'
import META_KEYS from 'jshero-constants';
import { ControllerOptions, MiddlewareFn, InjectMiddlewareType } from '../types'
import { MIDDLEWARE, INJECT_MIDDLEWARE } from '../constants'

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

export function Middleware(middleware: MiddlewareFn[] = []) {
  return (target, propertyKey = '') => {
    if (propertyKey === '') {
      Reflect.defineMetadata(MIDDLEWARE, middleware, target)
      return
    }

    const middlewares: InjectMiddlewareType[] = Reflect.getMetadata(INJECT_MIDDLEWARE, target.constructor) || []
    middlewares.push({
      propertyKey: propertyKey.toString(),
      middlewares: middleware
    })
    Reflect.defineMetadata(INJECT_MIDDLEWARE, middlewares, target.constructor)
  };
}