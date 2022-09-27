export interface AppConfig {
  /**
   * 应用名称
   */
  app: string
  /**
   * 网站标题
   */
  title: string
  /**
   * 网站Logo
   */
  logo: string
  /**
   * 网络相关配置
   */
  http: HttpConfig
  /**
   * 布局配置
   */
  workspace: WorkspaceConfig
  /**
   * 主题配置
   */
  theme: ThemeConfig
}

interface HttpConfig {
  /**
   * 网关地址配置
   */
  gateway: string
  /**
   * 超时时间配置(毫秒)
   */
  timeout?: number
}

export interface WorkspaceConfig {
  /**
   * 顶部是否固定
   */
  headerFixed: boolean
  /**
   * 侧边栏是否固定
   */
  sideFixed: boolean
  /**
   * 内容区域宽度
   * 固定宽度: ...px
   * 流式布局: auto
   */
  contentWidth: number | 'auto'
  /**
   * side宽度
   */
  sideWidth: number
  /**
   * side折叠状态宽度
   */
  sideCollapsedWidth: number
  /**
   * side模式
   */
  sideMode: 'pop' | 'vertical'
  /**
   * header高度
   */
  headerHeight: number
}

interface themeConfig {
  /**
   * 主题风格
   * dark - 深色
   * light - 浅色
   * auto - 自动
   */
  style: 'dark' | 'light' | 'auto`'
}
