import META_KEYS from "jshero-constants";
import { CombinedAppModule, RouteDefinition, MiddlewareFn, InjectMiddlewareType } from "../types";
import { getInjectionsPerRequest, Injector } from "../decorators";
import { cacheManager, WithOutputCache } from "../cache";
import { InternalServerErrorException } from "../exceptions";
import { MIDDLEWARE, INJECT_MIDDLEWARE } from "../constants";

function resolveController (target: Object) {
  
  function createFn<T>(methodName: string, req: any, res: any, next: any) {
    const instance = Injector.resolve(target)
    const injections = getInjectionsPerRequest({ instance, methodName, req, res, next })
    const fn = instance[methodName].bind(instance, ...injections)
    const cache = cacheManager.get<any>(target, methodName)
    if (cache)
      return async () => cache as T

    return async () => {
      const result = await fn() 
      if (cache)
        cacheManager.set(methodName, result, target)
        
      return result as T
    }
  }
  async function fn <T>(req: any, res:any, next: any): Promise<T>
  async function fn <T>(req: any, res:any, next: any, method?: string): Promise<T>
  async function fn <T>(req: any, res:any, next: any, method: string = ''): Promise<T> {
    const methodName: string =  method || Reflect.getMetadata(META_KEYS.VIEW_HANDLER, target) || ''
    if (methodName === '') {
      throw new InternalServerErrorException('View handler not found')
    }
    const fn = createFn<T>(methodName, req, res, next)
    return fn()
  }
  function resolvePrefix (): string {
    let prefix: string = Reflect.getMetadata(META_KEYS.PREFIX, target) || ''
    return prefix.startsWith('/api') ? prefix : `/api${prefix}`
  }
  function resolveRoutes (): Array<RouteDefinition>{
    return Reflect.getMetadata(META_KEYS.ROUTES, target) || []
  }
  function resolveMiddleware() {
    if (!Reflect.hasMetadata(MIDDLEWARE, target)) {
      return []
    }
    return (Reflect.getMetadata(MIDDLEWARE, target) || []) as MiddlewareFn []
  }
  function injectedMiddleware(propertyKey: string): MiddlewareFn[]
  function injectedMiddleware(viewhandler?: boolean): MiddlewareFn[]
  function injectedMiddleware(param: boolean | string): MiddlewareFn[] {
    let propertyKey: string = ''
    if (typeof(param) === 'boolean') {
      propertyKey = Reflect.getMetadata(META_KEYS.VIEW_HANDLER, target)
    } else {
      propertyKey = param
    }
    const middlewares = (Reflect.getMetadata(INJECT_MIDDLEWARE, target) || []) as InjectMiddlewareType[]
    const record = middlewares.find(x => x.propertyKey === propertyKey)
    let response = []
    if (record) {
      response = record.middlewares
    }
    return response
  }
  
  return {
    fn,
    resolveRoutes,
    resolvePrefix,
    withOutputCache: WithOutputCache,
    resolveMiddleware,
    injectedMiddleware
  }
}

export function resolveRootModule (bootstrap: object) {
  function getModule <T>(module: Object) {
    return (Reflect.getMetadata(META_KEYS.APP_MODULE, module) || []) as T
  }
  
  const { providers } = getModule<{ providers: Function[] }>(bootstrap)

  function getModules () {
    const modules: CombinedAppModule[] = []
    providers.forEach(x => {
      const module = getModule<CombinedAppModule>(x)
      module.cacheKey = `__${module.path}__${module.name}__`
      modules.push(module)
    })
    return modules
  }
  return {
    providers,
    modules: getModules(),
    resolveController
  }
}