# UnoCSS 使用示例

## UnoCSS 类名规则

### 间距和布局

| UnoCSS 类名 | CSS 转换结果 | 说明 |
| --- | --- | --- |
| `p-4` | `padding: 1rem` | 四周内边距 |
| `px-4` | `padding-left: 1rem; padding-right: 1rem` | 水平内边距 |
| `py-4` | `padding-top: 1rem; padding-bottom: 1rem` | 垂直内边距 |
| `m-4` | `margin: 1rem` | 四周外边距 |
| `mx-4` | `margin-left: 1rem; margin-right: 1rem` | 水平外边距 |
| `my-4` | `margin-top: 1rem; margin-bottom: 1rem` | 垂直外边距 |
| `space-x-4` | `margin-left: 1rem` (子元素) | 水平间距 |
| `space-y-4` | `margin-top: 1rem` (子元素) | 垂直间距 |

### 像素单位

| UnoCSS 类名 | CSS 转换结果 | 说明 |
| --- | --- | --- |
| `w-1px` | `width: 1px` | 1像素宽度 |
| `h-2px` | `height: 2px` | 2像素高度 |
| `m-[10px]` | `margin: 10px` | 10像素外边距（方括号语法） |
| `p-[20px]` | `padding: 20px` | 20像素内边距（方括号语法） |
| `text-[16px]` | `font-size: 16px` | 16像素字体大小（方括号语法） |
| `leading-[24px]` | `line-height: 24px` | 24像素行高（方括号语法） |
| `rounded-[4px]` | `border-radius: 4px` | 4像素圆角（方括号语法） |
| `border-[1px]` | `border-width: 1px` | 1像素边框（方括号语法） |

### 尺寸

| UnoCSS 类名 | CSS 转换结果 | 说明 |
| --- | --- | --- |
| `w-4` | `width: 1rem` | 宽度 |
| `h-4` | `height: 1rem` | 高度 |
| `min-w-4` | `min-width: 1rem` | 最小宽度 |
| `max-w-4` | `max-width: 1rem` | 最大宽度 |
| `w-full` | `width: 100%` | 全宽 |
| `h-screen` | `height: 100vh` | 视口高度 |

### 颜色

| UnoCSS 类名 | CSS 转换结果 | 说明 |
| --- | --- | --- |
| `text-blue-500` | `color: rgb(59, 130, 246)` | 文本颜色 |
| `bg-blue-500` | `background-color: rgb(59, 130, 246)` | 背景颜色 |
| `border-blue-500` | `border-color: rgb(59, 130, 246)` | 边框颜色 |
| `text-opacity-50` | `--un-text-opacity: 0.5` | 文本透明度 |
| `bg-opacity-50` | `--un-bg-opacity: 0.5` | 背景透明度 |

### 字体和文本

| UnoCSS 类名 | CSS 转换结果 | 说明 |
| --- | --- | --- |
| `text-sm` | `font-size: 0.875rem; line-height: 1.25rem` | 字体大小 |
| `font-bold` | `font-weight: 700` | 字体粗细 |
| `text-center` | `text-align: center` | 文本对齐 |
| `leading-6` | `line-height: 1.5rem` | 行高 |
| `tracking-wide` | `letter-spacing: 0.025em` | 字间距 |

### 响应式设计

| UnoCSS 类名 | 应用条件 | 说明 |
| --- | --- | --- |
| `sm:text-lg` | `@media (min-width: 640px)` | 小屏幕 |
| `md:text-lg` | `@media (min-width: 768px)` | 中等屏幕 |
| `lg:text-lg` | `@media (min-width: 1024px)` | 大屏幕 |
| `xl:text-lg` | `@media (min-width: 1280px)` | 超大屏幕 |
| `2xl:text-lg` | `@media (min-width: 1536px)` | 2倍超大屏幕 |

### 伪类和状态

| UnoCSS 类名 | CSS 转换结果 | 说明 |
| --- | --- | --- |
| `hover:bg-blue-600` | `:hover { background-color: rgb(37, 99, 235) }` | 悬停状态 |
| `focus:outline-none` | `:focus { outline: none }` | 聚焦状态 |
| `active:scale-95` | `:active { transform: scale(0.95) }` | 激活状态 |
| `disabled:opacity-50` | `:disabled { opacity: 0.5 }` | 禁用状态 |
| `group-hover:text-blue-500` | `.group:hover & { color: rgb(59, 130, 246) }` | 组悬停 |

