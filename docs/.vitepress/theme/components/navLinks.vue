<script setup lang="ts">
import { computed, ref } from "vue";
import { withBase } from "vitepress";
import { NavDataItem } from "../../../share/types/index.type";
import { utils } from "../../../share/utils/utils";
const props = defineProps<{
	title: string;
	items: NavDataItem[];
}>();

const formatTitle = computed(() => {
	return props.title;
});
const onLinkClick = (link: string) => {
	window.open(link, "_blank");
};

const showMore = ref(true)
const onTitleClick = () => {
	showMore.value = !showMore.value;
}

</script>

<template>
	<h4 v-if="title" :id="formatTitle" tabindex="-1" class="nav-links-title">
		<div>{{ title }}</div>
		<a class="header-anchor" :href="`#${formatTitle}`" aria-hidden="true"></a>
		<div class="vpi-chevron-right caret-icon arrow" :class="[showMore && 'down']" @click="onTitleClick()"></div>
	</h4>
	<div class="nav-links" v-show="showMore">
		<div v-for="{ icon, title, desc, link } in items" :key="link" @click="onLinkClick(link)" class="nav-link"
			:id="formatTitle">
			<div class="box">
				<div class="box-header">
					<div v-if="typeof icon === 'object'" class="icon" v-html="icon.svg"></div>
					<div v-else-if="icon && typeof icon === 'string'" class="icon">
						<img :src="withBase(icon)" :alt="title" onerror="this.parentElement.style.display='none'" />
					</div>
					<h5 v-if="title" class="title">{{ title }}</h5>
				</div>
				<div class="desc">{{ desc }}</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.nav-links {
	--my-nav-gap: 10px;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
	grid-row-gap: var(--my-nav-gap);
	grid-column-gap: var(--my-nav-gap);
	grid-auto-flow: row dense;
	justify-content: center;
	margin-top: var(--my-nav-gap);

	&-title {
		position: relative;
		display: flex;
		justify-content: space-between;

		.arrow {
			padding-left: 60px;

			&.down {
				transform: rotate(90deg);
			}
		}
	}
}

@each $media, $size in (500px: 140px, 640px: 155px, 768px: 175px, 960px: 200px, 1440px: 240px) {
	@media (min-width: $media) {
		.nav-links {
			grid-template-columns: repeat(auto-fill, minmax($size, 1fr));
		}
	}
}

@media (min-width: 960px) {
	.nav-links {
		--my-nav-gap: 20px;

		.nav-link {
			&:hover {
				box-shadow: var(--vp-shadow-2);
				border-color: var(--vp-c-brand);
				text-decoration: initial;
				background-color: var(--vp-c-bg);
			}
		}
	}
}

.nav-links {
	.nav-link {
		--my-nav-icon-box-size: 40px;
		--my-nav-icon-size: 24px;
		--my-nav-box-gap: 12px;

		display: block;
		border: 1px solid var(--vp-c-bg-soft);
		border-radius: 8px;
		height: 100%;
		text-decoration: inherit;
		background-color: var(--vp-c-bg-alt);
		transition: all 0.25s;

		.box {
			display: flex;
			flex-direction: column;
			padding: var(--my-nav-box-gap);
			height: 100%;
			color: var(--vp-c-text-1);

			&-header {
				display: flex;
				align-items: center;
			}
		}

		.icon {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: calc(var(--my-nav-box-gap) - 2px);
			border-radius: 6px;
			width: var(--my-nav-icon-box-size);
			height: var(--my-nav-icon-box-size);
			font-size: var(--my-nav-icon-size);
			background-color: var(--vp-c-default-soft);
			transition: background-color 0.25s;

			:deep(svg) {
				width: var(--my-nav-icon-size);
				fill: currentColor;
			}

			:deep(img) {
				border-radius: 4px;
				width: var(--my-nav-icon-size);
			}
		}

		.title {
			overflow: hidden;
			flex-grow: 1;
			white-space: nowrap;
			text-overflow: ellipsis;
			line-height: var(--my-nav-icon-box-size);
			font-size: 16px;
			font-weight: 600;
		}

		.desc {
			display: -webkit-box;
			line-clamp: 2;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
			text-overflow: ellipsis;
			flex-grow: 1;
			margin: calc(var(--my-nav-box-gap) - 2px) 0 0;
			line-height: 1.5;
			font-size: 12px;
			color: var(--vp-c-text-2);
		}
	}
}



@media (max-width: 960px) {
	.nav-link {
		--my-nav-icon-box-size: 36px;
		--my-nav-icon-size: 20px;
		--my-nav-box-gap: 8px;

		.title {
			font-size: 14px;
		}
	}
}
</style>