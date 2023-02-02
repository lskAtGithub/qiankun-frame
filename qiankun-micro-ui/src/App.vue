<template>
  <div :id="appId" class="micro-app-container">
    <router-view />
  </div>
</template>

<script>
import appConfig from '@/config/micro/appConfig'
export default {
  name: 'App',
  data() {
    return {
      appId: ''
    }
  },
  mounted() {
    this.appId = appConfig.CONTAINER_ID
  }
}
</script>
