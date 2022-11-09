<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ModalProvider } from '@gopowerteam/vue-modal'
</script>

<template>
  <modal-provider>
    <RouterView />
  </modal-provider>
</template>

<style scoped></style>
