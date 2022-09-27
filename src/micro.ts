import wujie from 'wujie-vue3'

const { setupApp, preloadApp } = wujie

/**
 * 配置wujie
 */
export default async function () {
  const apps = Object.values(
    (await import.meta.glob('./apps/**/index.ts', {
      eager: true,
    })) as Record<string, any>,
  )

  apps.forEach(({ app }) => {
    setupApp({
      name: app.name,
      url: app.url,
      exec: true,
    })
  })

  apps.forEach(({ app }) => {
    preloadApp({
      name: app.name,
      url: app.url,
    })
  })

  return apps
}
