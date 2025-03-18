<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Back to shop button -->
    <NuxtLink
      :to="localePath(`/shop/${shopId}`)"
      class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
    >
      <span>← {{ t('back.toShop') }}</span>
    </NuxtLink>

    <div v-if="error" class="text-red-600 mb-4">{{ error }}</div>

    <template v-else>
      <!-- Category Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold mb-2">{{ category?.name }}</h1>
        <p class="text-gray-600">{{ category?.shop_name }}</p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <p class="text-gray-500">{{ t('loading') }}</p>
      </div>

      <!-- Commodity Groups Grid -->
      <CommodityGroupsGrid
        v-else
        :commodity-groups="commodityGroups.results || []"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Category } from '~/types/category';
import type { PaginatedResponse } from '~/types/category';
import type { CommodityGroup } from '~/types/commodity-group';
import { ShopService } from '~/services/ShopService';
import CommodityGroupsGrid from '~/components/features/commodity-group-categories/commodity-groups-grid.vue';

const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();

const shopId = parseInt(route.params.shopId as string);
const categoryId = parseInt(route.params.id as string);

const category = ref<Category | null>(null);
const commodityGroups = ref<PaginatedResponse<CommodityGroup>>({
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

onMounted(async () => {
  try {
    const [categoryData, commodityGroupsData] = await Promise.all([
      ShopService.getCommodityGroupCategoryById(categoryId),
      ShopService.getCommodityGroupsByCategory(shopId, categoryId)
    ]);

    category.value = categoryData;
    commodityGroups.value = commodityGroupsData;
  } catch (err) {
    console.error('Failed to fetch category data:', err);
    error.value = t('errors.failedToLoad');
  } finally {
    isLoading.value = false;
  }
});
</script> 