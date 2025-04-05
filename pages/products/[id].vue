<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="product" class="bg-white rounded-2xl border-2 border-[#E8EDF5]">
      <!-- Back to Shop -->
      <div class="p-6 flex justify-between items-center">
        <button @click="goBack" class="text-primary-600 hover:text-primary-700 flex items-center gap-2">
          <span>←</span>
          <span>{{ t('back.toShop') }}</span>
        </button>
        <NuxtLink
          :to="localePath(`/shop/${product.shop_id}`)"
          class="text-primary-600  flex items-center gap-2 text-lg md:text-xl bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-[#E8EDF5] hover:text-black hover:border-primary-600 transition-colors"
        >
          <img src="~/assets/icons/shop.svg" alt="Shop" class="w-12 h-12 md:w-8 md:h-8">
          <span>{{ product.shop_name }}</span>
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
        <div class="flex flex-col space-y-4">
          <div>
            <h1 class="text-3xl font-bold mb-2">{{ product.name }}</h1>
            <p class="text-gray-600">{{ product.description }}</p>
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

          <!-- Spacer to push the button to the bottom -->
          <div class="flex-grow"></div>

          <!-- Add to Basket Button -->
          <AddToBasketButton 
            v-if="product"
            :item="{
              ...product,
              type: 'PRODUCT'
            }" 
          />
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
    <ReviewsSection
      :fetch-reviews="() => ShopService.getProductReviews(productId)"
      :submit-review="(rating, review) => ShopService.submitProductReview(productId, rating, review)"
      :fetch-my-review="() => ShopService.getMyProductReview(productId)"
      class="mt-8"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useBasketStore } from '~/stores/useBasketStore';
import { ShopService } from '~/services/ShopService';
import type { Product } from '~/types/product';
import AddToBasketButton from '~/components/shared/add-to-basket-button-big.vue';
import ReviewsSection from '~/components/shared/reviews-section.vue';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const router = useRouter();
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

const goBack = () => {
  router.back();
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

<style scoped>
.container {
  max-width: 1200px;
}
</style>