<template lang="pug">
.login-container.absolute.inset-0.flex.overflow-hidden
  .flex-auto.flex-center.bg-gray-500.bg-opacity-20(class='lt-xl:hidden')
    transition-group(appear tag='div' name='left')
      img.w-350px(key='1' :src='loginIcon')
      .space-y-4(key='2')
        .welcome.text-3xl 欢迎使用本系统
        .description.text-14px 小白兔口腔医疗科技集团
  .flex-auto.flex-center
    transition-group(appear tag='div' name='right')
      LoginFrom(key='1')
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

@each $direction in left, right {
  .#{$direction}-enter-active,
  .#{$direction}-leave-active {
    transition: all 0.5s ease;
  }
  .#{$direction}-enter-from,
  .#{$direction}-leave-to {
    opacity: 0;
    @if ($direction == left) {
      transform: translateX(-300px);
    }
    @if ($direction == right) {
      transform: translateX(+300px);
    }
  }
}
</style>
