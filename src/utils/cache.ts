enum CacheType {
  Local,
  Session
}

class Cache {
  storage: Storage

  constructor(type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }

  setCache(key: string, value: any) {
    return this.storage.setItem(key, JSON.stringify(value))
  }

  removeCache(key: string | string[]) {
    if (Array.isArray(key)) {
      for (const item of key) {
        this.storage.removeItem(item)
      }
    } else {
      this.storage.removeItem(key)
    }
  }

  getCache(key: string | string[]) {
    if (typeof key === 'string') {
      const item = this.storage.getItem(key)
      if (item) {
        return JSON.parse(item)
      }
      return
    }

    const items: any = {}
    for (const keyItem of key) {
      const item = this.storage.getItem(keyItem)
      if (item) {
        items[keyItem] = JSON.parse(item)
      }
    }
    return items
  }

  clear() {
    return this.storage.clear()
  }
}

const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)

export { localCache, sessionCache }
