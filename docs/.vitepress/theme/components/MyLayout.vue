<!--MyLayout.vue-->
<template>
	<Layout>
		<template #nav-bar-title-after>
			<!-- <el-tag text style="vertical-align: middle;margin-left:8px;color: #5e3af2;border-color: #5e3af2;" size="small"
			effect="plain">{{ packageConfig.version }}</el-tag> -->
    </template>
		<template #doc-footer-before>
			<BackTop></BackTop>
		</template>
		<template #doc-after>
			<div style="margin-top: 24px">
				<!-- 评论插件 -->
				<Giscus id="comments" :theme="isDark ? 'dark' : 'light'" v-bind="{ ...giscusOptions }" />
				<div @click="onChangeRandomLightColor()" :style="{ color: lightColor,width: '100%', height: '20px', marginTop: '24px',fontSize: '12px',cursor: 'pointer' }">
					既来之，则安之。
				</div>
			</div>
		</template>
	</Layout>
</template>

<script lang="ts" setup name="MyLayout">
import { ref, watch } from "vue";
import { inBrowser, useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Giscus from "@giscus/vue";
import BackTop from './BackTop.vue'
// import packageConfig from '../../../../package.json'

const usedColors = new Set();
const getRandomLightColor = () => {
  let color;
  do {
    // 生成每个通道的随机值，范围在 160 到 255 之间
    const r = Math.floor(Math.random() * 96) + 160;
    const g = Math.floor(Math.random() * 96) + 160;
    const b = Math.floor(Math.random() * 96) + 160;

    // 将 RGB 值转换为十六进制字符串
    color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  } while (usedColors.has(color));

  usedColors.add(color);
  return color;
}

const onChangeRandomLightColor = () => {
	lightColor.value = getRandomLightColor()
}

const lightColor = ref(getRandomLightColor())

const { isDark } = useData();

const { Layout } = DefaultTheme;

const giscusOptions: any = {
	repo: "xjw-fatter/vitepress-blog",
	repoId: "R_kgDONFEywA",
	category: "Announcements",
	categoryId: "DIC_kwDONFEywM4ClHhN",
	term: "!!!",
	mapping: "specific",
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
	console.log("myLayout.vue log", dark);

	const iframe = document
		.querySelector("giscus-widget")
		?.shadowRoot?.querySelector("iframe");

	iframe?.contentWindow?.postMessage(
		{ giscus: { setConfig: { theme: dark ? "dark" : "light" } } },
		"https://giscus.app"
	);
});
</script>
