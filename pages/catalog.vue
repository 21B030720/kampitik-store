<template>
	<div class="container mx-auto px-4 py-8">
		<StoreCarousel :stores="stores" />

		<div class="flex flex-col md:flex-row gap-8">
			<ProductFilters
				v-model:price-range="priceRange"
				v-model:selected-categories="selectedCategories"
				:categories="categories"
			/>
			<ProductGrid :products="filteredProducts" @add-to-basket="addToBasket" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed } from 'vue';
	import StoreCarousel from '~/components/features/catalog/catalog-store-carousel.vue';
	import ProductFilters from '~/components/features/catalog/catalog-product-filters.vue';
	import ProductGrid from '~/components/features/catalog/catalog-product-grid.vue';
	import type { Store } from '~/types/store';
	import type { Product } from '~/types/product';
	import type { Category } from '~/types/category';

	const { t } = useI18n();

	// Store data
	const stores = ref<Store[]>([
		{
			id: 1,
			name: 'Fashion Store',
			image: '/images/stores/store1.jpg',
			productCount: 156,
		},
		{
			id: 2,
			name: 'Electronics Hub',
			image: '/images/stores/store2.jpg',
			productCount: 243,
		},
		{
			id: 3,
			name: 'Home Decor',
			image: '/images/stores/store3.jpg',
			productCount: 189,
		},
		{
			id: 4,
			name: 'Sports Center',
			image: '/images/stores/store4.jpg',
			productCount: 167,
		},
		{
			id: 5,
			name: 'Beauty & Care',
			image: '/images/stores/store5.jpg',
			productCount: 198,
		},
		{
			id: 6,
			name: 'Books & Media',
			image: '/images/stores/store6.jpg',
			productCount: 312,
		},
	]);

	// Categories
	const categories = ref<Category[]>([
		{ id: 1, key: 'sport', name: t('categories.sport') },
		{ id: 2, key: 'food', name: t('categories.food') },
		{ id: 3, key: 'service', name: t('categories.service') },
		{ id: 4, key: 'vitamins', name: t('categories.vitamins') },
		{ id: 5, key: 'activities', name: t('categories.activities') },
	]);

	// Filter state
	const priceRange = ref(500);
	const selectedCategories = ref<number[]>([]);

	// Product data
	const products = ref<Product[]>([
		{
			id: 1,
			name: 'Premium Laptop',
			price: 999.99,
			image: '/images/products/laptop.jpg',
			categoryId: 1,
		},
		{
			id: 2,
			name: 'Wireless Headphones',
			price: 149.99,
			image: '/images/products/headphones.jpg',
			categoryId: 1,
		},
	]);

	// Filtered products based on price and categories
	const filteredProducts = computed(() => {
		return products.value.filter((product) => {
			const matchesPrice = product.price <= priceRange.value;
			const matchesCategory =
				selectedCategories.value.length === 0 ||
				selectedCategories.value.includes(product.categoryId);
			return matchesPrice && matchesCategory;
		});
	});

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
