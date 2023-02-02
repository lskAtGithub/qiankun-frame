<template>
  <div>
    <el-button type="primary" @click="handleTo">click to demo detail</el-button>
  </div>
</template>

<script>
export default {
  name: 'DemoList',
  methods: {
    handleTo() {
      this.$router.push('/demo/demopage/detail')
    }
  }
}
</script>

<style scoped lang="scss"></style>
