<template lang="pug">
div(@click='push') page1
</template>

<script lang="ts" setup>
const router = useRouter()
function push() {
  router.push('/page2')
}
</script>

<style lang="scss" scoped></style>
