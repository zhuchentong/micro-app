<template lang="pug">
div(@click='push') page1-push

button(@click='pushApp') 333

data-table(
  row-key='id'
  :load-data='loadData'
  :forms='forms'
  :columns='columns')
</template>

<script lang="ts" setup>
import { useNavigate } from '@/shared/hooks/use-navigate'
import type {
  LoadDataParams,
  FormItemsOptions,
  TableColumnsOptions,
} from '@gopowerteam/vue-dynamic-table'

const navigate = useNavigate()

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

/**
 * 加载表格数据
 * @param param0
 * @param param0.update
 */
function loadData({ update }: LoadDataParams) {
  update([{ id: 333 }])
}

/**
 * 表格配置
 * 优先级高于columns form优先级
 * 会覆盖同key配置
 */
const forms: FormItemsOptions = []

/**
 * 表格列配置
 */
const columns: TableColumnsOptions = [
  {
    key: 'id',
    title: '名称',
    form: {
      render: (r) => r.input(),
    },
  },
]
</script>

<style lang="scss" scoped></style>

<route lang="yaml">
name: page1
meta:
  title: 测试页面1
</route>
