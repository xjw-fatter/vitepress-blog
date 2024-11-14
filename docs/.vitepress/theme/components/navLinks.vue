<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    title: string;
    items: any[];
}>();

const formatTitle = computed(() => {
    return props.title;
});
</script>

<template>
    <h2 v-if="title" :id="formatTitle" tabindex="-1">
        {{ title }}
        <a class="header-anchor" :href="`#${formatTitle}`" aria-hidden="true"></a>
    </h2>
    <div class="m-nav-links">
        <div v-for="{ icon, title, desc, link } in items" :key="link">
            <div>{{ icon }}</div>
            <div>{{ title }}</div>
            <div>{{ desc }}</div>
            <div>{{ link }}</div>
        </div>
    </div>
</template>

<style scoped>
.nav-links {
    --nav-gap: 10px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    grid-row-gap: var(--nav-gap);
    grid-column-gap: var(--nav-gap);
    grid-auto-flow: row dense;
    justify-content: center;
    margin-top: var(--nav-gap);
}
</style>
