<template lang="pug">
div(@click='push') page1
</template>

<script lang="ts" setup>
import { useStore } from '@/store'

const router = useRouter()
const store = useStore()
function push() {
  console.log(store.user.$state)
}
</script>

<style lang="scss" scoped></style>
