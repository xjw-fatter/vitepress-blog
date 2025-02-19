/**
 * 事件监听器对象，包含处理复制事件和移除特定事件监听的方法
 */
export const listener = {
  /**
   * 处理复制事件的方法
   * 当用户尝试复制文本时，会触发copy事件，并执行自定义的复制逻辑
   */
  copy: () => {
    const handleCopy = (event: ClipboardEvent) => {
      try {
        // 获取用户选中的文本
        const selectedText = (window.getSelection() as Selection).toString()
        // 构造新的复制文本，添加自定义的尾部信息
        const newText = `${selectedText}\n————————————————\n复制什么呢，小心锤你噢👊👊👊`
        // 将新的文本数据设置到剪贴板
        if (event.clipboardData) {
          event.clipboardData.setData('text/plain', newText)
        } else {
          console.error('Clipboard data is not available')
        }
        // 阻止默认的复制行为
        event.preventDefault()
      } catch (error) {
        console.error('Error in copy event handler:', error)
      }
    }

    // 监听copy事件
    document.addEventListener('copy', handleCopy)

    // 保存事件监听器回调函数，以便后续移除
    listener.handleCopy = handleCopy
  },

  /**
   * 移除特定事件监听的方法
   * @param name 要移除的事件名称，如果未提供则不执行任何操作
   */
  remove: (name: string) => {
    // 检查是否提供了事件名称，如果没有则不进行移除操作
    if (!name) return

    // 检查事件名称是否有效
    if (name !== 'copy') {
      console.warn(`Invalid event name: ${name}`)
      return
    }

    // 移除指定的事件监听
    if (listener.handleCopy) {
      document.removeEventListener(name, listener.handleCopy)
      console.log(`移除${name}完成`)
    }
  },

  // 用于存储事件监听器回调函数
  handleCopy: null as ((event: ClipboardEvent) => void) | null
}
