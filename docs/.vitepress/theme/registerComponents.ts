import { App } from 'vue';
import visitorPanel from "./components/visitorPanel.vue"; // 访问统计
import confetti from "./components/confetti.vue"; // 纸屑效果
import navLinks from "./components/navLinks.vue"; // 导航
import about from './components/about.vue'

export function registerComponents(app: App) {
	app.component("confetti", confetti);
	app.component("VisitorPanel", visitorPanel);
	app.component("navLinks", navLinks);
	app.component("about",about);
}