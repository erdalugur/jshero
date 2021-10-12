import NodeCache from 'node-cache';
export declare const memoryCache: NodeCache;
interface CacheDefinition {
    propertyKey: string;
    cacheKey: string;
    ttl: number;
}
/**
 *
 * @param cacheKey
 * @param ttl seconds, defaults 5
 * @returns
 */
export declare function Cache(cacheKey: string, ttl?: number): MethodDecorator;
export declare const cacheManager: {
    getCacheInfo(target: Object, propertyKey: string): CacheDefinition;
    get<T>(target: Object, propertyKey: string): T;
    set(key: string, value: any, target: Object): void;
};
export {};
