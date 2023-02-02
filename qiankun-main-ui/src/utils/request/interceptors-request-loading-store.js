class InterceptorsRequestLoadingStore {
  loading

  constructor() {
    this.loading = false
  }

  getLoading() {
    return this.loading
  }

  setLoading(loading) {
    this.loading = loading
  }

  static instance

  static getInstance() {
    if (!this.instance) {
      this.instance = new InterceptorsRequestLoadingStore()
    }
    return this.instance
  }
}

export default InterceptorsRequestLoadingStore
