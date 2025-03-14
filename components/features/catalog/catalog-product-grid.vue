<template>
	<div>
		<!-- Show loading or no products message -->
		<div v-if="!products.length" class="text-center py-12 text-gray-500">
			{{ isLoading ? t('loading') : t('catalog.noProducts') }}
		</div>

		<!-- Products grid -->
		<div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			<ProductCard
				v-for="product in products"
				:key="product.id"
				:product="product"
				@add-to-basket="$emit('add-to-basket', $event)"
			/>
		</div>

		<!-- Debug info -->
		<div class="text-sm text-gray-500 mt-4">
			Total items: {{ totalItems }}, Total pages: {{ totalPages }}, Current page: {{ currentPage }}
		</div>

		<!-- Pagination - show when there are items -->
		<Pagination
			v-if="totalItems > 0"
			:current-page="currentPage"
			:total-pages="totalPages"
			@update:page="onPageChange"
		/>
	</div>
</template>

<script setup lang="ts">
	import { ref, watch } from 'vue';
	import { useI18n } from 'vue-i18n';
	import type { Product } from '~/types/product';
	import { usePagination } from '~/composables/usePagination';
	import Pagination from '~/components/shared/pagination.vue';
	import ProductCard from './catalog-product-card.vue';

	const { t } = useI18n();
	const isLoading = ref(false);

	const props = defineProps<{
		products: Product[];
		totalItems: number;
		isLoading?: boolean;
	}>();

	const emit = defineEmits<{
		(e: 'add-to-basket', product: Product): void;
		(e: 'page-change', params: { page: number; per_page: number }): void;
	}>();

	const {
		currentPage,
		totalPages,
		paginationParams,
		setTotalItems,
		setPage
	} = usePagination();

	// Update total items when products change
	watch(() => props.totalItems, (total) => {
		setTotalItems(total);
	}, { immediate: true });

	// Handle page change
	const onPageChange = (page: number) => {
		setPage(page);
		emit('page-change', paginationParams.value);
	};

	// Watch for loading state
	watch(() => props.isLoading, (loading) => {
		isLoading.value = loading;
	}, { immediate: true });
</script>
