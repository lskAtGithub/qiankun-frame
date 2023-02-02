import service from '@/utils/request/request-service'
import InterceptorsRequestLoadingStore from '@/utils/request/interceptors-request-loading-store'

const createRequestService = (config) => {
  const axiosRequestConfig = config
  const requestLoadingStore = InterceptorsRequestLoadingStore.getInstance()
  requestLoadingStore.setLoading(config.loading || true)
  return service(axiosRequestConfig)
}

export default createRequestService
