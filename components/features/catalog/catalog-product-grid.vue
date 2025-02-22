<template>
	<div class="flex-grow">
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			<ProductCard
				v-for="product in products"
				:key="product.id"
				:product="product"
				@add-to-basket="$emit('add-to-basket', $event)"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { Product } from '~/types/product';
	import ProductCard from './catalog-product-card.vue';

	defineProps<{
		products: Product[];
	}>();

	defineEmits<{
		(e: 'add-to-basket', product: Product): void;
	}>();
</script>
