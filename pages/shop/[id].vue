<template>
	<div class="container mx-auto px-4 py-8">
		<ShopHeader :shop="shop" />
		<ShopCommodityCategories 
			:categories="commodityCategories.results || []" 
			:shop-id="shopId"
		/>
		<ShopPacks :bundles="bundles" @add-to-basket="addToBasket" />
		<h2 class="text-2xl font-bold mb-6">{{ t('shop.products') }}</h2>
		<ShopCategories
			v-model:selected-category="selectedCategory"
		/>
		<div v-if="isLoading" class="text-center py-12">
			<p class="text-gray-500">{{ t('loading') }}</p>
		</div>
		<div v-else>
			<p class="text-sm text-gray-500 mb-2">Debug: {{ filteredProducts.length }} products</p>
			<ShopProducts 
				:products="filteredProducts" 
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted } from 'vue';
	import { ShopService } from '~/services/ShopService';
	import type { Store } from '~/types/store';
	import type { Product } from '~/types/product';
	import type { Category } from '~/types/category';
	import type { CommodityGroup } from '~/types/commodity-group';
	import type { Bundle } from '~/types/bundle';
	import type { PaginatedResponse } from '~/types/category';
	import ShopHeader from '~/components/features/shop/shop-header.vue';
	import ShopCategories from '~/components/features/shop/shop-categories.vue';
	import ShopCommodityGroups from '~/components/features/shop/shop-commodity-groups.vue';
	import ShopPacks from '~/components/features/shop/shop-packs.vue';
	import ShopProducts from '~/components/features/shop/shop-products.vue';
	import ShopCommodityCategories from '~/components/features/shop/shop-commodity-categories.vue';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();

	const route = useRoute();
	const shopId = parseInt(route.params.id as string);

	const shop = ref<Store | null>(null);
	const products = ref<Product[]>([]);
	const categories = ref<Category[]>([]);
	const commodityGroups = ref<CommodityGroup[]>([]);
	const bundles = ref<Bundle[]>([]);
	const selectedCategory = ref<number | null>(null);
	const isLoading = ref(true);
	const commodityCategories = ref<PaginatedResponse<Category>>({
		results: [],
		count: 0,
		next: null,
		previous: null,
		page_number: 1,
		per_page: 10,
		total_pages: 1
	});

	// Filter products based on selected category
	const filteredProducts = computed(() => {
		if (!selectedCategory.value) return products.value;
		return products.value.filter(
			(product) => product.category_id === selectedCategory.value,
		);
	});

	// Fetch all data
	onMounted(async () => {
		isLoading.value = true;
		try {
			const [shopData, productsData, categoriesData, groupsData, bundlesData, commodityCategoriesData] =
				await Promise.all([
					ShopService.getShopById(shopId),
					ShopService.getShopProducts(shopId),
					ShopService.getShopCategories(shopId),
					ShopService.getShopCommodityGroups(shopId),
					ShopService.getShopBundles(shopId),
					ShopService.getShopCommodityGroupCategories(shopId),
				]);

			shop.value = shopData;
			products.value = Array.isArray(productsData) ? productsData : [];
			categories.value = categoriesData;
			commodityGroups.value = groupsData;
			bundles.value = bundlesData;
			commodityCategories.value = commodityCategoriesData;

			console.log('Fetched products:', products.value); // Debug log
		} catch (error) {
			console.error('Failed to fetch shop data:', error);
		} finally {
			isLoading.value = false;
		}
	});

	const handleImageError = (event: Event) => {
		const img = event.target as HTMLImageElement;
		img.style.display = 'none';
	};

	const addToBasket = (item: any) => {
		console.log('Adding to basket:', item);
		// TODO: Implement basket functionality
	};
</script>
