<template>
	<section>
		<!-- Debug info -->
		<p class="text-sm text-gray-500 mb-2">Products received: {{ products.length }}</p>
		
		<div v-if="products.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
			<CatalogProductCard
				v-for="product in products"
				:key="product.id"
				:product="product"
				class="h-full"
			/>
		</div>
		
		<!-- Empty state -->
		<div 
			v-else 
			class="text-center py-12 bg-white rounded-lg shadow"
		>
			<p class="text-gray-500">{{ t('catalog.noProducts') }}</p>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { useI18n } from 'vue-i18n';
	import type { Product } from '~/types/product';
	import CatalogProductCard from '~/components/features/catalog/catalog-product-card.vue';
	import { watch } from 'vue';

	const { t } = useI18n();

	const props = defineProps<{
		products: Product[];
	}>();

	// Debug log when products change
	watch(() => props.products, (newProducts) => {
		console.log('Shop products updated:', newProducts);
	}, { immediate: true });
</script>
