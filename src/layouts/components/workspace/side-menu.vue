<template lang="pug">
section
  el-menu(
    router
    mode='vertical'
    background-color='#001529'
    text-color='#fff'
    :collapse='store.menu.collapsed')
    el-sub-menu(
      v-for='{ app, menus } in store.app.services'
      :key='app.name'
      :index='app.name')
      template(#title) {{ app.title }}
      el-menu-item(
        v-for='menu in menus'
        :key='menu.path'
        :index='`/${app.name}/${menu.path}`')
        template(#title) {{ menu.title }}
</template>

<script lang="ts" setup>
import { useStore } from '@/store'

const store = useStore()
</script>

<style lang="scss" scoped>
section {
  & :deep(.el-menu) {
    border-right: none;
  }
}
</style>
