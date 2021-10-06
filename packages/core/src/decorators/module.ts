import META_KEYS from "jshero-constants"
import { ROOT_MODULE } from "../constants"
import { inMemoryDataBase } from "../container/InMemoryDataBase"
import { AppModule, BaseModule } from "../types"

export function Module (options: BaseModule): ClassDecorator
export function Module (options: AppModule): ClassDecorator
export function Module (options: any): ClassDecorator {
  return (target) => {
    if ( options.providers && options.providers.length > 0) {
      Reflect.defineMetadata(META_KEYS.APP_MODULE, options.providers, target)
      inMemoryDataBase.provide(ROOT_MODULE, target)
    } else {
    Reflect.defineMetadata(META_KEYS.APP_MODULE, {
      ...options
    }, target)
    }
  } 
}