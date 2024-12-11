---
title: 自定义指令
---

# 自定义指令

除了 Vue 内置的一系列指令 (比如 v-model 或 v-show) 之外，Vue 还允许你注册自定义的指令 ([Custom Directives](https://cn.vuejs.org/guide/reusability/custom-directives.html))。

## 拨打电话 v-phone-call

```ts
const phoneCall = (el: HTMLElement, binding: DirectiveBinding) => {
  el.onclick = (e) => {
    e.stopPropagation();
    const phone = el.getAttribute('phone') || binding.value.phone;
    window.location.href = `tel:${phone}`;
  };
};
```

```html
<div  v-phone-call="{ phone: yourPhone }">拨打电话<van-icon name="phone" color="#B7BCCD" /></div>
<div  v-phone-call :phone="yourPhone">拨打电话<van-icon name="phone" color="#B7BCCD" /></div>
```

## 监听窗口大小变化 v-resize

```ts
const resize = {
  mounted(el: HTMLElement & any, binding: DirectiveBinding) {
    const { value: callback } = binding;
    const width = ref(0);
    const height = ref(0);
    const handleResize = () => {
      width.value = el.clientWidth;
      height.value = el.clientHeight;
      callback({ width: width.value, height: height.value });
    };
    el._handleResize = handleResize;
    // 监听窗口大小变化，调用 handleResize
    window.addEventListener('resize', handleResize);
    // 初始时调用一次 handleResize
    handleResize();
  },
  beforeUnmount(el: HTMLElement & any) {
    window.removeEventListener('resize', el._handleResize);
  },
};
```

```html
<template>
  <div v-resize="resize">
    <p>Window width: {{ windowWidth }}</p>
    <p>Window height: {{ windowHeight }}</p>
  </div>
</template>
<script setup lang="ts">
  const windowWidth = ref(window.innerWidth);
  const windowHeight = ref(window.innerHeight);
  const resize = (size) => {
    console.log(size);
    windowWidth.value = size.width;
    windowHeight.value = size.height;
  };
</script>
```

## 复制文本 v-copy

```ts
const copy = (el: HTMLElement) => {
  el.addEventListener('click', () => {
    const text = el.innerText || '';
    const textarea = document.createElement('textarea');
    console.log(el.innerText);
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast(text);
  });
};
```

```html
  <div v-copy>复制我吧</div>
```

