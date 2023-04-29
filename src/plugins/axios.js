import axios from 'axios'
import { message } from 'ant-design-vue'

const baseURL = {
  fastAPI: process.env.NODE_ENV === 'production' ? 'http://47.110.58.84:6324/' : 'http://47.110.58.84:6324/',
  GoFrame: process.env.NODE_ENV === 'production' ? 'http://172.29.4.32:8080/' : 'http://localhost:8088/api/'
}

const config = {
  timeout: 20 * 1000
}

const globalAxios = axios.create(config)

globalAxios.interceptors.request.use(config => {
  if (config.url.startsWith('/kg')) {
    config.url = config.url.slice(3) // 去除'/kg'前缀
    config.baseURL = baseURL.fastAPI
  } else {
    config.baseURL = baseURL.GoFrame
  }
  return config
})

// 响应拦截器: 错误信息处理
globalAxios.interceptors.response.use((res) => {
  return res
}, (err) => {
  message.error('网络错误', 2)
  return Promise.reject(err)
})

export default globalAxios
