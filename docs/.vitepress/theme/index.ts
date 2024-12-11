// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from "vitepress";
import { inBrowser } from "vitepress";
import DefaultTheme from 'vitepress/theme'
import './style.css'
import busuanzi from "busuanzi.pure.js";
import visitorPanel from "./components/visitorPanel.vue";
import confetti from "./components/confetti.vue";
import navLinks from "./components/navLinks.vue";
import navBarTitleAfter from './components/navBarTitleAfter.vue'
import myLayout from "./components/myLayout.vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { LIVE2D_MODELS } from '../../share/constants';
import { listener, utils } from '../../share/utils';

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
      listener.copy();
      utils.aTextbyId("icp", `鄂ICP备2021012299号-${window.location.href.indexOf('xjw.life') < -1 ? '2' : '1'}`)
    }
  }
} satisfies Theme