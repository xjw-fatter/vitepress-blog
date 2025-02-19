import { App } from 'vue';
import VisitorPanel from "./components/VisitorPanel.vue"; // 访问统计
import Confetti from "./components/Confetti.vue"; // 纸屑效果
import NavLinks from "./components/NavLinks.vue"; // 导航
import About from './components/About.vue'
import ModalIframe from './components/ModalIframe.vue'
import ImageCompressor from './components/ImageCompressor.vue'
import IpView from './components/IpView.vue'
import { Sandbox } from 'vitepress-plugin-sandpack';
import DemoPreview, { useComponents } from '@vitepress-code-preview/container'

export function registerComponents(app: App) {
	app.component("Confetti", Confetti);
	app.component("VisitorPanel", VisitorPanel);
	app.component("NavLinks", NavLinks);
	app.component("About",About);
	app.component("ModalIframe",ModalIframe);
	app.component("ImageCompressor",ImageCompressor);
	app.component("IpView",IpView);
	app.component('Sandbox', Sandbox);
	app.component('DemoPreview', DemoPreview);
}