<template>
	<NuxtLink
		:to="localePath(`/products/${product.id}`)"
		class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col h-full"
	>
		<div class="aspect-square relative">
			<img
				v-if="product.image"
				:src="product.image"
				:alt="product.name"
				class="w-full h-full object-cover rounded-t-lg"
				@error="handleImageError"
			>
			<div
				v-else
				class="w-full h-full bg-gray-200 rounded-t-lg flex items-center justify-center"
			>
				<span class="text-gray-400">No image</span>
			</div>
			<div
				v-if="product.rating"
				class="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-sm flex items-center gap-1"
			>
				<span>{{ product.rating }}</span>
				<span class="text-yellow-400">★</span>
			</div>
		</div>

		<div class="p-4 flex flex-col flex-grow">
			<div class="flex-grow">
				<div class="flex justify-between items-start mb-2">
					<div>
						<h2 class="text-lg font-semibold">{{ product.name }}</h2>
						<p class="text-gray-600">
							{{ product.price }}тг/{{ product.measure }}
						</p>
					</div>
				</div>

				<p v-if="product.description" class="text-sm text-gray-600 mb-2">
					{{ product.description }}
				</p>

				<div class="text-sm text-gray-500">
					<p>Age: {{ product.from_age }}-{{ product.to_age }} years</p>
					<p>{{ product.category_name }}</p>
					<p>{{ product.shop_name }}</p>
				</div>

				<!-- Nutrition info -->
				<div v-if="hasNutritionInfo" class="mt-2 text-sm">
					<p class="font-medium">{{ t('product.nutritionPer100g') }}:</p>
					<div class="grid grid-cols-2 gap-2">
						<p>
							{{ t('product.nutritionalValue') }}:
							{{ product.nutrition_characteristics.nutritional_value }}kcal
						</p>
						<p>
							{{ t('product.fats') }}:
							{{ product.nutrition_characteristics.fats }}g
						</p>
						<p>
							{{ t('product.proteins') }}:
							{{ product.nutrition_characteristics.proteins }}g
						</p>
						<p>
							{{ t('product.carbs') }}:
							{{ product.nutrition_characteristics.carbohydrates }}g
						</p>
					</div>
				</div>
			</div>

			<!-- Add to Basket Button at the bottom -->
			<div class="mt-4 pt-4 border-t">
				<AddToBasketButton :product="product" />
			</div>
		</div>
	</NuxtLink>
</template>

<script setup lang="ts">
	import type { Product } from '~/types/product';
	import { useI18n } from 'vue-i18n';
	import AddToBasketButton from '~/components/shared/add-to-basket-button.vue';

	const { t } = useI18n();
	const localePath = useLocalePath();

	const props = defineProps<{
		product: Product;
	}>();

	defineEmits<{
		(e: 'add-to-basket', product: Product): void;
	}>();

	const hasNutritionInfo = computed(() => {
		const nutrition = props.product.nutrition_characteristics;
		return (
			nutrition.nutritional_value > 0 ||
			nutrition.fats > 0 ||
			nutrition.proteins > 0 ||
			nutrition.carbohydrates > 0
		);
	});

	const handleImageError = (event: Event) => {
		const img = event.target as HTMLImageElement;
		img.style.display = 'none';
		img.parentElement!.innerHTML =
			'<span class="text-gray-400">No image</span>';
	};
</script>

<style scoped>
	.aspect-square {
		aspect-ratio: 1;
	}
</style>
