<template>
	<NuxtLink
		:to="localePath(`/shop/${store.id}`)"
		class="flex-shrink-0 w-72 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
		prefetch
	>
		<div class="aspect-video bg-gray-200 mb-3 rounded-lg overflow-hidden">
			<img
				:src="store.image || placeholderImage"
				:alt="store.name"
				class="w-full h-full object-cover"
				@error="handleImageError"
			>
		</div>

		<div class="p-4">
			<h3 class="font-semibold text-lg">{{ store.name }}</h3>

			<p class="text-gray-600">
				{{ store.address }}
			</p>

			<p class="text-sm text-gray-500">
				{{ store.city_name }}
			</p>
		</div>
	</NuxtLink>
</template>

<script setup lang="ts">
	import type {  Shop } from '~/types/shop';

	// const { t } = useI18n();
	const localePath = useLocalePath();

	defineProps<{
		store: Shop;
	}>();

	// Import placeholder image
	const placeholderImage = new URL(
		'@/assets/images/placeholder-store.png',
		import.meta.url,
	).href;

	// Handle image loading errors
	const handleImageError = (event: Event) => {
		const img = event.target as HTMLImageElement;
		img.src = placeholderImage;
	};
</script>

<style scoped>
	.aspect-video {
		aspect-ratio: 16 / 9;
	}
</style>
