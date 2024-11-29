// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from "vitepress";
import { inBrowser, useRoute } from "vitepress";
import DefaultTheme from 'vitepress/theme'
import './style.css'
import busuanzi from "busuanzi.pure.js";
import visitorPanel from "./components/visitorPanel.vue";
import confetti from "./components/confetti.vue";
import navLinks from "./components/navLinks.vue";
import NavBarTitleAfter from './components/NavBarTitleAfter.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { LIVE2D_MODELS } from '../../share/constants';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'nav-bar-title-after': () => h(NavBarTitleAfter),
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

    const { loadOml2d } = await import('oh-my-live2d');
    loadOml2d({
      models: LIVE2D_MODELS,
      mobileDisplay: false,
      primaryColor: "#5e3af2",
      sayHello: false,
    });
  }
} satisfies Theme