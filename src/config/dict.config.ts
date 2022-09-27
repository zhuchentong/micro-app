import { BannerType } from './enum.config'

export const BannerTypeDict = new Map<BannerType | string, string>([
  [BannerType.Url, '网页链接'],
  [BannerType.Page, '页面链接'],
  [BannerType.Product, '产品链接'],
])
