// https://vitepress.dev/guide/custom-theme
import { h, nextTick, onMounted, watch } from 'vue'
import type { Theme } from "vitepress";
import { inBrowser, useRoute } from "vitepress";
import DefaultTheme from 'vitepress/theme'
import './style.css'
import busuanzi from "busuanzi.pure.js";
import MyLayout from "./components/MyLayout.vue";
import { LIVE2D_MODELS } from '../../share/constants'; // 看板娘模版数据
import mediumZoom from "medium-zoom";
import { registerComponents } from './registerComponents';

import { Sandbox } from 'vitepress-plugin-sandpack';
import 'vitepress-plugin-sandpack/dist/style.css';

import DemoPreview, { useComponents } from '@vitepress-code-preview/container'
import '@vitepress-code-preview/container/dist/style.css'
import { applyGrayscale, utils } from '../../share/utils';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(MyLayout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  async enhanceApp({ app, router, siteData }) {
    // ...
		registerComponents(app);
		app.component('Sandbox', Sandbox);
		app.component('DemoPreview', DemoPreview);

    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch();
      };

			applyGrayscale();
			// const { loadOml2d } = await import("oh-my-live2d");
      // const oml2d = loadOml2d({
      //   mobileDisplay: false,
      //   models: LIVE2D_MODELS,
      //   primaryColor: "#5e3af2",
      //   sayHello: false,
      //   menus: {
      //     disable: false,
      //     items: [
      //       {
      //         id: 'rest',
      //         title: '关闭',
      //         icon: 'icon-rest',
      //         onClick() {
      //           oml2d.stageSlideOut();
      //           oml2d.setStatusBarClickEvent(() => {
      //             oml2d.stageSlideIn();
      //           });
      //         },
      //       },
      //       {
      //         id: 'SwitchModel',
      //         icon: 'icon-switch',
      //         title: '切换模型',
      //         onClick(): void {
      //           oml2d.loadNextModel();
      //         }
      //       },
      //     ],
      //   },
      //   tips: {
      //     idleTips: {
      //       wordTheDay: true,
      //     },
      //     mobileStyle: {
      //       fontSize: "12px",
      //       minHeight: "50px",
      //     },
      //     style: {
      //       fontSize: "16px",
      //     },
      //   },
      // });

			(import.meta as any).env.PROD && utils.prohibitionOfDebugging();
    }
  },
  setup() {
    const route = useRoute();
    const initZoom = () => {
      mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      // mediumZoom(".main img", { background: "var(--vp-c-bg)" }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },
} satisfies Theme