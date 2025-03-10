<template>
	<div class="flex-grow">
		<div v-if="products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			<ProductCard
				v-for="product in products"
				:key="product.id"
				:product="product"
				@add-to-basket="$emit('add-to-basket', $event)"
			/>
		</div>
		<div v-else class="text-center py-12 text-gray-500">
			No products available
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { Product } from '~/types/product';
	import ProductCard from './catalog-product-card.vue';

	const props = defineProps<{
		products: Product[];
	}>();

	console.log('Products in grid:', props.products); // Debug log

	defineEmits<{
		(e: 'add-to-basket', product: Product): void;
	}>();
</script>
