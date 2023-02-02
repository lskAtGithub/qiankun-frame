import axios from 'axios'
import { getToken } from '@/utils/auth'
import {
  interceptorsResponse,
  interceptorsResponseError
} from '@/utils/request/interceptors-response'
import { hideLoading, showLoading } from '@/utils/loading'
import InterceptorsRequestLoadingStore from '@/utils/request/interceptors-request-loading-store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    const requestLoadingStore = InterceptorsRequestLoadingStore.getInstance()
    if (requestLoadingStore.getLoading()) {
      showLoading()
    }
    if (getToken()) {
      config.headers['Ft-Token'] = getToken()
    }
    return config
  },
  (error) => {
    hideLoading()
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    hideLoading()
    return interceptorsResponse(response)
  },
  (error) => {
    hideLoading()
    return interceptorsResponseError(error)
  }
)

export default service
