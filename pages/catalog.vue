<template>
	<div class="container mx-auto px-4 py-8">
		<StoreCarousel :stores="stores" />

		<div v-if="error" class="text-red-600 mb-4">
			{{ error }}
		</div>

		<div class="flex flex-col md:flex-row gap-8">
			<!-- Content type filter -->
			<ProductFilters v-model:selected-type="selectedContentType" />

			<!-- Show different content based on selected type -->
			<template v-if="selectedContentType === ContentType.MENU">
				<div v-if="isLoading" class="flex-1 flex justify-center items-center">
					<p class="text-gray-500">{{ t('loading') }}</p>
				</div>
				<ProductGrid v-else :products="products" @add-to-basket="addToBasket" />
			</template>

			<template v-else-if="selectedContentType === ContentType.ACTIVITIES">
				<div class="flex-1">
					<p class="text-gray-500">{{ t('catalog.activitiesComingSoon') }}</p>
				</div>
			</template>

			<template v-else-if="selectedContentType === ContentType.SERVICES">
				<div class="flex-1">
					<p class="text-gray-500">{{ t('catalog.servicesComingSoon') }}</p>
				</div>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted } from 'vue';
	import { ShopService } from '~/services/ShopService';
	import { ContentType } from '~/types/content-type';
	import type { Store } from '~/types/store';
	import type { Product } from '~/types/product';
	import StoreCarousel from '~/components/features/catalog/catalog-store-carousel.vue';
	import ProductFilters from '~/components/features/catalog/catalog-product-filters.vue';
	import ProductGrid from '~/components/features/catalog/catalog-product-grid.vue';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();

	// Store data
	const stores = ref<Store[]>([]);
	const products = ref<Product[]>([]);
	const isLoading = ref(false);
	const error = ref<string | null>(null);

	// Filter state
	const selectedContentType = ref<ContentType>(ContentType.MENU);

	// Fetch stores and products
	onMounted(async () => {
		isLoading.value = true;
		error.value = null;

		try {
			const [storesData, productsData] = await Promise.all([
				ShopService.getShops(),
				ShopService.getAllProducts(),
			]);

			console.log('API Response - Products:', productsData);
			stores.value = storesData;
			products.value = productsData;

			console.log('Products after setting to ref:', products.value);
		} catch (err) {
			console.error('Failed to fetch data:', err);
			error.value = 'Failed to load data. Please try again later.';
		} finally {
			isLoading.value = false;
		}
	});

	// Import images
	const magnumImage =
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlMDAh7DttznnRGKvt2KTAMeM0a9RqeqpcAQ&s';
	const store6Image =
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlMDAh7DttznnRGKvt2KTAMeM0a9RqeqpcAQ&s';
	const agushaImage =
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7sW3JRTOWjhUZgJYHUM_Xj1nYKX_lTZcNw&s';

	// Add to basket functionality
	const addToBasket = (product: Product) => {
		// TODO: Implement basket functionality
		console.log('Adding to basket:', product);
	};
</script>

<style scoped>
	.aspect-video {
		aspect-ratio: 16 / 9;
	}

	/* Hide scrollbar but keep functionality */
	.overflow-x-hidden::-webkit-scrollbar {
		display: none;
	}
	.overflow-x-hidden {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
