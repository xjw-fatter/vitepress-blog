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
[browser-image-compression](https://github.com/Donaldcwl/browser-image-compression#readme)支持多种格式的图片压缩的JavaScript 库,[在线尝试](/pages/notes/js/ImageCompressor)

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

## 动画

+ [lottie-web](https://www.npmjs.com/package/lottie-web)
  + [Lottie](https://airbnb.io/lottie/#/) 是一个适用于 Android、iOS、Web 和 Windows 的库，它可以解析使用 Bodymovin 导出为 JSON 的 Adobe After Effects 动画，并在移动设备和 Web 上本地渲染它们！动画是用AE做好，然后用Bodymovin插件将动画转换成一个JSON文件，前端就可以使用[lottie-web](https://www.npmjs.com/package/lottie-web)将这个JSON文件的内容转换成图像渲染到浏览器页面上

  动画资源：
  + [lottiefiles](https://lottiefiles.com/)
  + [iconfont](https://www.iconfont.cn/lotties/index?spm=a313x.activity_lists.i3.11.50913a81XAlei7)
  + [creattie](https://creattie.com/)
  + [lottielab](https://www.lottielab.com/)
+ [svga](https://www.npmjs.com/package/svga)一个 SVGA 在移动端 Web 上的播放器
+ [gsap](https://gsap.com/) 具有强大的功能，提供丰富动画效果和控制功能，如时间线、缓动函数等；性能卓越，渲染速度快，浏览器重绘少；社区支持广泛，有大量教程和资源。API复杂，学习曲线较陡，体积较大，可能增加页面加载时间。适用于如大型电商网站的促销活动页面、交互性强的游戏网站等
+ [animejs](https://animejs.com/) 轻量级，体积小巧，不占用过多资源；API 友好，易于上手，适用于个人博客、简单的企业宣传网站等
+ [velocityjs](http://velocityjs.org/) 渲染速度快，性能好，适合处理大量动画；API 简洁明了，易于使用；浏览器兼容性好，支持多种浏览器和设备。依赖jQuery，增加了项目依赖性，且社区规模较小，资源相对较少。
+ [mojs](https://mojs.github.io/) 能创建高度定制化的动画效果，提供强大的形状系统、自定义数值和时间系统，还有多种内置动画效果，如粒子系统、生长动画等。API复杂，学习成本较高。
