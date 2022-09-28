<template lang="pug">
main
  el-container.w-full.h-full
    el-aside.relative(:width='`${appConfig.workspace.sideWidth}px`')
      Side
    el-container
      el-header.relative Header
      el-main.relative
        Content
      el-footer.relative Footer
</template>

<script lang="ts" setup>
import Content from './components/workspace/content.vue'
import Side from './components/workspace/side.vue'
import { appConfig } from '@/config/app.config'
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  height: 100%;
}
</style>
