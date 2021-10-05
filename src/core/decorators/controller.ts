import 'reflect-metadata'
import { Injector } from './injector';
import { META_KEYS } from '../constants';
import { ControllerOptions, RouteDefinition } from '../types'

export function Controller ({ prefix = ''}: ControllerOptions): ClassDecorator {
  return (target: Function) => {
    prefix = prefix ? prefix : target.name
    
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

export function resolvePrefix (object: any, defaultValue: string): string {
  let prefix: string = Reflect.getMetadata(META_KEYS.PREFIX, object) || defaultValue
  return prefix.startsWith('/api') ? prefix : `/api${prefix}`
}

export function resolveViewHandler (target: any) {
  const instance = Injector.resolve(target)
  const methodName: string = Reflect.getMetadata(META_KEYS.VIEW_HANDLER, target) || ''
  let method: () => Promise<any> = instance[methodName] || function () { return { meta: {}, props: {}}}
  return method.bind(instance)
}

export function resolveRoutes (target: any): Array<RouteDefinition>{
  return Reflect.getMetadata(META_KEYS.ROUTES, target) || []
}