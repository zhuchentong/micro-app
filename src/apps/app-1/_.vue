<template lang="pug">
div {{ path }}
</template>

<script setup lang="ts">
const route = useRoute()

const path = computed(() => route.params.all)
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<route lang="yaml">
name: app-1
meta:
  layout: workspace
</route>
