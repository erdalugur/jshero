import { AppModule } from "jshero-decorators";
import { RootModule } from "../modules";
import META_KEYS from "jshero-constants";

export function getModule <T>(module: Object) {
  return (Reflect.getMetadata(META_KEYS.APP_MODULE, module) || []) as T
}

export const providers = getModule<Function[]>(RootModule)

export function getReducers (){
  const reducers: Record<string, any> = {}
  providers.forEach(x => {
    const { reducer, name } = getModule<AppModule>(x)
    reducers[name] = reducer
  })
  return reducers
}

export function getModules () {
  const modules: AppModule[] = []
  providers.forEach(x => {
    modules.push(getModule<AppModule>(x))
  })
  return modules
}