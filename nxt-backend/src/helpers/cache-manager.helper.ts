import NodeCache from 'node-cache'

class CacheManagerHelper {
  private cache = new NodeCache()

  public set(key: string, value: any, ttl = 0) {
    return this.cache.set(key, value, ttl)
  }

  public get<T>(key: string) {
    return this.cache.get(key) as T
  }

  public delete(key: string) {
    return this.cache.del(key)
  }

  public flushAll() {
    this.cache.flushAll()
  }
}

export default new CacheManagerHelper()
