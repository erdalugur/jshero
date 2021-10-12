import META_KEYS from "jshero-constants";
import { AppModule, RouteDefinition } from "../types";
import { getInjectionsPerRequest, Injector } from "../decorators";
import { cacheManager, WithOutputCache } from "../cache";


function resolveController (target: Object) {
  
  function createFn(methodName: string, req: any, res: any, next: any) {
    const instance = Injector.resolve(target)
    const injections = getInjectionsPerRequest({ instance, methodName, req, res, next })
    const fn = instance[methodName].bind(instance, ...injections)
    const cache = cacheManager.get<any>(target, methodName)
    if (cache)
      return async () => cache

    return async () => {
      const result = await fn()
      cacheManager.set(methodName, result, target)
      return result
    }
  }
  async function fn (req: any, res:any, next: any): Promise<any>
  async function fn (req: any, res:any, next: any, method?: string): Promise<any>
  async function fn (req: any, res:any, next: any, method: string = ''): Promise<any> {
    const methodName: string =  method || Reflect.getMetadata(META_KEYS.VIEW_HANDLER, target) || ''
    return createFn(methodName, req, res, next)()
  }
  function resolvePrefix (): string {
    let prefix: string = Reflect.getMetadata(META_KEYS.PREFIX, target) || ''
    return prefix.startsWith('/api') ? prefix : `/api${prefix}`
  }
  function resolveRoutes (): Array<RouteDefinition>{
    return Reflect.getMetadata(META_KEYS.ROUTES, target) || []
  }
  return {
    fn,
    resolveRoutes,
    resolvePrefix,
    withOutputCache: WithOutputCache
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

