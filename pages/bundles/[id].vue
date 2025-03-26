<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="error" class="text-red-600 mb-4">{{ error }}</div>
    
    <div v-else-if="bundle" class="bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- Bundle Header -->
      <div class="p-6 border-b">
        <div class="flex items-start justify-between">
          <div>
            <h1 class="text-2xl font-bold mb-2">{{ bundle.name }}</h1>
            <p v-if="bundle.description" class="text-gray-600">
              {{ bundle.description }}
            </p>
          </div>
          <div class="text-right">
            <p class="text-2xl font-bold">{{ bundle.price }}₸</p>
            <p v-if="bundle.discount !== '0.00'" class="text-green-600">
              -{{ bundle.discount }}₸
            </p>
          </div>
        </div>
      </div>

      <!-- Bundle Products -->
      <div class="p-6">
        <h2 class="text-xl font-semibold mb-4">{{ t('bundle.includedProducts') }}</h2>
        <div class="grid gap-4">
          <div 
            v-for="product in products" 
            :key="product.id"
            class="flex items-center gap-4 p-4 border rounded-lg"
          >
            <img
              v-if="product.image"
              :src="product.image"
              :alt="product.name"
              class="w-16 h-16 object-cover rounded"
              @error="handleImageError"
            />
            <div class="flex-1">
              <h3 class="font-medium">{{ product.name }}</h3>
              <p class="text-sm text-gray-600">{{ product.description }}</p>
            </div>
            <p class="font-medium">{{ product.price }}₸</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex justify-center items-center py-8">
      <p class="text-gray-500">{{ t('loading') }}</p>
    </div>
    <ReviewsSection
        :fetch-reviews="() => ShopService.getBundleReviews(bundleId)"
        :submit-review="(rating, review) => ShopService.submitBundleReview(bundleId, rating, review)"
        :fetch-my-review="() => ShopService.getMyBundleReview(bundleId)"
        class="mt-8"
    />
  </div>
  
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { Bundle } from '~/types/bundle';
import type { Product } from '~/types/product';
import { ShopService } from '~/services/ShopService';
import ReviewsSection from '~/components/shared/reviews-section.vue';

const route = useRoute();
const { t } = useI18n();

const bundle = ref<Bundle | null>(null);
const products = ref<Product[]>([]);
const error = ref<string | null>(null);

const bundleId = parseInt(route.params.id as string);

onMounted(async () => {
  try {
    const id = Number(route.params.id);
    const [bundleData, productsData] = await Promise.all([
      ShopService.getBundleById(id),
      ShopService.getBundleProducts(id)
    ]);
    bundle.value = bundleData;
    products.value = productsData;
  } catch (err) {
    console.error('Failed to fetch bundle details:', err);
    error.value = t('errors.failedToLoadBundle');
  }
});

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement;
  img.style.display = 'none';
};
</script> 