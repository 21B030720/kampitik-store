<template>
	<div class="container mx-auto px-4 py-8">
		<!-- Back button -->
		<NuxtLink
			:to="localePath(`/shop/${commodityGroup?.shop_id}/commodity-groups/categories/${commodityGroup?.category_id}`)"
			class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
		>
			<span>← {{ t('back.toCategory') }}</span>
		</NuxtLink>

		<div v-if="error" class="text-red-600 mb-4">{{ error }}</div>

		<template v-else>
			<!-- Commodity Group Header -->
			<div class="bg-white rounded-lg shadow-lg p-6 mb-8">
				<div class="flex items-start gap-6">
					<img
						:src="commodityGroup?.image || placeholderImage"
						:alt="commodityGroup?.name"
						class="w-32 h-32 rounded-lg object-cover"
						@error="handleImageError"
					>
					<div>
						<h1 class="text-2xl font-bold mb-2">{{ commodityGroup?.name }}</h1>
						<p class="text-lg text-gray-600 mb-4">{{ commodityGroup?.description }}</p>
						<p class="text-base text-gray-500">{{ commodityGroup?.category_name }}</p>
					</div>
				</div>
			</div>

			<!-- Loading State -->
			<div v-if="isLoading" class="text-center py-12">
				<p class="text-gray-500">{{ t('loading') }}</p>
			</div>

			<!-- Products Grid -->
			<template v-else>
				<h2 class="text-xl font-bold mb-6">{{ t('commodityGroup.products') }}</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					<CatalogProductCard
						v-for="product in products"
						:key="product.id"
						:product="product"
					/>
				</div>
			</template>
		</template>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import { useI18n } from 'vue-i18n';
	import type { CommodityGroup } from '~/types/commodity-group';
	import type { Product } from '~/types/product';
	import type { PaginatedResponse } from '~/types/category';
	import { ShopService } from '~/services/ShopService';
	import CatalogProductCard from '~/components/features/catalog/catalog-product-card.vue';

	const { t } = useI18n();
	const route = useRoute();
	const localePath = useLocalePath();

	const groupId = parseInt(route.params.id as string);

	const commodityGroup = ref<CommodityGroup | null>(null);
	const products = ref<PaginatedResponse<Product>>({
		results: [],
		count: 0,
		next: null,
		previous: null,
		page_number: 1,
		per_page: 10,
		total_pages: 1
	});
	const isLoading = ref(true);
	const error = ref<string | null>(null);

	const placeholderImage = new URL(
		'@/assets/images/placeholder-commodity-group.png',
		import.meta.url
	).href;

	onMounted(async () => {
		try {
			const [groupData, productsData] = await Promise.all([
				ShopService.getCommodityGroupById(groupId),
				ShopService.getCommodityGroupProducts(groupId)
			]);

			commodityGroup.value = groupData;
			products.value = productsData;
		} catch (err) {
			console.error('Failed to fetch commodity group data:', err);
			error.value = t('errors.failedToLoad');
		} finally {
			isLoading.value = false;
		}
	});

	const handleImageError = (event: Event) => {
		const img = event.target as HTMLImageElement;
		img.src = placeholderImage;
	};
</script>
