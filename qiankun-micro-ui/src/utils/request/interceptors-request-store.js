export default class InterceptorsRequestStore {
  isRefreshing = false
  requests = []

  constructor() {
    this.isRefreshing = false
    this.requests = []
  }

  getIsRefreshing() {
    return this.isRefreshing
  }

  setIsRefreshIng(isRefreshing) {
    this.isRefreshing = isRefreshing
  }

  getRequests() {
    return this.requests
  }

  setRequests(requests) {
    this.requests = requests
  }

  static instance

  static getInstance() {
    if (!this.instance) {
      this.instance = new InterceptorsRequestStore()
    }
    return this.instance
  }
}
