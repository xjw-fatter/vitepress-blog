---
title: 工具库
---

# 工具库

## 图像识别

### tesseractjs

[Tesseract.js](https://github.com/naptha/tesseract.js#tesseractjs)是一个javascript库，可以从图像中获取几乎任何语言的单词，查看官网[demo](https://tesseract.projectnaptha.com/)。

```javascript
import { createWorker } from 'tesseract.js';

(async () => {
  const worker = await createWorker('eng');
  const ret = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
  console.log(ret.data.text);
  await worker.terminate();
})();
```
当识别多个图像时，用户应该创建一个worker，对每个图像运行`worker.regnize`，然后在最后运行`worker.eterminate（）`一次（而不是对每个图像都运行上述代码段）。

## 图片压缩

### compressorjs

[compressorjs](https://fengyuanchen.github.io/compressorjs/)是一个前端的图片压缩工具,压缩质量还是挺不错的,[在线尝试](https://fengyuanchen.github.io/compressorjs/)

Example
```html
<input type="file" id="file" accept="image/*" >
```
```javascript
import axios from 'axios';
import Compressor from 'compressorjs';

document.getElementById('file').addEventListener('change', (e) => {
  const file = e.target.files[0];

  if (!file) {
    return;
  }

  new Compressor(file, {
    quality: 0.6,
    success(result) {
      const formData = new FormData();
      formData.append('file', result, result.name);
      axios.post('/path/to/upload', formData).then(() => {
        console.log('Upload success');
      });
    },
    error(err) {
      console.log(err.message);
    },
  });
});
```

## 图片裁剪插件

### vue-cropper

[vue-cropper](https://www.npmjs.com/package/vue-cropper)一个优雅的图片裁剪插件


## 富文本库

### textbus
[textbus](https://textbus.io/)支持多前端框架、高性能的富文本库，原生支持 Viewfly、React、Vue 渲染富文本

## 大屏适配

### autofit.js

[autofit.js](https://auto-plugin.github.io/index/autofit.js/) 是一个可以让你的PC项目自适应屏幕的工具，其原理非常简单，即在 scale 等比缩放的基础上，向右或向下增加了宽度或高度，以达到充满全屏的效果，使用 autofit.js 不会挤压、拉伸元素，它只是单纯的设置了容器的宽高。

