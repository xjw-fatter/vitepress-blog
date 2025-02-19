/**
 * 导航数据类型的定义
 * 用于表示导航结构，包括导航标题和导航项列表
 */
export type NavData = {
  title: string // 导航的标题
  items: NavDataItem[] // 导航项的列表
}

/**
 * 导航数据项类型的定义
 * 用于表示单个导航项的详细信息，包括图标、标题、描述和链接
 */
export type NavDataItem = {
  icon: string | { svg: string } // 导航项的图标，可以是字符串类型的图标名称或包含svg内容的对象
  title: string // 导航项的标题
  desc?: string // 导航项的描述，为可选字段
  link: string // 导航项的链接地址
}
