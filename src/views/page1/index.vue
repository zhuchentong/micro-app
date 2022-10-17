<template lang="pug">
div(@click='push') page1
</template>

<script lang="ts" setup>
// import { useStore } from '@/store'

// const router = useRouter()
// const store = useStore()

/**
 * 跳转测试
 */
function push() {
  window.$wujie?.bus.$emit('router:push', {
    app: 'app-1',
    path: '/page2',
    query: { a: 1 },
  })
}
</script>

<style lang="scss" scoped></style>