### 动画和过渡

| UnoCSS 类名 | CSS 转换结果 | 说明 |
| --- | --- | --- |
| `transition-all` | `transition-property: all` | 过渡属性 |
| `duration-200` | `transition-duration: 200ms` | 过渡时长 |
| `ease-in-out` | `transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)` | 过渡曲线 |
| `animate-spin` | `@keyframes spin { ... }` | 旋转动画 |
| `animate-pulse` | `@keyframes pulse { ... }` | 脉冲动画 |

## 基础样式

:::demo

```vue
<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">文本样式</h2>
    <p class="text-blue-500 hover:text-blue-700 transition-colors">
      这是一个带有颜色和悬停效果的文本
    </p>
    <p class="text-lg font-semibold mt-2">这是一个大号加粗的文本</p>
    <p class="italic text-gray-600 mt-2">这是一个斜体灰色文本</p>

    <h2 class="text-2xl font-bold mt-8px mb-4">按钮样式</h2>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
      主要按钮
    </button>
    <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2">
      次要按钮
    </button>
    <button class="border-solid border-1 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded mr-2">
      边框按钮
    </button>
		<button class="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
			渐变按钮
		</button>

    <div class="flex flex-wrap gap-4 mt-8px">
      <button class="group relative px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white font-medium overflow-hidden hover:shadow-lg transition-shadow">
        <span class="relative z-10">悬停特效按钮</span>
        <div class="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left mix-blend-overlay"></div>
      </button>

      <button class="relative px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg text-white font-medium overflow-hidden hover:shadow-lg transition-all hover:translate-y-[-2px]">
        <span class="relative z-10 flex items-center">
          <span>动态按钮</span>
          <svg class="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </span>
      </button>

      <button class="group relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-medium overflow-hidden hover:shadow-lg transition-all hover:scale-105">
        <span class="relative z-10">缩放按钮</span>
        <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
      </button>
    </div>

    <h2 class="text-2xl font-bold mt-8 mb-4">卡片样式</h2>
    <div class="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
      <h3 class="text-xl font-bold mb-2">卡片标题</h3>
      <p class="text-gray-600">这是一个带有阴影和悬停效果的卡片示例</p>
    </div>
  </div>
</template>
```

:::

## 布局示例

:::demo

```vue
<template>
  <div class="p-4">
    <div class="flex space-x-4 mb-4">
      <div class="flex-1 bg-blue-100 p-4 rounded">
        Flex 项目 1
      </div>
      <div class="flex-1 bg-blue-200 p-4 rounded">
        Flex 项目 2
      </div>
      <div class="flex-1 bg-blue-300 p-4 rounded">
        Flex 项目 3
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4 mb-4">
      <div class="bg-green-100 p-4 rounded">
        Grid 项目 1
      </div>
      <div class="bg-green-200 p-4 rounded">
        Grid 项目 2
      </div>
      <div class="bg-green-300 p-4 rounded">
        Grid 项目 3
      </div>
    </div>

    <div class="flex items-center justify-center space-x-4 bg-gray-100 p-4 rounded">
      <div class="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center">
        居中
      </div>
      <div class="w-16 h-16 bg-purple-300 rounded-full flex items-center justify-center">
        对齐
      </div>
    </div>
  </div>
</template>
```

:::

## 响应式设计

:::demo

```vue
<template>
  <div class="p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="bg-yellow-100 p-4 rounded">
        <h3 class="text-lg font-bold mb-2">响应式卡片 1</h3>
        <p class="text-sm text-gray-600">在不同屏幕尺寸下会改变布局</p>
      </div>
      <div class="bg-yellow-200 p-4 rounded">
        <h3 class="text-lg font-bold mb-2">响应式卡片 2</h3>
        <p class="text-sm text-gray-600">在不同屏幕尺寸下会改变布局</p>
      </div>
      <div class="bg-yellow-300 p-4 rounded">
        <h3 class="text-lg font-bold mb-2">响应式卡片 3</h3>
        <p class="text-sm text-gray-600">在不同屏幕尺寸下会改变布局</p>
      </div>
    </div>

    <div class="mt-8">
      <p class="text-base md:text-lg lg:text-xl text-center font-bold">
        这是一个响应式文本，在不同屏幕尺寸下会改变大小
      </p>
    </div>

    <div class="mt-8 hidden md:block">
      <p class="text-center text-gray-600">
        这段文本只在中等尺寸及以上的屏幕显示
      </p>
    </div>
  </div>
</template>
```

