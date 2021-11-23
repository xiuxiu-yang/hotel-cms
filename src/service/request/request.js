import axios from "axios"
import { useRouter } from "vue-router"
import { ElLoading } from 'element-plus'
class ctRequest {
  instance = null
  interceptors = null
  showLoading = false
  loading = null
  constructor(config) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ? config.showLoading : false
    this.interceptors = config.interceptors
    this.instance.interceptors.request.use(
      this.interceptors.requestInterceptor, null
    )

    this.instance.interceptors.response.use(
      this.interceptors.responceInterceptor, null
    )

    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据......',
            background: 'rgba(0, 0, 0, 0.8)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        if (this.loading) {
          this.loading.close()
        }
        if (res.code === '444') {
          const router = useRouter()
          router.push('login')
        }
        const data = res.data
        if (data) {
          return data
        }
      },
      (err) => {
        return err
      }
    )
  }

  request(config) {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (config.showloading === false) {
        this.showloading = false
      }
      this.instance.request(config).then((res) => {
        if (config.interceptors?.responceInterceptor) {
          res = config.interceptors.responceInterceptor(res)
        }
        // 不影响下个请求
        this.showLoading = true
        resolve(res)
        return res
      })
        .catch((err) => {
          this.showLoading = true
          reject(err)
          return err
        })
    })
  }

  get(config) {
    return this.request({ ...config, method: 'get' })
  }
  post(config) {
    return this.request({ ...config, method: 'post' })
  }
  delete(config) {
    return this.request({ ...config, method: 'delete' })
  }
  patch(config) {
    return this.request({ ...config, method: 'patch' })
  }
}

export default ctRequest