<template>
	<div class="container mx-auto px-4 py-8">
		<ShopHeader :shop="shop" />
		<ShopCommodityGroups :commodity-groups="commodityGroups" />
		<ShopPacks :bundles="bundles" @add-to-basket="addToBasket" />
		<ShopCategories
			:categories="categories"
			v-model:selected-category="selectedCategory"
		/>
		<ShopProducts :products="filteredProducts" @add-to-basket="addToBasket" />
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
	import ShopHeader from '~/components/features/shop/shop-header.vue';
	import ShopCategories from '~/components/features/shop/shop-categories.vue';
	import ShopCommodityGroups from '~/components/features/shop/shop-commodity-groups.vue';
	import ShopPacks from '~/components/features/shop/shop-packs.vue';
	import ShopProducts from '~/components/features/shop/shop-products.vue';
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

	// Filter products based on selected category
	const filteredProducts = computed(() => {
		if (!selectedCategory.value) return products.value;
		return products.value.filter(
			(product) => product.category_id === selectedCategory.value,
		);
	});

	// Fetch all data
	onMounted(async () => {
		try {
			const [shopData, productsData, categoriesData, groupsData, bundlesData] =
				await Promise.all([
					ShopService.getShopById(shopId),
					ShopService.getShopProducts(shopId),
					ShopService.getShopCategories(shopId),
					ShopService.getShopCommodityGroups(shopId),
					ShopService.getShopBundles(shopId),
				]);

			shop.value = shopData;
			products.value = productsData;
			categories.value = categoriesData;
			commodityGroups.value = groupsData;
			bundles.value = bundlesData;
		} catch (error) {
			console.error('Failed to fetch shop data:', error);
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
