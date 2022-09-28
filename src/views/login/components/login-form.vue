<template lang="pug">
.form-container.w-400px.border.border-gray-500.p-20px.rounded
  .title.text-center.text-2xl 用户登录
  el-form(:model='formModel' label-width='120px' label-position='top')
    el-form-item(label='用户名')
      el-input(v-model='formModel.username')
    el-form-item(label='密码')
      el-input(v-model='formModel.password' type='password')
    el-form-item
      el-checkbox 记住我
    el-form-item
      el-button.w-full(type='primary' @click='onLogin') 登录
</template>

<script lang="ts" setup>
const router = useRouter()
const formModel = $ref({
  username: '',
  password: '',
})

function onLogin() {
  router.push('/app-1/page1')
}
</script>
