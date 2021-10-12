import NodeCache from 'node-cache'
export const memoryCache = new NodeCache()

const CACHE = 'CACHE'
interface CacheDefinition { 
  propertyKey: string, 
  cacheKey: string,
  ttl: number
}
/**
 * 
 * @param cacheKey
 * @param ttl seconds, defaults 5
 * @returns 
 */
export function Cache(cacheKey: string, ttl: number = 5): MethodDecorator {
  return (target, propertyKey) => {
    const caches: CacheDefinition[] = Reflect.getMetadata(CACHE, target.constructor) || []
    caches.push({ 
      propertyKey: propertyKey as string, 
      cacheKey,
      ttl
    })
    Reflect.defineMetadata(CACHE, caches, target.constructor)
  }
}

export const cacheManager = {
  getCacheInfo (target: Object, propertyKey: string) {
    const caches: CacheDefinition[] = Reflect.getMetadata(CACHE, target) || []
    return caches.find(x => x.propertyKey === propertyKey)
  },
  get<T> (target:Object, propertyKey: string): T | undefined {
    const cacheInfo = cacheManager.getCacheInfo(target, propertyKey)
    if (cacheInfo && memoryCache.has(cacheInfo.cacheKey))
      return memoryCache.get(cacheInfo.cacheKey) as T
    return undefined
  },
  set (key: string, value: any, target: Object) {
    const cacheInfo = cacheManager.getCacheInfo(target, key)
    if (cacheInfo) {
      memoryCache.set(cacheInfo.cacheKey, value, cacheInfo.ttl)    
    }
  }
}

export async function WithOutputCache(cacheKey: string, ttl: number, fn: () => Promise<any>) {
  if(memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey)
  }
  const result = await fn()
  memoryCache.set(cacheKey, result, ttl)
  return result
}