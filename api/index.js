import axios from 'axios'
import store from '@/store/index'
import router from '@/router'
// 配置基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 给每次请求都拦截下来 加上请求头在放行
axios.interceptors.request.use(config => {
  // 修改配置
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
}, err => {
  // 返回一个必定失败的promise对象
  return Promise.reject(err)
})

// 给每次响应拦截下来 进行检测 判断token是否失效 如果状态码为401则失效
axios.interceptors.response.use(res => res, err => {
  const status = err.response.status

  if (status === 401) {
    // token失效
    store.delUser()
    // 去登录
    router.push('/login')
  }
  return Promise.reject(err)
})
export default axios
