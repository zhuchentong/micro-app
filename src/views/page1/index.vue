<template lang="pug">
div(@click='push') page1-

button(@click='pushApp') 333{{ store.user.aaa }}
</template>

<script lang="ts" setup>
import { useNavigate } from '@/shared/hooks/use-navigate'
import { useStore } from '@/store'

const navigate = useNavigate()
const store = useStore()

/**
 * 跳转测试
 */
function push() {
  navigate.push('/page2', { query: { a: 1 } })
}
/**
 *
 */
function pushApp() {
  navigate.push('/page1', { query: { a: 1 }, app: 'app-2' })
}
</script>

<style lang="scss" scoped></style>

<route lang="yaml">
name: page1
meta:
  title: 测试页面1
</route>
