<template>
	<div class="flex-none w-64 transition-transform duration-300 ease-in-out">
		<div
			class="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow cursor-pointer"
		>
			<div class="aspect-video bg-gray-200 mb-3 rounded-lg overflow-hidden">
				<img
					:src="store.image"
					:alt="store.name"
					class="w-full h-full object-cover"
					@error="handleImageError"
				>
			</div>
			<h3 class="text-lg font-semibold">{{ store.name }}</h3>
			<p class="text-sm text-gray-600 mt-1">
				{{ store.productCount }} {{ t('catalog.products') }}
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { Store } from '~/types/store';

	const { t } = useI18n();

	defineProps<{
		store: Store;
	}>();

	// Handle image loading errors
	const handleImageError = (event: Event) => {
		const img = event.target as HTMLImageElement;
		img.src = '/images/placeholder-store.jpg';
	};
</script>

<style scoped>
	.aspect-video {
		aspect-ratio: 16 / 9;
	}
</style>