:::

## 动画效果

:::demo

```vue
<template>
  <div class="p-4">
    <div class="flex space-x-4 justify-center">
      <button class="transform hover:scale-110 transition-transform duration-200 bg-blue-500 text-white font-bold py-2 px-4 rounded">
        悬停缩放
      </button>

      <div class="animate-bounce bg-purple-500 text-white font-bold py-2 px-4 rounded">
        弹跳动画
      </div>

      <div class="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent">
      </div>
    </div>

    <div class="mt-8 flex justify-center">
      <div class="group relative">
        <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
          悬停显示
        </button>
        <div class="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 p-3 bg-white shadow-xl rounded opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out border border-gray-100">
          <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-t border-l border-gray-100 shadow-[-2px_-2px_2px_rgba(0,0,0,0.03)]"></div>
          <p class="text-gray-700 text-sm relative z-10">这是一个带有箭头指示的悬停提示框</p>
        </div>
      </div>
    </div>
  </div>
</template>
```

:::

## 表单样式

:::demo

```vue
<template>
  <div class="p-4 max-w-md mx-auto space-y-6">
    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">用户名</label>
      <input type="text" class="w-full px-3 py-2 border-solid border-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow">
    </div>

    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">选择框</label>
      <select class="w-full px-3 py-2 border-solid border-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow bg-white">
        <option class="py-2 px-3 hover:bg-blue-50 cursor-pointer text-gray-700 hover:text-blue-600">选项 1</option>
        <option class="py-2 px-3 hover:bg-blue-50 cursor-pointer text-gray-700 hover:text-blue-600">选项 2</option>
        <option class="py-2 px-3 hover:bg-blue-50 cursor-pointer text-gray-700 hover:text-blue-600">选项 3</option>
      </select>
    </div>

    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">复选框组</label>
      <div class="space-y-2">
        <label class="flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" class="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500">
          <span class="text-sm text-gray-700">选项 A</span>
        </label>
        <label class="flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" class="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500">
          <span class="text-sm text-gray-700">选项 B</span>
        </label>
      </div>
    </div>

    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">单选框组</label>
      <div class="space-y-2">
        <label class="flex items-center space-x-2 cursor-pointer">
          <input type="radio" name="radio-group" class="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500">
          <span class="text-sm text-gray-700">选项 1</span>
        </label>
        <label class="flex items-center space-x-2 cursor-pointer">
          <input type="radio" name="radio-group" class="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500">
          <span class="text-sm text-gray-700">选项 2</span>
        </label>
      </div>
    </div>

    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">开关按钮</label>
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" class="sr-only peer">
        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        <span class="ml-3 text-sm font-medium text-gray-700">启用</span>
      </label>
    </div>

    <button class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
      提交表单
    </button>
  </div>
</template>
```

:::

## 渐变与背景

:::demo

```vue
<template>
  <div class="p-4 space-y-4">
    <div class="h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
      渐变背景
    </div>

    <div class="h-24 bg-[url('https://picsum.photos/800/400')] bg-cover bg-center rounded-lg flex items-center justify-center text-white font-bold bg-blend-overlay bg-black/50">
      背景图片叠加
    </div>

    <div class="h-24 backdrop-blur-md bg-white/30 rounded-lg flex items-center justify-center font-bold border border-white/20" style="background-image: url('https://picsum.photos/800/400')">
      毛玻璃效果
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="h-24 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
        多色渐变
      </div>
      <div class="h-24 bg-[conic-gradient(at_top_right,#f43f5e,#8b5cf6,#3b82f6)] rounded-lg flex items-center justify-center text-white font-bold">
        圆锥渐变
      </div>
    </div>
  </div>
</template>
```
:::

## 卡片

:::demo

```vue
<template>
  <div class="p-4 space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="group bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-transform">
            A
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-800">高级卡片</h3>
            <p class="text-gray-600 text-sm">带有悬停效果和渐变背景</p>
          </div>
        </div>
      </div>

      <div class="relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500 to-purple-500 transform translate-x-10 -translate-y-10 rotate-45"></div>
        <div class="relative p-6">
          <h3 class="text-lg font-bold text-gray-800 mb-2">特色卡片</h3>
          <p class="text-gray-600 text-sm">带有装饰性几何图形</p>
        </div>
      </div>
    </div>
  </div>
</template>
```
:::

