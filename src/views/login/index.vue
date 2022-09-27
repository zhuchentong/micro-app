<template lang="pug">
.login-container.absolute.inset-0.flex
  .flex-1.flex-center.bg-gray-500.bg-opacity-20
    .data
        img.w-350px(:src="loginIcon" )
        .space-y-4
                .welcome.text-3xl 欢迎使用本系统
                .description.text-14px 小白兔口腔医疗科技集团
  .flex-1.flex-center
    LoginFrom
</template>

<script lang="ts" setup>
import loginIcon from '@/assets/svg/login-icon.svg?url'
import LoginFrom from './components/login-form.vue'
</script>

<style lang="scss" scoped>
.login-container {
  background-color: #293146;
  color: #fff;
}
</style>
