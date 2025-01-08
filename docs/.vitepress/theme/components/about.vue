<template>
	<div class="about">
		<img src="../../../public/icons/heart.gif" />
		<div v-for="(text, index) in texts" :key="index" class="item">
			{{ text }}
		</div>
	</div>
</template>

<script setup name="About" lang="ts">
import { onMounted, reactive } from "vue";

const texts = [
	'👏👏👏 Hey! 👏👏👏',
	'😆 🍉 既来之，则安之。😆 🍉',
	'🌱 一个卷不动,所以躺平了的菜鸟 🌱'
];
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
}
</style>