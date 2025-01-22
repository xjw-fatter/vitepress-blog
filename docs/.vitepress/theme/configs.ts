import { DefaultTheme } from "vitepress";
import { generateSidebar } from "vitepress-sidebar";
import { utils } from "../../share/utils";
import { VitePressSidebarOptions } from "vitepress-sidebar/types";

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
	debugPrint: false, // 是否打印调试信息。
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

// 要扫描的目录
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
	// {
	// 	text: "外链",
	// 	items: [
	// 		{ text: "百度", link: "https://kaifa.baidu.com/" },
	// 		{ text: "掘金", link: "https://juejin.cn/frontend" },
	// 	],
	// },
];

// algolia配置
export const algolia: DefaultTheme.AlgoliaSearchOptions = {
	appId: "FJYL7LQS95",
	apiKey: "e196a8af5b5470b0ae3c755c401293b1",
	indexName: "xjw",
	placeholder: "搜索",
	translations: {
		button: {
			buttonText: "搜索",
			buttonAriaLabel: "搜索",
		},
		modal: {
			searchBox: {
				resetButtonTitle: "清除查询条件",
				resetButtonAriaLabel: "清除查询条件",
				cancelButtonText: "取消",
				cancelButtonAriaLabel: "取消",
			},
			startScreen: {
				recentSearchesTitle: "搜索历史",
				noRecentSearchesText: "没有搜索历史",
				saveRecentSearchButtonTitle: "保存至搜索历史",
				removeRecentSearchButtonTitle: "从搜索历史中移除",
				favoriteSearchesTitle: "收藏",
				removeFavoriteSearchButtonTitle: "从收藏中移除",
			},
			errorScreen: {
				titleText: "无法获取结果",
				helpText: "你可能需要检查你的网络连接",
			},
			footer: {
				selectText: "选择",
				navigateText: "切换",
				closeText: "关闭",
				searchByText: "搜索提供者",
			},
			noResultsScreen: {
				noResultsText: "无法找到相关结果",
				suggestedQueryText: "你可以尝试查询",
				reportMissingResultsText: "你认为该查询应该有结果？",
				reportMissingResultsLinkText: "点击反馈",
			},
		},
	},
};

// 搜索配置
export const searchOptions = ():
	| { provider: "local"; options?: DefaultTheme.LocalSearchOptions }
	| { provider: "algolia"; options: DefaultTheme.AlgoliaSearchOptions } => {
	const { command, params } = utils.getProcessArgv();

	console.log(command, params);
	// 本地环境和非指定命令打包时使用本地搜索
	if (command === "build" && params[1] && params[1] === "life")
		return {
			provider: "algolia",
			options: algolia,
		};

	return {
		provider: "local",
	};
};

export const basePath = (): string => {
	const { params } = utils.getProcessArgv();
	// 部署的时候需要注意该参数避免样式丢失 Github Pages需要与仓库同名/vitepress-blog/ 域名根目录则 /
	if (!params[1]) return "/vitepress-blog/"; // 命令中没有参数则设置为根目录 有life top 等参数则设置为根目录
	return "/";
};

/**
 * 设置页面底部版权信息
 *
 * 该函数根据当前进程的参数生成包含版权信息和ICP许可证号的页面底部信息
 * 主要用于在网站底部展示版权声明和ICP备案信息
 *
 * @returns {Object} 返回一个包含版权信息和ICP许可证号的对象
 */
export const setFooter = () => {
	// 获取进程参数，用于后续决定ICP备案号的后缀
	const { params } = utils.getProcessArgv();
	// 返回包含版权信息和ICP许可证号的对象
	// 版权信息固定，ICP许可证号根据params[1]的值决定
	return {
		message:
			'Copyright © 2024-present <a href="https://www.agezi.top">XiYiAngXiang</a>.',
		copyright: `ICP许可证号 <a id="icp" href="https://beian.miit.gov.cn/" target="_blank">鄂ICP备2021012299号-${params[1] === "life" ? 2 : 1
			}</a>`,
	};
};