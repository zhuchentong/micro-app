import type { App } from 'vue'
import httpSetup from './http.setup'
import piniaSetup from './pinia.setup'

export default async (app: App<Element>) => {
  await piniaSetup(app)
  await httpSetup()
}
