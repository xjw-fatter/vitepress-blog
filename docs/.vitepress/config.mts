import { defineConfig } from "vitepress";
import { basePath, nav, searchOptions, setFooter, sidebar } from "./theme/configs";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import container from 'markdown-it-container';
import { renderSandbox } from 'vitepress-plugin-sandpack';
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteDemoPreviewPlugin } from '@vitepress-code-preview/plugin'
import { fileURLToPath, URL } from 'node:url'
import { demoPreviewPlugin } from '@vitepress-code-preview/plugin'
// import { withMermaid } from "vitepress-plugin-mermaid";

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
		], // 站点访问统计umami
		// ["script",{
		// 	src:"https://cdn.bootcdn.net/ajax/libs/jquery/1.7.1/jquery.min.js"
		// }]
	],
	markdown: {
		// 代码块行号
		lineNumbers: true,
		config(md) {
			// the second parameter is html tag name
			md.use(container, 'sandbox', {
				render(tokens, idx) {
					return renderSandbox(tokens, idx, 'sandbox');
				},
			});
			const docRoot = fileURLToPath(new URL('../', import.meta.url));
			md.use(demoPreviewPlugin, { docRoot });
		},
	},
	// mermaid: {
	// 	// refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
	// },
	// // optionally set additional config for plugin itself with MermaidPluginConfig
	// mermaidPlugin: {
	// 	class: "mermaid my-class", // set additional css classes for parent container
	// },
	themeConfig: {
		// 网站的logo
		logo: "/favicon.ico",
		// 文章右侧大纲目录
		outline: {
			level: [2, 6],
			label: "目录",
		},
		// 自定义上下页名
		docFooter: {
			prev: "上一页",
			next: "下一页",
		},
		// 主题
		darkModeSwitchLabel: "深浅模式",
		// 返回顶部label
		returnToTopLabel: "返回顶部",
		// 搜索
		search: searchOptions(),
		// 页脚
		footer: setFooter(),
		// 文档的最后更新时间
		lastUpdated: {
			text: "更新时间",
			formatOptions: {
				dateStyle: "full",
				timeStyle: "medium",
			},
		},
		// 导航配置
		nav,
		sidebar,
		// 社交链接
		socialLinks: [{ icon: "github", link: "https://github.com/xjw-fatter" }],
	},
	// 部署的时候需要注意该参数避免样式丢失 Github Pages需要与仓库同名/vitepress-blog/ 域名根目录则 /
	base: basePath(),
	vite: {
		// Vite 配置选项
		plugins: [
			// ...
			AutoImport({
				resolvers: [ElementPlusResolver()],
			}),
			Components({
				resolvers: [ElementPlusResolver()],
			}),
			viteDemoPreviewPlugin(), vueJsx()
		],
		ssr: {
			noExternal: ['element-plus']
		},
		build: {
			sourcemap: false, // 构建后是否生成 source map 文件
			minify: 'terser', // terser 构建后文件体积更小
			assetsInlineLimit: 4096,
			chunkSizeWarningLimit: 2000, // 提高 chunk 大小警告的限制
			rollupOptions: {
				output: {
					manualChunks: {
						'element-plus': ['element-plus']
					}
				}
			}
		},
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
