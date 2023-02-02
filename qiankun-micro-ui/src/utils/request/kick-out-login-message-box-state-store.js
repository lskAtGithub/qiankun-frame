class KickOutLoginMessageBoxStateStore {
  loaded

  constructor() {
    this.loaded = false
  }

  getLoaded() {
    return this.loaded
  }

  setLoaded(loaded) {
    this.loaded = loaded
  }

   static instance

   static getInstance() {
     if (!this.instance) {
       this.instance = new KickOutLoginMessageBoxStateStore()
     }
     return this.instance
   }
}

export default KickOutLoginMessageBoxStateStore
