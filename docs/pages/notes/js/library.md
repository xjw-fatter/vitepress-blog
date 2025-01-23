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
### browser-image-compression
[browser-image-compression](https://github.com/Donaldcwl/browser-image-compression#readme)支持多种格式的图片压缩的JavaScript 库

## 图片裁剪插件

### vue-cropper

[vue-cropper](https://www.npmjs.com/package/vue-cropper)一个优雅的图片裁剪插件


## 富文本库

### textbus
[textbus](https://textbus.io/)支持多前端框架、高性能的富文本库，原生支持 Viewfly、React、Vue 渲染富文本
### wangeditor
[wangeditor](https://www.wangeditor.com/)开源 Web 富文本编辑器，开箱即用，配置简单
### UEditorPlus
[UEditorPlus](https://open-doc.modstart.com/ueditor-plus/)基于 UEditor 二次开发的富文本编辑器 

## 大屏适配

### autofit.js

[autofit.js](https://auto-plugin.github.io/index/autofit.js/) 是一个可以让你的PC项目自适应屏幕的工具，其原理非常简单，即在 scale 等比缩放的基础上，向右或向下增加了宽度或高度，以达到充满全屏的效果，使用 autofit.js 不会挤压、拉伸元素，它只是单纯的设置了容器的宽高。

## 生成PowerPoint
[PptxGenJS](https://gitbrent.github.io/PptxGenJS/) Javascript生成PowerPoint

## 代码混淆

[javascript-obfuscator](https://www.npmjs.com/package/javascript-obfuscator) 一个javascript代码混淆工具，让你的代码看起来让人痛苦。

以下是一个结合`gulp`将html中script内容混淆的例子：

::: code-group

```json [package.json]
{
  "scripts": {
    "build:deep": "npx gulp --gulpfile gulpfile-deep.js"
  },
  "dependencies": {
    "gulp": "^4.0.2",
    "gulp-htmlmin": "^5.0.1"
  },
  "devDependencies": {
    "gulp-cheerio": "^1.0.0",
    "javascript-obfuscator": "^4.1.1"
  }
}
```

```js [gulpfile-deep.js]
// 引入所需的库
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cheerio = require('gulp-cheerio');
const JavaScriptObfuscator = require('javascript-obfuscator'); 
// https://github.com/javascript-obfuscator/gulp-javascript-obfuscator
// https://www.npmjs.com/package/javascript-obfuscator
// https://obfuscator.io/
const obfuscatorOptions = {
  // 默认预设，高性能
  default: {
    compact: true,
    controlFlowFlattening: false,
    deadCodeInjection: false,
    debugProtection: false,
    debugProtectionInterval: 0,
    disableConsoleOutput: false,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: false,
    renameGlobals: false,
    selfDefending: false,
    simplify: true,
    splitStrings: false,
    stringArray: true,
    stringArrayCallsTransform: false,
    stringArrayCallsTransformThreshold: 0.5,
    stringArrayEncoding: [],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 1,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 2,
    stringArrayWrappersType: 'variable',
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: false
  },
  // 高混淆，低性能
  high: {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1,
    debugProtection: true,
    debugProtectionInterval: 4000,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    selfDefending: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 5,
    stringArray: true,
    stringArrayCallsTransform: true,
    stringArrayEncoding: ['rc4'],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 5,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 5,
    stringArrayWrappersType: 'function',
    stringArrayThreshold: 1,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
  },
  // 中等混淆，最佳性能
  in: {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false,
    debugProtectionInterval: 0,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    selfDefending: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayCallsTransform: true,
    stringArrayCallsTransformThreshold: 0.75,
    stringArrayEncoding: ['base64'],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 2,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 4,
    stringArrayWrappersType: 'function',
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
  },
  // 低混淆，高性能
  low: {
    compact: true,
    controlFlowFlattening: false,
    deadCodeInjection: false,
    debugProtection: false,
    debugProtectionInterval: 0,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: false,
    renameGlobals: false,
    selfDefending: true,
    simplify: true,
    splitStrings: false,
    stringArray: true,
    stringArrayCallsTransform: false,
    stringArrayEncoding: [],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 1,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 2,
    stringArrayWrappersType: 'variable',
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: false
  }
}

/**
 * Gulp任务：深度混淆HTML中的JavaScript代码
 * 该任务读取指定的HTML文件，混淆文件中包含的JavaScript代码，并压缩HTML文件
 */
gulp.task('deep-obfuscate-js-in-html', function () {
  console.log('deep-obfuscate-js-in-html');
  // 指定需要处理的 HTML 文件路径
  return gulp.src('src/*.html')
    .pipe(cheerio({
      run: function ($, file) {
        // 查找所有的 <script> 标签并进行混淆处理
        $('script').each(function () {
          const scriptContent = $(this).html();
          if (scriptContent) {
            // 使用 javascript-obfuscator 深度混淆 JavaScript 代码
            const obfuscated = JavaScriptObfuscator.obfuscate(scriptContent, obfuscatorOptions.default).getObfuscatedCode();
            $(this).html(obfuscated);
          }
        });
      },
      parserOptions: { decodeEntities: false }
    }))
    // 压缩HTML文件，包括去掉空格、压缩CSS、去掉注释和压缩JS
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      removeComments: true,
      minifyJS: true
    }))
    // 将处理后的文件输出到目标文件夹
    .pipe(gulp.dest('dist'));
});

// 定义 default 任务
gulp.task('default', gulp.series('deep-obfuscate-js-in-html'));
```

:::


