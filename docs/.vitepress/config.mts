import { defineConfig } from "vitepress";
import { nav, sidebar } from "./theme/configs";

export default defineConfig({
  title: "嘻咦昂向",
  description: "XiYiAngXiang's Blog",
  // header标签里面插入的内容
  ignoreDeadLinks: true,
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    [
      "script",
      {
        src: "https://cloud.umami.is/script.js",
        "data-website-id": "a6fee6db-cc51-4b66-a529-da38c7febe12",
      },
    ],
  ],
  themeConfig: {
    // 网站的logo
    logo: "/favicon.ico",
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
      // provider: "algolia",
    },
    // 页脚
    footer: {
      message: "Copyright © 2024-present XiYiAngXiang",
      copyright: "ICP许可证号 鄂ICP备2021012299号-1",
    },
    // 文档的最后更新时间
    lastUpdated: {
      text: "更新时间",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
    nav,
    sidebar,
    // 社交链接
    socialLinks: [{ icon: "github", link: "https://github.com/xjw-fatter" }],
  },
  // 部署的时候需要注意该参数避免样式丢失 Github Pages需要与仓库同名/vitepress-blog/ 域名根目录则 /
  base: "/vitepress-blog/",
  // base: "/",
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
