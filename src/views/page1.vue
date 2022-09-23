<template>
  <div>111</div>
  <div v-for="service in appStore.services" :key="service.name">
    {{ service.name }}
  </div>
  <div>222</div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';

const appStore = useStore((store) => store.app);
</script>
