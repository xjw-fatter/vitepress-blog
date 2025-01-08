<script setup lang="ts">
import packageConfig from '../../../../package.json'

</script>

<template>
	<el-tag text style="vertical-align: middle;margin-left:8px;color: #5e3af2;border-color: #5e3af2;" size="small"
		effect="plain">{{ packageConfig.version }}</el-tag>
</template>
