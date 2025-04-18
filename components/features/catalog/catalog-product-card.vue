<template>
  <NuxtLink
    :to="localePath(`/products/${product.id}`)"
    class="bg-white rounded-lg hover:bg-[#F6FFFE] transition-colors flex flex-col h-full relative group"
  >
    <div class="aspect-square relative rounded-lg overflow-hidden">
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover rounded-lg"
        @error="handleImageError"
      >
      <div
        v-else
        class="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center"
      >
        <span class="text-gray-400">No image</span>
      </div>
      <!-- Rating -->
      <div
        class="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-sm flex items-center gap-1"
      >
        <span>{{ product.avg_rating ?? 0 }}</span>
        <span class="text-yellow-400">★</span>
      </div>
      <!-- Nutrition info overlay -->
      <div 
        v-if="product.nutrition_characteristics && hasNutritionInfo" 
        class="absolute bottom-0 rounded-lg left-0 right-0 bg-black/70 text-white p-3 text-sm backdrop-blur-sm"
      >
        <p class="font-medium mb-1">{{ t('product.nutritionPer100g') }}:</p>
        <div class="grid grid-cols-2 gap-x-4 gap-y-1">
          <p>
            {{ t('product.nutritionalValue') }}:
            {{ product.nutrition_characteristics?.nutritional_value || 0 }}kcal
          </p>
          <p>
            {{ t('product.fats') }}:
            {{ product.nutrition_characteristics?.fats || 0 }}g
          </p>
          <p>
            {{ t('product.proteins') }}:
            {{ product.nutrition_characteristics?.proteins || 0 }}g
          </p>
          <p>
            {{ t('product.carbs') }}:
            {{ product.nutrition_characteristics?.carbohydrates || 0 }}g
          </p>
        </div>
      </div>
      <!-- Info overlay on hover -->
      <div class="absolute inset-0 bg-black/70 text-white p-3 text-sm backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
        <div class="grid grid-cols-2 gap-x-4 gap-y-1">
          <p class="font-medium">{{ t('product.age') }}:</p>
          <p class="text-right">{{ product.from_age }}-{{ product.to_age }} years</p>
          <p class="font-medium">{{ t('product.category') }}:</p>
          <p v-if="product.category_name !== null" class="text-right">{{ product.category_name }}</p>
          <p v-else class="text-right">{{ product.commodity_group_name }}</p>
          <p class="font-medium">{{ t('product.shop') }}:</p>
          <p class="text-right">{{ product.shop_name }}</p>
        </div>
      </div>
    </div>

    <div class="p-4 flex flex-col flex-grow">
      <div class="flex-grow">
        <div class="flex justify-between items-start mb-2">
          <div>
            <h2 class="text-lg font-semibold product-name">{{ product.name }}</h2>
          </div>
        </div>

        <!-- <p v-if="product.description" class="text-sm text-gray-600 mb-2">
          {{ product.description }}
        </p> -->
      </div>

      <!-- Price and Add to Basket Button in horizontal layout -->
      <div class="mt-2 flex items-center justify-between">
        <p v-if="!basketStore.getItemQuantity(product.id, 'PRODUCT')" class="text-gray-600 font-medium whitespace-nowrap">
          {{ product.price }}тг/{{ product.measure }}
        </p>
        <AddToBasketButton 
          :item="{ ...product, type: 'PRODUCT' as const }" 
          class="ml-auto" 
        />
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
	import type { Product } from '~/types/product';
	import { useI18n } from 'vue-i18n';
	import AddToBasketButton from '~/components/shared/add-to-basket-button.vue';
	import { useBasketStore } from '~/stores/useBasketStore';

	const { t } = useI18n();
	const localePath = useLocalePath();
	const basketStore = useBasketStore();

	const props = defineProps<{
		product: Product;
	}>();

	defineEmits<{
		(e: 'add-to-basket', product: Product): void;
	}>();

	const hasNutritionInfo = computed(() => {
		const nutrition = props.product.nutrition_characteristics;
		return nutrition && (
			(nutrition.nutritional_value && nutrition.nutritional_value > 0) ||
			(nutrition.fats && nutrition.fats > 0) ||
			(nutrition.proteins && nutrition.proteins > 0) ||
			(nutrition.carbohydrates && nutrition.carbohydrates > 0)
		);
	});

	const handleImageError = (event: Event) => {
		const img = event.target as HTMLImageElement;
		img.style.display = 'none';
		img.parentElement!.innerHTML = '<span class="text-gray-400">No image</span>';
	};
</script>

<style scoped>
	.aspect-square {
		aspect-ratio: 1;
	}
	.product-name {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /* Limit to 2 lines */
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>