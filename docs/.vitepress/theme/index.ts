// https://vitepress.dev/guide/custom-theme
import { h, nextTick, onMounted, watch } from 'vue'
import type { Theme } from "vitepress";
import { inBrowser, useRoute } from "vitepress";
import DefaultTheme from 'vitepress/theme'
import './style.css'
import busuanzi from "busuanzi.pure.js";
import visitorPanel from "./components/visitorPanel.vue"; // 访问统计
import confetti from "./components/confetti.vue"; // 纸屑效果
import navLinks from "./components/navLinks.vue"; // 导航
import navBarTitleAfter from './components/navBarTitleAfter.vue' // tag 展示版本号
import myLayout from "./components/myLayout.vue"; // 接入评论插件
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { LIVE2D_MODELS } from '../../share/constants'; // 看板娘模版数据
import { listener } from '../../share/utils';
import mediumZoom from "medium-zoom";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(myLayout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'nav-bar-title-after': () => h(navBarTitleAfter),
    })
  },
  async enhanceApp({ app, router, siteData }) {
    // ...
    app.component("confetti", confetti);
    app.component("VisitorPanel", visitorPanel);
    app.component("navLinks", navLinks);
    app.use(ElementPlus);
    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch();
      };
    }
    if (!(import.meta as any).env.SSR) {
      // 配置加载看板娘
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
      // listener.copy();
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