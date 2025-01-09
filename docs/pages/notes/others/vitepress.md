---
title: 博客搭建指南
---

# 博客搭建指南

+ 声明：本文基于[VitePress 搭建博客系统指南](https://juejin.cn/post/7409865546197893171)搭建博客后重新整理记录一下。
+ [VitePress](https://vitepress.dev/zh/)是一个静态站点生成器 (SSG)，专为构建快速、以内容为中心的站点而设计。简而言之，VitePress 获取用 Markdown 编写的内容，对其应用主题，并生成可以轻松部署到任何地方的静态 HTML 页面。

## 环境

- Node.js 版本 >= 16.x
- pnpm 或 Yarn, npm 包管理工具，推荐使用 `pnpm`

## 项目初始化

### 1. 创建项目

首先，选择一个合适的位置创建你的项目目录，以`pnpm` 为例，初始化 `package.json`

```bash
$ mkdir vitepress-blog && cd vitepress-blog && pnpm init
```

### 2. 安装 VitePress

利用下面命令安装`vitePress`, 安装完成后，利用 VitePress 附带一个命令行设置向导，帮助我们快速构建一个基本项目。

::: code-group

```sh [pnpm]
$ pnpm add -D vitepress
$ pnpm vitepress init
```

```sh [npm]
$ npm add -D vitepress
$ npx vitepress init
```

```sh [yarn]
$ yarn add -D vitepress
$ yarn vitepress init
```

:::

将需要回答几个简单的问题：

```
┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./docs
│
◇  Site title:
│  My Awesome Project
│
◇  Site description:
│  A VitePress Site
│
◆  Theme:
│  ○ Default Theme (Out of the box, good-looking docs)
│  ● Default Theme + Customization
│  ○ Custom Theme
└
```

文件结构:

如果正在构建一个独立的 VitePress 站点，可以在当前目录 (`./`) 中搭建站点。但是，如果在现有项目中与其他源代码一起安装 VitePress，建议将站点搭建在嵌套目录 (例如 `./docs`) 中，以便它与项目的其余部分分开。

假设选择在 `./docs`  中搭建 VitePress 项目，生成的文件结构应该是这样的：




```
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js
│  │  └── theme
│  │      ├── index.ts
│  │      └── style.css
│  ├─ api-examples.md
│  ├─ markdown-examples.md
│  └─ index.md
└─ package.json

```

## 修改配置

### 1. 修改构建命令

::: warning 注意

VitePress 是仅 ESM 的软件包。不要使用 `require()` 导入它，并确保最新的 `package.json` 包含 `"type": "module"`，或者更改相关文件的文件扩展名，例如 `.vitepress/config.js` 到 `.mjs`/`.mts`。更多详情请参考 [Vite 故障排除指南](http://vitejs.dev/guide/troubleshooting.html#this-package-is-esm-only)。此外，在异步 CJS 上下文中，可以使用 `await import('vitepress')` 代替。

打开`package.json`, 修改`scripts`下的命令。添加`"type:":"module"`(告诉 Node.js 使用 ECMAScript Modules (ESM) 语法来处理 .js 文件，而不是使用 CommonJS 模块系统)避免后面安装插件报错。


:::

```json{6,8-10}
{
  "name": "vitepress-blog",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type":"module",
  "scripts": {
    "dev": "vitepress dev docs",
    "build": "vitepress build docs",
    "preview": "vitepress preview docs"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "vitepress": "^1.4.1",
    "vue": "^3.5.12"
  }
}
```

### 2. 修改 vitePress 配置

#### 2.1 配置

打开`docs/.vitepress/config.mts`文件，添加如下配置，在`/docs`下创建`public`目录,用来存放静态资源，如网站的`favicon.ico`。

在`themeConfig`的`search`字段设置搜索框配置，这里使用`local`, 可以使用`algolia`,其他配置参见[siteConfig](https://vitepress.dev/reference/site-config) 和 [themeConfig](https://vitepress.dev/zh/reference/default-theme-config)

```ts{12-63}
import { defineConfig } from "vitepress";

export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  // header标签里面插入的内容
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  markdown: {
    // 代码块行号
    lineNumbers: true,
  },
  themeConfig: {
    // 网站的logo
    logo: "/logo.svg",
    // 文章右侧大纲目录
    outline: {
      level: [2, 6],
      label: "目录",
    },
    //自定义上下页名
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    // 主题
    darkModeSwitchLabel: "深浅模式",
    // 返回顶部label
    returnToTopLabel: "返回顶部",
    // 搜索
    search: {
      provider: "local",
    },
    // 页脚
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-present xxxxx",
    },
    // 文档的最后更新时间
    lastUpdated: {
    text: "更新时间",
    formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],
    // 社交链接
    socialLinks: [{ icon: "github", link: "https://github.com/xxxxx" }],
  },
  // 部署的时候需要注意该参数避免样式丢失, Github Pages需要与仓库同名/vitepress-blog/ 域名根目录则 /
  base: "/vitepress-blog/",
  vite: {
    // Vite 配置选项
    server: {
      host: "0.0.0.0",
      port: 5173, // 启动端口
      // hmr: {
      //   host: '127.0.0.1',
      //   port: 5300,
      //   overlay: false,
      // },
      hmr: true,
      open: false, // 服务启动时自动在浏览器中打开应用
      cors: true, // 为开发服务器配置 CORS , 默认启用并允许任何源
      strictPort: false, // 设为true时端口被占用则直接退出，不会尝试下一个可用端口
      proxy: {
        "/api": {
          target: "your https address",
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
      },
    },
  },
});
```

#### 2.2 主题

打开`.vitepress/theme/style.css` 文件，修改主题的颜色，如果想找配色可以去这个[eggradients](https://www.eggradients.com/)查找配色，然后替换`style.css` 里面的颜色变量

例如下面一份简单的颜色配置：

```css
/*.vitepress/theme/style.css*/
:root {
  --vp-c-brand-1: #5e3af2;
  --vp-c-brand-2: #694aea;
  --vp-c-brand-3: #7759f1;

  --vp-custom-block-info: #cccccc;
  --vp-custom-block-info-bg: #fdfdfe;

  --vp-custom-block-tip: #009400;
  --vp-custom-block-tip-bg: #e6f6e6;

  --vp-custom-block-warning: #e6a700;
  --vp-custom-block-warning-bg: #fff8e6;

  --vp-custom-block-danger: #e13238;
  --vp-custom-block-danger-bg: #ffebec;

  --vp-custom-block-note: #4cb3d4;
  --vp-custom-block-note-bg: #eef9fd;

  --vp-custom-block-important: #a371f7;
  --vp-custom-block-important-bg: #f4eefe;
  /* hero标题渐变色 */
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(
    120deg,
    #5e3af2,
    #00f6c0
  );

  /*hero logo背景渐变色 */
  --vp-home-hero-image-background-image: linear-gradient(
    -45deg,
    #5f3af2c8 50%,
    #47cbff7e 50%
  );
  --vp-home-hero-image-filter: blur(76px);
}

.dark {
  --vp-custom-block-info: #cccccc;
  --vp-custom-block-info-bg: #474748;

  --vp-custom-block-tip: #009400;
  --vp-custom-block-tip-bg: #003100;

  --vp-custom-block-warning: #e6a700;
  --vp-custom-block-warning-bg: #4d3800;

  --vp-custom-block-danger: #e13238;
  --vp-custom-block-danger-bg: #4b1113;

  --vp-custom-block-note: #4cb3d4;
  --vp-custom-block-note-bg: #193c47;

  --vp-custom-block-important: #a371f7;
  --vp-custom-block-important-bg: #230555;

  --vp-c-brand-1: #9b85f5;
  --vp-c-brand-2: #7759f1;
  --vp-c-brand-3: #615ced;
}

/**
 * Component: Home
 * -------------------------------------------------------------------------- */

:root {
  /* hero标题渐变色 */
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(
    120deg,
    #bd34fe 30%,
    #41d1ff
  );
  /*hero logo背景渐变色 */
  --vp-home-hero-image-background-image: linear-gradient(
    -45deg,
    #bd34fe 50%,
    #47caff 50%
  );
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}

```

运行`pnpm run dev`，查看界面颜色主题

#### 2.3 首页

修改`/docs/index.md` 文件，修改`首页`展示的内容，总体分为三层`layout`,`hero`,`features`

- `layout` 首页的布局，首页默认是`home`
- `hero` 首页上方的展示区域配置
- `features` 首页下方区域的卡片配置

按照默认的修改即可，对应的图片记得自己放到`public`目录下

```markdown
---
layout: home

hero:
  name: "嘻咦昂向"
  text: "寒雾开白日,余雪映青山"
  tagline: 既来之，则安之。
  image:
    src: /xiang.png
    alt: xiangxiang
  actions:
    - theme: brand
      text: GitHub
      link: https://github.com/xjw-fatter
    - theme: alt
      text: GitHub
      link: https://github.com/xjw-fatter
    - theme: alt
      text: GitHub
      link: https://github.com/xjw-fatter

features:
  - title: GitHub
    icon:
      src: /icons/ha.png
    details: GitHub～
    link: https://github.com/xjw-fatter
    linkText: 前往GitHub
  - title: GitHub
    icon:
      src: /icons/ha.png
    details: GitHub
    link: https://github.com/xjw-fatter
    linkText: 前往GitHub
  - title: GitHub
    icon:
      src: /icons/ha.png
    details: GitHub
    link: https://github.com/xjw-fatter
    linkText: 前往GitHub
---
```

预览图:
![vitepress blog 预览图 0](/images/vitepress0.png){data-zoomable}

## 打包部署

### 1. 创建仓库

在 github 中创建一个名称为`vitepress-blog`的仓库，当然仓库的名字可以自定义

### 2. 初始化 git

在项目中初始化 git

```bash
$ git init
```

### 3. 忽略文件
根目录添加`.gitignore` 文件
> 忽略不需要提交到 github 的文件以及目录

```txt [.gitignore]
node_modules
dist
cache
.temp
.DS_Store
```

### 4. 上传代码

```bash
# 将当前分支重命名为 main 可自行调整
git branch -M main
git add .
git commit -m "init project"
# 关联远程仓库 git@github.com:userName/repositoryName.git 这里是你自己的仓库地址
git remote add origin git@github.com:userName/repositoryName.git
git push -u origin main
```

### 5. 部署到 github pages

通过 `github actions` 部署到 `github pages`

:::tip 注意
使用 github pages 有两种方式，一种是通过分支部署，通常要写一个`deploy.sh`,在提交代码之后执行该脚本，将打包之后的产物放到另一个分支上，通过 github pages `Deploy from a branch` 方式部署，另一种通过`github actions`来部署,这里使用`github actions` 来部署，更加快捷，每次提交完代码自动构建部署。
:::

![vitepress blog 预览图 1](/images/vitepress1.png){data-zoomable}
如上图所示，我们在 github`vitepress-blog`仓库的`Settings`里面，找到`Pages`, 部署方式选择`Github Actions`,下面编写 github 的`workflows`。

执行下面命令创建`.github/workflows` 目录 和生成该目录下的`deploy.yml` 文件

```bash
$ mkdir .github
$ mkdir .github/workflows/
$ touch .github/workflows/deploy.yml
```

**修改`deploy.yml`文件，内容如下：**

```yaml
# 构建 VitePress 站点并将其部署到 GitHub Pages 的示例工作流程
name: Deploy VitePress site to Pages

on:
  # 在针对 `main` 分支的推送上运行
  # 如果是使用 `master` 分支作为默认分支，请将其更改为 `master`
  push:
    branches: [main]

  # 允许你从 Actions 选项卡手动运行此工作流程
  workflow_dispatch:

# 设置 GITHUB_TOKEN 的权限，以允许部署到 GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# 只允许同时进行一次部署，跳过正在运行和最新队列之间的运行队列
# 但是，不要取消正在进行的运行，因为我们希望允许这些生产部署完成
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # 如果未启用 lastUpdated，则不需要
      - uses: pnpm/action-setup@v3 # 使用 pnpm
        with:
          version: 7.3.0 # 指定 pnpm 版本
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 16.18.1
          cache: pnpm # 缓存设置为 pnpm
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Install dependencies
        run: pnpm install # 使用 pnpm 安装依赖
      - name: Build with VitePress
        run: pnpm run build # 使用 pnpm 运行构建
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist # 打包之后产物的文件夹

  # 部署工作
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```
然后提交代码到 github，此时就会自动触发 github actions

::: danger 注意
github actions 如果报错：Error: No pnpm version is specified. Please specify it by one of the following ways
请在`package.json`中添加` "packageManager": "pnpm@7.3.0"`,具体看你使用的`node`以及`pnpm`的版本,我这里使用的是`node: 16.18.1`, `pnpm: 7.3.0`
:::

**Github Actions 位置**：
![vitepress blog 预览图 2](/images/vitepress2.png){data-zoomable}
**查看部署流程**：
![vitepress blog 预览图 3](/images/vitepress3.png){data-zoomable}

**部署完成之后，访问 Github Pages 的链接，即可访问博客系统**

例如：[https://xjw-fatter.github.io/vitepress-blog/](https://xjw-fatter.github.io/vitepress-blog/)

**如果有自己的博客域名，可以将博客域名绑定到`Custom domain` 下，绑定之后，访问该域名会自动跳转定位到该博客系统**(这里没有尝试...)

::: warning 注意
- 如果博客的样式丢失，检查`docs/.vitepress/config.mts`文件夹下的`base` 设置是否正确。
- 如果使用 Github Pages 链接访问如：`https://xjw-fatter.github.io/vitepress-blog/`, `base`需要设置成 `/vitepress-blog/` 与仓库同名
- 如果自己绑定了自己的博客域名如`https://xxx.xx`, `base`需要设置为`/`
:::

### 6.其它方式

+ [阿里云oss](https://help.aliyun.com/zh/oss/?spm=a2c4g.11174283.0.0.31477368CaNgg8)/[腾讯云cos](https://cloud.tencent.com/document/product/436)：build后将dist目录放到存储桶，然后配置桶的静态网站托管，即可访问
+ 服务器[nginx](https://nginx.p2hp.com/)部署：将dist目录部署到服务器，然后配置nginx静态网站托管

## 主题样式

更改搜索框的位置，修改代码块，给导航栏添加毛玻璃等效果

修改`.vitepress/theme/style.css`文件，可直接复制过去使用：
```css
/**
 * Customize default theme styling by overriding CSS variables:
 * https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/styles/vars.css
 */

/**
 * Colors
 *
 * Each colors have exact same color scale system with 3 levels of solid
 * colors with different brightness, and 1 soft color.
 * 
 * - `XXX-1`: The most solid color used mainly for colored text. It must
 *   satisfy the contrast ratio against when used on top of `XXX-soft`.
 *
 * - `XXX-2`: The color used mainly for hover state of the button.
 *
 * - `XXX-3`: The color for solid background, such as bg color of the button.
 *   It must satisfy the contrast ratio with pure white (#ffffff) text on
 *   top of it.
 *
 * - `XXX-soft`: The color used for subtle background such as custom container
 *   or badges. It must satisfy the contrast ratio when putting `XXX-1` colors
 *   on top of it.
 *
 *   The soft color must be semi transparent alpha channel. This is crucial
 *   because it allows adding multiple "soft" colors on top of each other
 *   to create a accent, such as when having inline code block inside
 *   custom containers.
 *
 * - `default`: The color used purely for subtle indication without any
 *   special meanings attached to it such as bg color for menu hover state.
 *
 * - `brand`: Used for primary brand colors, such as link text, button with
 *   brand theme, etc.
 *
 * - `tip`: Used to indicate useful information. The default theme uses the
 *   brand color for this by default.
 *
 * - `warning`: Used to indicate warning to the users. Used in custom
 *   container, badges, etc.
 *
 * - `danger`: Used to show error, or dangerous message to the users. Used
 *   in custom container, badges, etc.
 * -------------------------------------------------------------------------- */

 :root {
  --vp-c-default-1: var(--vp-c-gray-1);
  --vp-c-default-2: var(--vp-c-gray-2);
  --vp-c-default-3: var(--vp-c-gray-3);
  --vp-c-default-soft: var(--vp-c-gray-soft);

  --vp-c-brand-1: var(--vp-c-indigo-1);
  --vp-c-brand-2: var(--vp-c-indigo-2);
  --vp-c-brand-3: var(--vp-c-indigo-3);
  --vp-c-brand-soft: var(--vp-c-indigo-soft);

  --vp-c-tip-1: var(--vp-c-brand-1);
  --vp-c-tip-2: var(--vp-c-brand-2);
  --vp-c-tip-3: var(--vp-c-brand-3);
  --vp-c-tip-soft: var(--vp-c-brand-soft);

  --vp-c-warning-1: var(--vp-c-yellow-1);
  --vp-c-warning-2: var(--vp-c-yellow-2);
  --vp-c-warning-3: var(--vp-c-yellow-3);
  --vp-c-warning-soft: var(--vp-c-yellow-soft);

  --vp-c-danger-1: var(--vp-c-red-1);
  --vp-c-danger-2: var(--vp-c-red-2);
  --vp-c-danger-3: var(--vp-c-red-3);
  --vp-c-danger-soft: var(--vp-c-red-soft);
}

/**
 * Component: Button
 * -------------------------------------------------------------------------- */

:root {
  --vp-button-brand-border: transparent;
  --vp-button-brand-text: var(--vp-c-white);
  --vp-button-brand-bg: var(--vp-c-brand-3);
  --vp-button-brand-hover-border: transparent;
  --vp-button-brand-hover-text: var(--vp-c-white);
  --vp-button-brand-hover-bg: var(--vp-c-brand-2);
  --vp-button-brand-active-border: transparent;
  --vp-button-brand-active-text: var(--vp-c-white);
  --vp-button-brand-active-bg: var(--vp-c-brand-1);
}

/**
 * Component: Home
 * -------------------------------------------------------------------------- */

:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(
    120deg,
    #bd34fe 30%,
    #41d1ff
  );

  --vp-home-hero-image-background-image: linear-gradient(
    -45deg,
    #bd34fe 50%,
    #47caff 50%
  );
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}

/**
 * Component: Custom Block
 * -------------------------------------------------------------------------- */

:root {
  --vp-custom-block-tip-border: transparent;
  --vp-custom-block-tip-text: var(--vp-c-text-1);
  --vp-custom-block-tip-bg: var(--vp-c-brand-soft);
  --vp-custom-block-tip-code-bg: var(--vp-c-brand-soft);
  --my-custom-block-tip-bg: rgba(100, 108, 255, 0.14);
}

/**
 * Component: Algolia
 * -------------------------------------------------------------------------- */

.DocSearch {
  --docsearch-primary-color: var(--vp-c-brand-1) !important;
}

/*.vitepress/theme/style.css*/
:root {
  --vp-c-brand-1: #5e3af2;
  --vp-c-brand-2: #694aea;
  --vp-c-brand-3: #7759f1;

  --vp-custom-block-info: #cccccc;
  --vp-custom-block-info-bg: #fdfdfe;

  --vp-custom-block-tip: #009400;
  --vp-custom-block-tip-bg: #e6f6e6;

  --vp-custom-block-warning: #e6a700;
  --vp-custom-block-warning-bg: #fff8e6;

  --vp-custom-block-danger: #e13238;
  --vp-custom-block-danger-bg: #ffebec;

  --vp-custom-block-note: #4cb3d4;
  --vp-custom-block-note-bg: #eef9fd;

  --vp-custom-block-important: #a371f7;
  --vp-custom-block-important-bg: #f4eefe;
  /* hero标题渐变色 */
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(
    120deg,
    #5e3af2,
    #00f6c0
  );

  /*hero logo背景渐变色 */
  --vp-home-hero-image-background-image: linear-gradient(
    -45deg,
    #5f3af2c8 50%,
    #47cbff7e 50%
  );
  --vp-home-hero-image-filter: blur(76px);
}

.dark {
  --vp-custom-block-info: #cccccc;
  --vp-custom-block-info-bg: #474748;

  --vp-custom-block-tip: #009400;
  --vp-custom-block-tip-bg: #003100;

  --vp-custom-block-warning: #e6a700;
  --vp-custom-block-warning-bg: #4d3800;

  --vp-custom-block-danger: #e13238;
  --vp-custom-block-danger-bg: #4b1113;

  --vp-custom-block-note: #4cb3d4;
  --vp-custom-block-note-bg: #193c47;

  --vp-custom-block-important: #a371f7;
  --vp-custom-block-important-bg: #230555;

  --vp-c-brand-1: #9b85f5;
  --vp-c-brand-2: #7759f1;
  --vp-c-brand-3: #615ced;
}

/* 标题字体大小 */
.custom-block-title {
  font-size: 16px;
}

/* 注释容器:背景色、左侧 */
.custom-block.info {
  background-color: var(--vp-custom-block-info-bg);
  border-left: 5px solid var(--vp-custom-block-info);
}

/* 提示容器:边框色、背景色、左侧 */
.custom-block.tip {
  background-color: var(--vp-custom-block-tip-bg);
}

/* 警告容器:背景色、左侧 */
.custom-block.warning {
  background-color: var(--vp-custom-block-warning-bg);
}

/* 危险容器:背景色、左侧 */
.custom-block.danger {
  background-color: var(--vp-custom-block-danger-bg);
}

/* NOTE容器:背景色、左侧 */
.custom-block.note {
  background-color: var(--vp-custom-block-note-bg);
}

/* IMPORTANT容器:背景色、左侧 */
.custom-block.important {
  background-color: var(--vp-custom-block-important-bg);
}

/* CAUTION容器:背景色、左侧 */
.custom-block.caution {
  background-color: var(--vp-c-red-soft);
}

/* 侧边栏 */
.group:has([role="button"]) .VPSidebarItem.level-0 .items {
  padding-left: 16px !important;
  border-radius: 2px;
  transition: background-color 0.25s;
}

/* 搜索框的位置 */
.VPNavBarSearch.search {
  justify-content: flex-end !important;
  padding-right: 32px !important;
}

.vp-doc blockquote {
  border-left: 4px solid var(--vp-c-divider);
}

/* .vitepress/theme/style/blur.css */
:root {
  /* 首页导航 */
  .VPNavBar {
    background-color: rgba(255, 255, 255, 0);
    backdrop-filter: blur(10px);
  }

  /* 文档页导航两侧 */
  .VPNavBar:not(.home) {
    background-color: rgba(255, 255, 255, 0);
    backdrop-filter: blur(10px);
  }

  @media (min-width: 960px) {
    /* 文档页导航两侧 */
    .VPNavBar:not(.home) {
      background-color: rgba(255, 255, 255, 0);
      backdrop-filter: blur(10px);
    }

    /* 首页下滑后导航两侧 */
    .VPNavBar:not(.has-sidebar):not(.home.top) {
      background-color: rgba(255, 255, 255, 0);
      backdrop-filter: blur(10px);
    }
  }

  @media (min-width: 960px) {
    /* 文档页导航中间 */
    .VPNavBar:not(.home.top) .content-body {
      background-color: rgba(255, 255, 255, 0);
      backdrop-filter: blur(10px);
    }

    /* 首页下滑后导航中间 */
    .VPNavBar:not(.has-sidebar):not(.home.top) .content-body {
      background-color: rgba(255, 255, 255, 0);
      backdrop-filter: blur(10px);
    }
  }

  /* 分割线 */

  @media (min-width: 960px) {
    /* 文档页分割线 */
    .VPNavBar:not(.home.top) .divider-line {
      background-color: rgba(255, 255, 255, 0);
      backdrop-filter: blur(10px);
    }

    /* 首页分割线 */
    .VPNavBar:not(.has-sidebar):not(.home.top) .divider {
      background-color: rgba(255, 255, 255, 0);
      backdrop-filter: blur(10px);
    }
  }

  /* 搜索框 VPNavBarSearchButton.vue */
  .DocSearch-Button {
    background-color: rgba(255, 255, 255, 0);
    backdrop-filter: blur(10px);
  }

  /* 移动端大纲栏 */
  .VPLocalNav {
    /* background-color: rgba(255, 255, 255, 0); */
    /* backdrop-filter: blur(10px); */
    /* 隐藏分割线 */
    border-bottom: 1px solid var(--vp-c-gutter);
    /* border-bottom: 0px; */
  }
}

/* .vitepress/theme/style/vp-code-group.css */

/* 代码块tab */
.vp-code-group .tabs {
  padding-top: 30px;
}

/* 代码块tab-顶部小圆点 */
.vp-code-group .tabs::before {
  background: #fc625d;
  border-radius: 50%;
  box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
  content: " ";
  height: 12px;
  width: 12px;
  left: 12px;
  margin-top: -15px;
  position: absolute;
}

/* 代码组 */
.vp-code-group {
  color: var(--vp-c-black-soft);
  border-radius: 8px;
  /* box-shadow: 0 4px 10px 0 rgb(0 0 0 / 40%); */
}

.VPHero.VPHomeHero .container .main .text{
  font-size: 40px;
}
```

## 功能配置

### 1. 自动生成侧边栏

```sh [pnpm]
pnpm i -D vitepress-sidebar
```

新增配置文件`docs/.vitepress/theme/configs.ts`

例如我的文件结构如下,在pages目录下放置md文件：
```
├── index.md
├── pages
│   ├── about.md
│   ├── nav
│   │   └── index.md
│   └── notes
│       ├── js
│       │   ├── index.md
│       │   ├── library.md
│       │   └── utils.md
│       ├── others
│       │   ├── index.md
│       │   └── vitepress.md
│       └── vue
│           ├── index.md
│           └── directives.md
├── public
│   ├── favicon.ico
│   ├── icons
│   └── images
└── share
    ├── constants
    │   ├── index.ts
    │   ├── live2d.ts
    │   └── nav.ts
    ├── types
    │   ├── index.type.ts
    │   └── nav.type.ts
    └── utils
        ├── index.ts
        ├── listener.ts
        └── utils.ts
```

```ts
import { DefaultTheme } from "vitepress";
import { generateSidebar, VitePressSidebarOptions } from "vitepress-sidebar";
import { utils } from "../../share/utils";
// https://vitepress-sidebar.cdget.com/zhHans/
// sidebar配置
const defaultOptions: VitePressSidebarOptions = {
    // 基本配置
    documentRootPath: "/docs", // 文档的根目录路径。例如 /docs
    // scanStartPath: "pages", // 开始扫描文档的路径。例如 pages。这个路径是相对于 documentRootPath 的
    // resolvePath: "examples/", // 解析文件路径的基目录。例如 examples/
    // basePath: "/docs/", // 侧边栏的基础路径。例如 /docs/
    // 折叠和展开
    collapsed: false, // 默认折叠侧边栏
    // collapseDepth: 2, // 指定折叠的深度
    // 标题处理
    // hyphenToSpace: true, // 是否将标题中的连字符转换为空格
    // underscoreToSpace: true, // 是否将标题中的下划线转换为空格
    // capitalizeFirst: true, // 是否将标题的第一个字母大写
    // capitalizeEachWords: true, // 是否将标题中的每个单词首字母大写
    // 文件和文件夹处理
    includeRootIndexFile: false, // 是否包含根目录的索引文件
    includeFolderIndexFile: false, // 是否包含文件夹的索引文件
    useTitleFromFileHeading: true, // 是否从文件的标题中提取侧边栏项的标题。
    useTitleFromFrontmatter: true, // 是否从前事项中提取侧边栏项的标题
    useFolderTitleFromIndexFile: true, // 是否从文件夹的索引文件中提取文件夹的标题
    useFolderLinkFromIndexFile: false, // 是否从文件夹的索引文件中提取文件夹的链接。
    useFolderLinkFromSameNameSubFile: false, // 是否从同名子文件中提取文件夹的链接。
    includeDotFiles: false, // 是否包含以点开头的文件。
    folderLinkNotIncludesFileName: true, // 文件夹链接是否不包含文件名。
    includeEmptyFolder: false, // 是否包含空文件夹
    // 排序
    sortMenusByName: false, // 是否按名称排序菜单项
    sortMenusByFrontmatterOrder: false, // 是否按前事项中的顺序排序菜单项
    sortMenusByFrontmatterDate: false, // 是否按前事项中的日期排序菜单项。
    sortMenusByFileDatePrefix: false, // 是否按文件日期前缀排序菜单项。
    sortMenusOrderByDescending: false, // 是否按降序排序菜单项。
    sortMenusOrderNumericallyFromTitle: false, // 是否按标题中的数字排序菜单项。
    sortMenusOrderNumericallyFromLink: false, // 是否按链接中的数字排序菜单项。
    sortFolderTo: null, // 文件夹在侧边栏中的位置，可以是 top 或 bottom。
    // 其他
    keepMarkdownSyntaxFromTitle: false, // 是否保留标题中的 Markdown 语法
    debugPrint: true, // 是否打印调试信息。
    // manualSortFileNameByPriority: [], // 手动指定文件名的优先级排序
    // excludePattern: [], // 排除匹配模式的文件或文件夹。
    // excludeFilesByFrontmatterFieldName: "", // 排除前事项中指定字段的文件。
    // removePrefixAfterOrdering: false, // 排序后是否移除前缀。
    // prefixSeparator: "", // 前缀分隔符 string | RegExp
    // rootGroupText: "", // 根组的文本。
    // rootGroupLink: "", // 根组的链接。
    // rootGroupCollapsed: null, // 根组是否默认折叠。
    // frontmatterOrderDefaultValue: number, // 前事项中顺序字段的默认值。
    // frontmatterTitleFieldName: string, // 前事项中标题字段的名称。
};

// 要扫描的目录 需根据自己的目录去配置
const sideBarData: VitePressSidebarOptions[] = [
    {
        ...defaultOptions,
        documentRootPath: "/docs", // 文档的根目录路径。例如 /docs
        scanStartPath: "pages/nav", // 开始扫描文档的路径。例如 pages。这个路径是相对于 documentRootPath 的
        resolvePath: "/pages/nav/", // 解析文件路径的基目录。例如 examples/
    },
    {
        ...defaultOptions,
        documentRootPath: "/docs",
        scanStartPath: "pages/notes",
        resolvePath: "/pages/notes/",
        manualSortFileNameByPriority: ["js", "vue", "others"],
    },
];

// 生成sidebar
export const sidebar: DefaultTheme.Config["sidebar"] =
    generateSidebar(sideBarData);

// 导航栏
export const nav: DefaultTheme.Config["nav"] = [
    { text: "首页", link: "/" },
    {
        text: "笔记",
        link: "/pages/notes/js/library",
        activeMatch: "^/pages/notes",
    },
    { text: "导航", link: "/pages/nav/index", activeMatch: "^/pages/nav" },
    {
        text: "外链",
        items: [
            { text: "百度", link: "https://kaifa.baidu.com/" },
            { text: "掘金", link: "https://juejin.cn/frontend" },
        ],
    },
];
```

在`docs/.vitepress/config.mts`中导入

```ts
import { nav, sidebar } from "./theme/configs";

export default defineConfig({
  // ...
  themeConfig: {
    nav,
    sidebar,
  },
});
```

### 2. 图片放大查看

[medium-zoom](https://francoischalifour.com/medium-image-zoom/),缩放图像的 JavaScript 库。[git地址](https://github.com/francoischalifour/medium-zoom),访问[加速地址](https://gitcode.com/gh_mirrors/me/medium-zoom/overview?utm_source=artical_gitcode&index=top&type=card&webUrl&null)

配置参考：https://github.com/vuejs/vitepress/issues/854

```sh [pnpm]
pnpm i -D medium-zoom
```

```ts
// docs/.vitepress/theme/index.ts
import mediumZoom from "medium-zoom";

export default {
  // ...
  setup() {
    const route = useRoute();
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom(".main img", { background: "var(--vp-c-bg)" }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },
  // ...
} satisfies Theme


```
### 3. 看板娘

[oh-my-live2d](https://github.com/oh-my-live2d/oh-my-live2d) Live2D For Web 组件, 快速为您的个人网站加入Live2D看板娘,去[官网查看效果](https://www.oml2d.com/)

```sh [pnpm]
pnmpm i  oh-my-live2d
```

[模型资源](https://www.oml2d.com/guide/models.html)

```ts
// live2d.ts
import { ModelOptions } from "oh-my-live2d";

export const LIVE2D_MODELS: ModelOptions[] = [
    {
        "path": "https://model.oml2d.com/Senko_Normals/senko.model3.json",
        "position": [-10, 20],
        "mobileScale": 0.08,
    },
    {
        "path": "https://model.oml2d.com/Pio/model.json",
        "scale": 0.4,
        "position": [0, 50],
        "stageStyle": {
            "height": 300
        },
    },
    {
        "path": "https://model.oml2d.com/shizuku/shizuku.model.json",
        "scale": 0.2,
        "volume": 0,
        "position": [70, 70],
        "stageStyle": {
            "height": 370,
            "width": 400
        },
        // "mobileScale": 0.08,
    },
    {
        "path": "https://model.oml2d.com/shizuku_pajama/index.json",
        "scale": 0.2,
        "volume": 0,
        "position": [40, 10],
        "stageStyle": {
            "height": 350,
            "width": 330
        },
        "mobileScale": 0.08,
    },
    {
        "path": "https://model.oml2d.com/HK416-1-normal/model.json",
        "position": [0, 60],
        "scale": 0.08,
        "stageStyle": {
            "height": 450
        },
        "mobileScale": 0.08,
    }
]
```

```ts
// docs/.vitepress/theme/index.ts
import { LIVE2D_MODELS } from '../../live2d'; // 看板娘模版数据

export default {
  // ...
  async enhanceApp({ app, router, siteData }) {
    // 配置加载看板娘
    if (!(import.meta as any).env.SSR) {
      const { loadOml2d } = await import("oh-my-live2d");
      const oml2d = loadOml2d({
        mobileDisplay: false,
        models: LIVE2D_MODELS,
        primaryColor: "#5e3af2",
        sayHello: false,
        menus: {
          disable: false,
          items: [
            {
              id: 'rest',
              title: '关闭',
              icon: 'icon-rest',
              onClick() {
                oml2d.stageSlideOut();
                oml2d.setStatusBarClickEvent(() => {
                  oml2d.stageSlideIn();
                });
              },
            },
            {
              id: 'SwitchModel',
              icon: 'icon-switch',
              title: '切换模型',
              onClick(): void {
                oml2d.loadNextModel();
              }
            },
          ],
        },
        tips: {
          idleTips: {
            wordTheDay: true,
          },
          mobileStyle: {
            fontSize: "12px",
            minHeight: "50px",
          },
          style: {
            fontSize: "16px",
          },
        },
      });
    }
  },
  // ...
} satisfies Theme
```

### 4. 五彩纸屑

```sh [pnpm]
pnpm add canvas-confetti
```

创建组件`docs/.vitepress/theme/components/confetti.vue`
```vue
<template>
  <div></div>
</template>
<script setup lang="ts">
import confetti from "canvas-confetti";
import { inBrowser } from "vitepress";

if (inBrowser) {
  /* 纸屑 */
  confetti({
    particleCount: 100,
    spread: 170,
    origin: { y: 0.6 },
  });
}
</script>

```

在`docs/.vitepress/theme/index.ts`中注入该组件
```ts
import confetti from "./components/confetti.vue"; // 纸屑效果

export default {
  // ...
  async enhanceApp({ app, router, siteData }) {
      // ...
      app.component("confetti", confetti);
    }
  },
  // ...
} satisfies Theme
```

在需要使用的页面使用
``` vue
<confetti />
```

### 5. 访客统计

```
pnpm i busuanzi.pure.js
```

注册[umami](https://cloud.umami.is)并配置你的访问统计链接：

![vitepress blog 预览图 4](/images/vitepress4.png){data-zoomable}
![vitepress blog 预览图 5](/images/vitepress5.png){data-zoomable}

修改配置文件`docs/.vitepress/config.mts`
```ts
import { defineConfig } from "vitepress";
import { algolia } from "./theme/configs";

export default defineConfig({
    head: [
      ["link", { rel: "icon", href: "/favicon.ico" }],
      [
        "script",
        {
          src: "https://cloud.umami.is/script.js",
          "data-website-id": "你的id",
        },
      ], // 站点访问统计umami
    ],
  },
});
```

创建组件`docs/.vitepress/theme/components/visitorPanel.vue`
```vue
<!-- .vitepress/theme/components/VisitorPanel.vue -->
<template>
  <div class="panel">
    <div class="container">
      <section class="grid">
        <span class="text">
          本站总访问量
          <span id="busuanzi_value_site_pv" class="font-bold">--</span> 次
        </span>
        <!-- 你的图标 -->
        <img
          src="/xiang.png"
          alt="heart"
          class="heart-img"
          width="40"
          height="40"
          @click="onLinkUmiHandle"
        />
        <span class="text">
          本站访客数
          <span id="busuanzi_value_site_uv" class="font-bold">--</span> 人次
        </span>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inBrowser } from "vitepress";
const onLinkUmiHandle = () => {
  if (inBrowser) {
    window.open(
      "https://cloud.umami.is/share/xxxx", // 你的统计链接
      "_blank"
    );
  }
};
</script>

<style scoped>
.panel {
  margin-top: 12px;
  margin-bottom: 8px;
}

.container {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  width: 100%;
  min-height: 32px;
  max-width: 1152px;
  margin-left: auto;
  margin-right: auto;
}

.heart-img {
  border-radius: 4px;
  cursor: pointer;
}

.grid {
  font-weight: 500;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 12px;
  padding-right: 12px;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  display: grid;
}

.text {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
</style>
```

在`docs/.vitepress/theme/index.ts`中注入该组件
```ts
import visitorPanel from "./components/visitorPanel.vue"; // 访问统计
import busuanzi from "busuanzi.pure.js";

export default {
  // ...
  async enhanceApp({ app, router, siteData }) {
      // ...
      app.component("VisitorPanel", visitorPanel);

      if (inBrowser) {
        router.onAfterRouteChanged = () => {
          busuanzi.fetch();
        };
      }

    }
  },
  // ...
} satisfies Theme
```

在需要使用的页面使用
``` vue
<visitorPanel />
```

### 6. 评论

使用[giscus](https://giscus.app/zh-CN)来做评论模块，具体参考文档

```sh [pnpm]
pnpm i -D @giscus/vue
```

按照文档指引填入相关内容：
![vitepress blog 预览图 6](/images/vitepress6.png){data-zoomable}
记住以下参数：
![vitepress blog 预览图 7](/images/vitepress7.png){data-zoomable}

创建组件`docs/.vitepress/theme/components/myLayout.vue`，添加`giscus` 评论组件。

```vue
<!--myLayout.vue-->
<template>
    <Layout>
        <template #doc-after>
            <div style="margin-top: 24px">
                <!-- 评论插件 -->
                <Giscus id="comments"  :theme="isDark ? 'dark' : 'light'" v-bind="{ ...giscusOptions }" />
            </div>
        </template>
    </Layout>
</template>

<script lang="ts" setup>
import Giscus from "@giscus/vue";
import DefaultTheme from "vitepress/theme";
import { watch } from "vue";
import { inBrowser, useData } from "vitepress";

const { isDark } = useData();

const { Layout } = DefaultTheme;

// 你的相关参数
const giscusOptions: any = {
    repo: "",
    repoId: "",
    category: "",
    categoryId: "",
    term: "",
    mapping: "",
    strict: 1,
    reactionsEnabled: 1,
    emitMetadata: 0,
    inputPosition: "",
    lang: "zh-CN",
    loading: "lazy",
    crossorigin: "anonymous",
};

watch(isDark, (dark) => {
    if (!inBrowser) return;
    const iframe = document
        .querySelector("giscus-widget")
        ?.shadowRoot?.querySelector("iframe");

    iframe?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: dark ? "dark" : "light" } } },
        "https://giscus.app"
    );
});
</script>

```

在`docs/.vitepress/theme/index.ts`中覆盖默认的布局，注入该组件
```ts
import myLayout from "./components/myLayout.vue";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(myLayout, null, {})
  },
} satisfies Theme
```

### 7. 返回顶部

创建组件`docs/.vitepress/theme/components/backTop.vue`
```vue
<template>
  <Transition name="fade">
    <div
      v-show="showBackTop"
      class="back-top"
      title="返回顶部"
      @click="utils.debounce(scrollToTop,300)"
    >
      <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.0083 14.1006V42.0001" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="miter"/><path d="M12 26L24 14L36 26" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="miter"/><path d="M12 6H36" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="miter"/></svg>
    </div>
  </Transition>
</template>

<script setup name="BackTop" lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { utils } from "../../../share/utils/utils";

const showBackTop = ref(false);
const scrollToTop = ()=>{
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  showBackTop.value = false;
}

function handleScroll() {
  utils.throttle(
  () => {
    console.log(window.scrollY);
    showBackTop.value = Boolean(window.scrollY > 100);
  },
  50,
  true
);
}

// 监听滚动事件
onMounted(() => window.addEventListener("scroll", handleScroll));

// 移除监听事件
onBeforeUnmount(() => window.removeEventListener("scroll", handleScroll));
</script>

<style lang="css" scoped>
.back-top {
  z-index: 999;
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #5e3af2;
  padding: 10px;
  box-shadow: 2px 2px 10px 4px rgba(0, 0, 0, 0.15);
}

.back-top:hover {
  background-color: #7666d4;
}

svg {
  width: 100%;
  height: 100%;
}

/* 旋转动画 */
@keyframes bounce {
  0% {
    transform: translateY(0) rotateY(0);
  }

  50% {
    transform: translateY(-10px) rotateY(180deg);
  }

  100% {
    transform: translateY(0) rotateY(360deg);
  }
}

/* 进入 退出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```

添加到`myLayout`组件

```vue
// myLayout.vue
<template>
    <Layout>
        <template #doc-footer-before>
            <BackTop></BackTop>
        </template>
        <template #doc-after>
            <div style="margin-top: 24px">
                <!-- 评论插件 -->
                <Giscus id="comments"  :theme="isDark ? 'dark' : 'light'" v-bind="{ ...giscusOptions }" />
            </div>
        </template>
    </Layout>
</template>

<script lang="ts" setup>
import Giscus from "@giscus/vue";
import DefaultTheme from "vitepress/theme";
import { watch } from "vue";
import { inBrowser, useData } from "vitepress";
import BackTop from './backTop.vue'

const { isDark } = useData();

const { Layout } = DefaultTheme;

const giscusOptions: any = {
    repo: "",
    repoId: "",
    category: "",
    categoryId: "",
    term: "",
    mapping: "",
    strict: 1,
    reactionsEnabled: 1,
    emitMetadata: 0,
    inputPosition: "top",
    lang: "zh-CN",
    loading: "lazy",
    crossorigin: "anonymous",
};

watch(isDark, (dark) => {
    if (!inBrowser) return;
    const iframe = document
        .querySelector("giscus-widget")
        ?.shadowRoot?.querySelector("iframe");

    iframe?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: dark ? "dark" : "light" } } },
        "https://giscus.app"
    );
});
</script>

```

**6.7 效果如下:**

![vitepress blog 预览图 8](/images/vitepress8.png){data-zoomable}

### 8. algolia搜索配置

[注册](https://docsearch.algolia.com/apply)，创建索引，获取appid，apiKey，注册后等邮件回复,可能需要1-2个工作日

```ts
export const algolia: DefaultTheme.AlgoliaSearchOptions = {
    appId: '', // 你的appid
    apiKey: '',  // 你的apiKey
    indexName: '',
    placeholder: '搜索',
    translations: {
        button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索'
        },
        modal: {
            searchBox: {
                resetButtonTitle: '清除查询条件',
                resetButtonAriaLabel: '清除查询条件',
                cancelButtonText: '取消',
                cancelButtonAriaLabel: '取消'
            },
            startScreen: {
                recentSearchesTitle: '搜索历史',
                noRecentSearchesText: '没有搜索历史',
                saveRecentSearchButtonTitle: '保存至搜索历史',
                removeRecentSearchButtonTitle: '从搜索历史中移除',
                favoriteSearchesTitle: '收藏',
                removeFavoriteSearchButtonTitle: '从收藏中移除'
            },
            errorScreen: {
                titleText: '无法获取结果',
                helpText: '你可能需要检查你的网络连接'
            },
            footer: {
                selectText: '选择',
                navigateText: '切换',
                closeText: '关闭',
                searchByText: '搜索提供者'
            },
            noResultsScreen: {
                noResultsText: '无法找到相关结果',
                suggestedQueryText: '你可以尝试查询',
                reportMissingResultsText: '你认为该查询应该有结果？',
                reportMissingResultsLinkText: '点击反馈'
            }
        }
    }
}
```

修改配置文件`docs/.vitepress/config.mts`

```ts
import { defineConfig } from "vitepress";
import { algolia } from "./theme/configs";

export default defineConfig({
    themeConfig: {
      // 搜索
      search: {
          provider: "algolia",
          options: algolia,
      },
    },
  },
});

```


### 9. 实时编码

[itepress-plugin-sandpack](https://vitepress-sandbox.js-bridge.com/get-started/introduction.html):sandpack 插件，实时编码

::: sandbox {template=vite-vue}
<template>
	<div>
  	<h1>Hello {{ data }}</h1>
	</div>
</template>

<script setup>
import { ref } from "vue";
const data = ref("world");
</script>

<style>
h1 {
  font-size: 12px;
}
</style>
:::

### 10. 组件预览

[vitepress-code-preview](https://welives.github.io/vitepress-code-preview/guide.html): 对嵌入的Vue 示例代码增加演示功能

:::demo

```vue
<template>
  <div>{{ title }}</div>
</template>
<script lang="ts" setup>
import { ref, defineComponent } from 'vue'
const title = ref('this is vue demo')
</script>
```

:::

:::demo

```jsx
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const title = ref('this is jsx demo')
    return () => <div>{title.value}</div>
  },
})
```

:::