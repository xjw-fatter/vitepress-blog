<!--myLayout.vue-->
<template>
    <Layout>
        <template #doc-footer-before>
            <BackTop></BackTop>
        </template>
        <template #doc-after>
            <div style="margin-top: 24px" >
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
