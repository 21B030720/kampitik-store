<template>
  <div class="bg-white rounded-2xl border-2 border-[#E8EDF5] p-6">
    <!-- Back to Shop -->
    <div class="flex justify-between items-center mb-6">
      
      <NuxtLink
        :to="localePath(`/shop/${product.shop_id}`)"
        class="text-primary-600 flex items-center gap-2 text-lg md:text-xl bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-[#E8EDF5] hover:text-black hover:border-primary-600 transition-colors"
      >
        <img src="~/assets/icons/shop.svg" alt="Shop" class="w-12 h-12 md:w-8 md:h-8">
        <span>{{ product.shop_name }}</span>
      </NuxtLink>
    </div>
    <!-- Product Header -->
    <div class="grid md:grid-cols-2 gap-8">
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
      <div class="flex flex-col space-y-4">
        <div>
          <h1 class="text-3xl font-bold mb-2">{{ product.name }}</h1>
          <p class="text-gray-600">{{ truncatedDescription }}</p>
        </div>

        <div class="flex items-center gap-2">
          <span v-if="product.avg_rating" class="flex items-center gap-1">
            <span class="text-yellow-400">★</span>
            <span>{{ product.avg_rating }}</span>
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
          <p>{{ product.commodity_group_name }}</p>
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

        <!-- Spacer to push the buttons to the bottom -->
        <div class="flex-grow"></div>

        <!-- Details Button -->
        <NuxtLink
          :to="localePath(`/products/${product.id}`)"
          class="w-full text-center bg-white text-gray-600 py-2 rounded-lg border-2 border-[#E8EDF5] hover:bg-[#E8EDF5] transition-colors"
        >
          {{ t('product.details') }}
        </NuxtLink>

        
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useBasketStore } from '~/stores/useBasketStore';
import type { Product } from '~/types/product';
import AddToBasketButton from '~/components/shared/add-to-basket-button-big.vue';

const props = defineProps<{
  product: Product;
}>();

const { t } = useI18n();
const localePath = useLocalePath();
const router = useRouter();
const basketStore = useBasketStore();

const placeholderImage = new URL(
  '@/assets/images/placeholder-product.png',
  import.meta.url,
).href;

const nutrition = computed(() => {
  return props.product.nutrition_characteristics || {
    nutritional_value: 0,
    fats: 0,
    proteins: 0,
    carbohydrates: 0
  };
});

const hasNutritionInfo = computed(() => {
  if (!props.product.nutrition_characteristics) return false;
  const n = props.product.nutrition_characteristics;
  return n.nutritional_value > 0 || n.fats > 0 || n.proteins > 0 || n.carbohydrates > 0;
});

const truncatedDescription = computed(() => {
  const maxLength = 100; // Set the maximum length for the description
  if (props.product.description.length > maxLength) {
    return props.product.description.substring(0, maxLength) + '...';
  }
  return props.product.description;
});

const addToBasket = () => {
  basketStore.addItem(props.product);
};

const goBack = () => {
  router.back();
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = placeholderImage;
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>