import META_KEYS from "jshero-constants";
import { AppModule, RouteDefinition } from "../types";
import { getInjectionsPerRequest, Injector } from "../decorators";
import { cacheManager } from "../cache";

function resolveController (target: Object) {
  const instance = Injector.resolve(target)
  const methodName: string = Reflect.getMetadata(META_KEYS.VIEW_HANDLER, target) || ''
  let handler: (...args: any[]) => Promise<any> = (instance[methodName] || function () { return { meta: {}, props: {}}})
  handler = handler.bind(instance)

  async function fn (req: any, res:any, next: any) {
    const injections = getInjectionsPerRequest({ instance, methodName, req, res, next })
    const cache = cacheManager.get<any>(target, methodName)
    if (cache)
      return cache
    return handler(...injections)
  }
  function resolvePrefix (): string {
    let prefix: string = Reflect.getMetadata(META_KEYS.PREFIX, target) || ''
    return prefix.startsWith('/api') ? prefix : `/api${prefix}`
  }
  function resolveRoutes (): Array<RouteDefinition>{
    return Reflect.getMetadata(META_KEYS.ROUTES, target) || []
  }

  function createApiFn (methodName: string, req: any, res:any, next: any) {
    const instance = Injector.resolve(target)
    const injections = getInjectionsPerRequest({ instance, methodName, req, res, next })
    const cache = cacheManager.get<any>(target, methodName)
    if (cache)
      return async () => cache

    return async () => {
      const result = await instance[methodName](...injections)
      cacheManager.set(methodName, result, target)
      return result
    }
  }
  return {
    instance,
    fn,
    resolveRoutes,
    resolvePrefix,
    createApiFn
  }
}

export function resolveRootModule (bootstrap: object) {
  function getModule <T>(module: Object) {
    return (Reflect.getMetadata(META_KEYS.APP_MODULE, module) || []) as T
  }
  
  const { providers, configureStore } = getModule<{ providers: Function[], configureStore: Function }>(bootstrap)
  
  function getReducers (){
    const reducers: Record<string, any> = {}
    providers.forEach(x => {
      const { reducer, name } = getModule<AppModule>(x)
      reducers[name] = reducer
    })
    return reducers
  }
  
  function getModules () {
    const modules: AppModule[] = []
    providers.forEach(x => {
      modules.push(getModule<AppModule>(x))
    })
    return modules
  }
  return {
    providers,
    modules: getModules(),
    reducers: getReducers(),
    configureStore,
    resolveController
  }
}

