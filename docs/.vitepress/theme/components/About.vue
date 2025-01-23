<template>
	<div class="about">
		<img src="../../../public/icons/heart.gif" />
		<div v-for="(text, index) in texts" :key="index" class="item">
			{{ text }}
		</div>
		<div class="item">{{ easyTyperObj.output }}</div>
		<!-- <div id="jsi-flying-fish-container" class="fish-container"></div> -->
	</div>
</template>

<script setup name="About" lang="ts">
import { onMounted, reactive } from "vue";
// import { inBrowser } from "vitepress";
import EasyTyper from "../../../share/utils/easyTyper"

const texts = [
	'👏👏👏 Hey! 👏👏👏',
	'😆 🍉 既来之，则安之。😆 🍉',
	// '🌱 一个卷不动,所以躺平了的菜鸟 🌱'
];

// 计算属性
const easyTyperObj = reactive({
  output: '',
  isEnd: false,
  speed: 80,
  singleBack: true,
  sleep: 0,
  type: 'normal',
  backSpeed: 40,
  sentencePause: true
})

// const loadFishScript = () => {
// 	const script = document.createElement('script');
// 	script.src = 'http://192.168.14.47:5173/vitepress-blog/public/js/fish.js';
// 	script.type = 'text/javascript';
// 	script.async = true;
// 	console.log(script)
// 	script.onload = () => {
// 		console.log('Fish script loaded and executed.');
// 	};
// 	script.onerror = (error) => {
// 		console.error('Failed to load fish script:', error);
// 	};
// 	document.head.appendChild(script);
// }
// if (inBrowser) {
// 	setTimeout(() => {
// 		loadFishScript()
// 	}, 1000);
// }

// 实例化
onMounted(() => {
  const typed = new EasyTyper(easyTyperObj, `🌱 因为卷不动,所以躺平了的菜鸟 🌱`,()=>{},()=>{})
})
</script>
<style scoped lang="scss">
.about {
	min-height: 60vh;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	flex-direction: column;

	img {
		width: 27px;
		height: auto;
	}

	.item {
		padding: 12px 0;
	}

	.fish-container {
		margin: 0;
		padding: 0;
		background-color: transparent;
		width: 100%;
		height: 200px;
		z-index: -1;
		position: fixed;
		bottom: 0;
		left: 0;
	}
}
</style>