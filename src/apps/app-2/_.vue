<template>
  <WujieVue
    width="100%"
    height="100%"
    :sync="true"
    :name="app.name"
    :url="url"></WujieVue>
</template>

<script setup lang="ts">
import { app } from '.'

const route = useRoute()
const url = `${app.url}/${route.params.all}`
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<route lang="yaml">
meta:
  layout: workspace
</route>
