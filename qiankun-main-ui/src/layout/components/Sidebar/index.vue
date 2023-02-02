<template>
  <div class="has-logo">
    <logo :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      result: null
    }
  },
  computed: {
    ...mapGetters(['permission_routes', 'sidebar']),
    activeMenu() {
      this.$store.dispatch('microApps/generateMicroAppStateRoute')
      const route = this.$route
      const { meta, path } = route
      const routes = this.$store.getters.permission_routes
      // eslint-disable-next-line
      this.result = null
      this.onMatchedRoute(path, routes)
      if (this.result && this.result.meta && this.result.meta.activeMenu) {
        return this.result.meta.activeMenu
      }
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    onMatchedRoute(path, routes) {
      for (let index = routes.length - 1; index >= 0; index--) {
        const element = routes[index]
        if (element.children && element.children.length) {
          this.onMatchedRoute(path, element.children)
        }
        if (element.path === path) {
          this.result = element
          return
        }
      }
    }
  }
}
</script>
