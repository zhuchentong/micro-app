<template lang="pug">
main
  el-container
    el-aside(width='200px')
      | Aside
    el-container
      el-header Header
      el-main
        Content
      el-footer Footer
</template>

<script lang="ts" setup>
import Content from './components/workspace/content.vue'
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  height: 100%;
}
</style>
