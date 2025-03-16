<template>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
		<NuxtLink
			v-for="pack in packs"
			:key="pack.id"
			:to="localePath(`/bundles/${pack.id}`)"
			class="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
		>
			<div class="p-4">
				<h3 class="font-semibold text-lg mb-2">{{ pack.name }}</h3>
				<p v-if="pack.description" class="text-gray-600 text-sm mb-4">
					{{ pack.description }}
				</p>
				<div class="flex justify-between items-center">
					<p class="text-lg font-bold">{{ pack.price }}₸</p>
					<p v-if="pack.discount !== '0.00'" class="text-green-600">
						-{{ pack.discount }}₸
					</p>
				</div>
			</div>
		</NuxtLink>
	</div>
</template>

<script setup lang="ts">
import type { Bundle } from '~/types/bundle';

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