<template>
	<div class="container mx-auto px-4 py-8">
		<div v-if="product" class="bg-white rounded-lg shadow-lg">
			<!-- Back to Shop -->
			<div class="border-t p-6">
				<NuxtLink
					:to="localePath(`/shop/${product.shop_id}`)"
					class="text-primary-600 hover:text-primary-700 flex items-center gap-2"
				>
					<span>←</span>
					<span>{{ t('back.toShop') }}</span>
				</NuxtLink>
			</div>
			<!-- Product Header -->
			<div class="grid md:grid-cols-2 gap-8 p-6">
				<!-- Image Section -->
				<div>
					<img
						:src="product.image || placeholderImage"
						:alt="product.name"
						class="w-full aspect-square object-cover rounded-lg"
						@error="handleImageError"
					>
				</div>

				<!-- Product Info -->
				<div class="space-y-4">
					<div>
						<h1 class="text-3xl font-bold mb-2">{{ product.name }}</h1>
						<p class="text-gray-600">{{ product.description }}</p>
					</div>

					<div class="flex items-center gap-2">
						<span v-if="product.rating" class="flex items-center gap-1">
							<span class="text-yellow-400">★</span>
							<span>{{ product.rating }}</span>
						</span>
						<span class="text-gray-500">{{ product.shop_name }}</span>
					</div>

					<div class="text-lg font-semibold">
						{{ product.price }}тг/{{ product.measure }}
					</div>

					<div class="text-sm text-gray-600">
						<p>
							{{ t('product.ageRange') }}: {{ product.from_age }}-{{
								product.to_age
							}}
							{{ t('product.years') }}
						</p>
						<p>{{ product.category_name }}</p>
					</div>

					<!-- Nutrition Info -->
					<div v-if="hasNutritionInfo" class="border-t pt-4">
						<h2 class="font-semibold mb-2">
							{{ t('product.nutritionPer100g') }}
						</h2>
						<div class="grid grid-cols-2 gap-4">
							<div>
								<p class="text-gray-600">{{ t('product.nutritionalValue') }}</p>
								<p class="font-medium">
									{{ nutrition.nutritional_value }}kcal
								</p>
							</div>
							<div>
								<p class="text-gray-600">{{ t('product.fats') }}</p>
								<p class="font-medium">
									{{ nutrition.fats }}g
								</p>
							</div>
							<div>
								<p class="text-gray-600">{{ t('product.proteins') }}</p>
								<p class="font-medium">
									{{ nutrition.proteins }}g
								</p>
							</div>
							<div>
								<p class="text-gray-600">{{ t('product.carbs') }}</p>
								<p class="font-medium">
									{{ nutrition.carbohydrates }}g
								</p>
							</div>
						</div>
					</div>

					<!-- Add to Basket Button -->
					<AddToBasketButton :product="product" />
				</div>
			</div>
		</div>

		<!-- Loading State -->
		<div
			v-else-if="isLoading"
			class="flex justify-center items-center min-h-[400px]"
		>
			<p class="text-gray-500">{{ t('loading') }}</p>
		</div>

		<!-- Error State -->
		<div v-else-if="error" class="text-center py-12 bg-white rounded-lg shadow">
			<p class="text-red-600 mb-4">{{ error }}</p>
			<NuxtLink
				:to="localePath('/catalog')"
				class="text-primary-600 hover:text-primary-700"
			>
				{{ t('back.toCatalog') }}
			</NuxtLink>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted } from 'vue';
	import { useI18n } from 'vue-i18n';
	import { useBasketStore } from '~/stores/useBasketStore';
	import { ShopService } from '~/services/ShopService';
	import type { Product } from '~/types/product';
	import AddToBasketButton from '~/components/shared/add-to-basket-button.vue';

	const { t } = useI18n();
	const localePath = useLocalePath();
	const route = useRoute();
	const basketStore = useBasketStore();

	const product = ref<Product | null>(null);
	const isLoading = ref(true);
	const error = ref<string | null>(null);

	const productId = parseInt(route.params.id as string);

	const placeholderImage = new URL(
		'@/assets/images/placeholder-product.png',
		import.meta.url,
	).href;

	const nutrition = computed(() => {
		return product.value?.nutrition_characteristics || {
			nutritional_value: 0,
			fats: 0,
			proteins: 0,
			carbohydrates: 0
		};
	});

	const hasNutritionInfo = computed(() => {
		if (!product.value?.nutrition_characteristics) return false;
		const n = product.value.nutrition_characteristics;
		return n.nutritional_value > 0 || n.fats > 0 || n.proteins > 0 || n.carbohydrates > 0;
	});

	const addToBasket = () => {
		if (product.value) {
			basketStore.addItem(product.value);
		}
	};

	onMounted(async () => {
		try {
			const data = await ShopService.getProductById(productId);
			product.value = data;
			isLoading.value = false;
		} catch (err) {
			console.error('Failed to fetch product:', err);
			error.value = t('errors.failedToLoadProduct');
		} finally {
			isLoading.value = false;
		}
	});

	const handleImageError = (event: Event) => {
		const img = event.target as HTMLImageElement;
		img.src = placeholderImage;
	};
</script>
