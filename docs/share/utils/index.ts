export * from './listener'
export * from './utils'

// 判断是否为公祭日
function isMemorialDay(date: Date): boolean {
  const memorialDate = new Date(date.getFullYear(), 12, 13) // 12月13日
  return (
    date.getMonth() === memorialDate.getMonth() &&
    date.getDate() === memorialDate.getDate()
  )
}

// 动态应用灰色样式
export function applyGrayscale() {
  const today = new Date()
  if (isMemorialDay(today)) {
    document.documentElement.classList.add('grayscale')
  } else {
    document.documentElement.classList.remove('grayscale')
  }
}
