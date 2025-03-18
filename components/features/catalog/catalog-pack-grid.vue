<template>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
		<CatalogPackCard
			v-for="pack in packs"
			:key="pack.id"
			:pack="pack"
		/>
	</div>
</template>

<script setup lang="ts">
import type { Bundle } from '~/types/bundle';
import CatalogPackCard from '~/components/features/catalog/catalog-pack-card.vue';

const localePath = useLocalePath();

defineProps<{
	packs: Bundle[];
}>();

const handleImageError = (e: Event) => {
	const img = e.target as HTMLImageElement;
	const container = img.parentElement;
	if (container) {
		img.style.display = 'none';
		container.innerHTML = '<span class="text-gray-400">No image</span>';
	}
};
</script>

<style scoped>
.aspect-square {
	aspect-ratio: 1;
}
</style> 