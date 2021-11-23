class LocalCache {
  getCache(key) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  setCache(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  deletCache(key) {
    window.localStorage.removeItem(key)
  }
  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()