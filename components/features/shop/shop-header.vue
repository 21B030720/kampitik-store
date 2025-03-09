<template>
	<div class="flex flex-col items-center mb-12">
		<img
			:src="shop?.image || placeholderImage"
			:alt="shop?.name"
			class="w-48 h-48 rounded-full object-cover shadow-lg mb-4"
			@error="handleImageError"
		>
		<h1 class="text-3xl font-bold text-center mb-2">{{ shop?.name }}</h1>
		<p class="text-gray-600 mb-2">{{ shop?.address }}</p>
		<p class="text-gray-500">{{ shop?.city_name }}</p>
		<div class="flex items-center gap-4 mt-4">
			<p v-if="shop?.open_from" class="text-sm text-gray-600">
				{{ t('shop.openFrom') }}: {{ shop.open_from }}
			</p>
			<p v-if="shop?.open_until" class="text-sm text-gray-600">
				{{ t('shop.openUntil') }}: {{ shop.open_until }}
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { Store } from '~/types/store';

	const { t } = useI18n();

	defineProps<{
		shop: Store | null;
	}>();

	const placeholderImage = new URL(
		'@/assets/images/placeholder-store.png',
		import.meta.url,
	).href;

	const handleImageError = (event: Event) => {
		const img = event.target as HTMLImageElement;
		img.src = placeholderImage;
	};
</script>
