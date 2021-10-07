import META_KEYS from "jshero-constants";
import { AppModule } from "../types";

export function resolveBootstrap (bootstrap: object) {
  function getModule <T>(module: Object) {
    return (Reflect.getMetadata(META_KEYS.APP_MODULE, module) || []) as T
  }
  
  const providers = getModule<Function[]>(bootstrap)
  
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
    reducers: getReducers()
  }
}