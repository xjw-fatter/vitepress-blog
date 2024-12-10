import { DefaultTheme } from "vitepress";
import { generateSidebar, VitePressSidebarOptions } from "vitepress-sidebar";
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
    },
];
export const sidebar: DefaultTheme.Config["sidebar"] =
    generateSidebar(sideBarData);

// nav
export const nav: DefaultTheme.Config["nav"] = [
    { text: "首页", link: "/" },
    { text: "笔记", link: "/pages/notes/js/", activeMatch: '^/pages/notes' },
    { text: "导航", link: "/pages/nav/index", activeMatch: '^/pages/nav' },
    {
        text: "外链",
        items: [
            { text: "百度", link: "https://kaifa.baidu.com/" },
            { text: "掘金", link: "https://juejin.cn/frontend" },
        ],
    },
];
