---
title: 工具库
---

# 工具库

## tesseractjs

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

## compressorjs

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

## vue-cropper

[vue-cropper](https://www.npmjs.com/package/vue-cropper)一个优雅的图片裁剪插件


