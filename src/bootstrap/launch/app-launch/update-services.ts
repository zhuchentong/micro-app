import { useStore } from '@/store'

export const updateServices = () => {
  const store = useStore()

  // 获取应用
  const services = Object.values(
    import.meta.glob<true, string, AppServiceConfig>('@/apps/**/index.ts', {
      eager: true,
    }),
  )

  store.app.updateServices(services)
}
