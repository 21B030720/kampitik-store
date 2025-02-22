<template>
	<div class="bg-white rounded-lg shadow p-4">
		<NuxtLink
			:to="localePath(`/products/${product.id}`)"
			class="block mb-4"
			prefetch
		>
			<div class="aspect-square bg-gray-200 mb-4 rounded-lg overflow-hidden">
				<img
					:src="product.image"
					:alt="product.name"
					class="w-full h-full object-cover"
					@error="handleImageError"
				>
			</div>
			<h2 class="text-lg font-semibold">{{ product.name }}</h2>
			<p class="text-gray-600">${{ product.price.toFixed(2) }}</p>
		</NuxtLink>
		<button
			class="w-full bg-primary-600 text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-primary-700 transition-colors"
			@click="$emit('add-to-basket', product)"
		>
			<img src="@/assets/icons/basket.svg" alt="Basket" class="w-5 h-5 mr-2" >
			{{ t('catalog.addToBasket') }}
		</button>
	</div>
</template>

<script setup lang="ts">
	import type { Product } from '~/types/product';
	const { t } = useI18n();
	const localePath = useLocalePath();

	defineProps<{
		product: Product;
	}>();

	defineEmits<{
		(e: 'add-to-basket', product: Product): void;
	}>();

	// Handle image loading errors
	const handleImageError = (event: Event) => {
		const img = event.target as HTMLImageElement;
		img.src = '/images/placeholder-product.jpg';
	};
</script>

<style scoped>
	.aspect-square {
		aspect-ratio: 1;
	}
</style>
