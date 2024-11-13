import { defineConfig } from "vitepress";

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
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present XiYiAngXiang",
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
    socialLinks: [{ icon: "github", link: "https://github.com/xjw-fatter" }],
  },
  // 部署的时候需要注意该参数避免样式丢失
  base: "/vitepress-blog/",
});
