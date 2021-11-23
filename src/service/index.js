import ctRequest from "./request/request";


const BASE_URL = '/api'
import LocalCache from '@/utils/LocalCache'
export default new ctRequest({
  baseURL: BASE_URL,
  showLoading: true,
  interceptors: {
    requestInterceptor(config) {
      // 携带token拦截
      const token = LocalCache.getCache('token')
      if (token) {
        config.headers.token = `${token}`
      }
      return config
    },
    responceInterceptor(config) {
      return config
    }
  }
})