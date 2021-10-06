import 'reflect-metadata'
import { inMemoryDataBase } from "./InMemoryDataBase";
import { AppModule } from '../types'
import { ROOT_MODULE } from "../constants";
import META_KEYS from 'jshero-constants'

function getModule <T>(module: Object) {
  return (Reflect.getMetadata(META_KEYS.APP_MODULE, module) || []) as T
}
export class ContainerProvider {
  private readonly providers: Function[]
  private readonly rootObject: Object
  constructor (){
    this.rootObject = inMemoryDataBase.resolve<Object>(ROOT_MODULE)
    this.providers = Reflect.getMetadata(META_KEYS.APP_MODULE, this.rootObject)
  }
  getProviders (){
    return this.providers
  }

  getRootObject (){
    return this.rootObject
  }
  
  reducers (){
    const reducers: Record<string, any> = {}
    this.providers.forEach(x => {
    const { reducer, name } = getModule<AppModule>(x)
    reducers[name] = reducer
    })

    return reducers
  }
  modules (): AppModule[] {
    const modules: AppModule[] = []
    this.providers.forEach(x => {
      modules.push(getModule<AppModule>(x))
    })
    return modules
  }
}