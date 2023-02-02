<template>
  <layout-micro-app v-if="isMicroApp" />
  <layout-single-app v-else />
</template>

<script>
import MicroAppUtils from '@/utils/micro-app-utils'
import LayoutMicroApp from '@/layout/layout-micro-app'
import LayoutSingleApp from '@/layout/layout-single-app'

export default {
  name: 'Layout',
  components: { LayoutSingleApp, LayoutMicroApp },
  computed: {
    isMicroApp() {
      return MicroAppUtils.isByQianKun()
    }
  }
}
</script>
