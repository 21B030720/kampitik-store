<template>
  <div class="bg-white rounded-2xl border border-2 border-[#E8EDF5] p-4 space-y-4 mb-10">
    <h2 class="font-semibold text-lg">{{ t('catalog.additionalFilters') }}</h2>

    <div class="space-y-4">
      <NameFilter
        :localFilters="localFilters"
        :handleInput="handleInput"
        :isDebouncing="isDebouncing"
      />
      <CategoryFilter
        :localFilters="localFilters"
        :categories="categories"
        :handleInput="handleInput"
        :isDebouncing="isDebouncing"
      />
      <CommodityGroupCategoryFilter
        v-if="contentType === 'product'"
        :localFilters="localFilters"
        :commodityGroupCategories="commodityGroupCategories"
        :fetchCommodityGroups="fetchCommodityGroups"
        :isDebouncing="isDebouncing"
      />
      <CommodityGroupFilter
        v-if="contentType === 'product' && localFilters.commodity_group_category_id"
        :localFilters="localFilters"
        :commodityGroups="commodityGroups"
        :handleInput="handleInput"
        :isDebouncing="isDebouncing"
      />
      <PriceRangeFilter
        :localFilters="localFilters"
        :maxPrice="maxPrice"
        :handleInput="handleInput"
      />
      <AgeRangeFilter
        :localFilters="localFilters"
        :maxAge="maxAge"
        :showAgeFilters="showAgeFilters"
        :handleInput="handleInput"
      />

      <!-- Apply Button with loading state -->
      <!-- <button
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors relative"
        @click="applyFilters"
        :disabled="isDebouncing"
      >
        <span :class="{ 'opacity-0': isDebouncing }">
          {{ t('catalog.filters.apply') }}
        </span>
        <div 
          v-if="isDebouncing" 
          class="absolute inset-0 flex items-center justify-center"
        >
          <div class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
        </div>
      </button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeUnmount, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Category } from '~/types/category';
import type { CommodityGroup } from '~/types/commodity-group';
import type { ProductFilterParams } from '~/types/product';
import { ShopService } from '~/services/ShopService';

import NameFilter from '~/components/features/catalog/additional-filter-variants/name-filter.vue';
import CategoryFilter from '~/components/features/catalog/additional-filter-variants/category-filter.vue';
import CommodityGroupCategoryFilter from '~/components/features/catalog/additional-filter-variants/commodity-group-category-filter.vue';
import CommodityGroupFilter from '~/components/features/catalog/additional-filter-variants/commodity-group-filter.vue';
import PriceRangeFilter from '~/components/features/catalog/additional-filter-variants/price-range-filter.vue';
import AgeRangeFilter from '~/components/features/catalog/additional-filter-variants/age-range-filter.vue';

const { t } = useI18n();

const props = defineProps<{
  contentType: string;
  categories: Category[];
}>();

const emit = defineEmits<{
  (e: 'update:filters', filters: ProductFilterParams): void;
}>();

const maxAge = 18;
const maxPrice = 100000;
const showAgeFilters = true;

const localFilters = reactive<ProductFilterParams>({
  name: '',
  category_name: '',
  from_age: 0,
  to_age: maxAge,
  from_price: 0,
  to_price: 10000,
  commodity_group_category_id: null,
  commodity_group_id: null
});

const commodityGroupCategories = ref<Category[]>([]);
const commodityGroups = ref<CommodityGroup[]>([]);

let debounceTimer: NodeJS.Timeout | null = null;
const isDebouncing = ref(false);

const handleInput = () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  isDebouncing.value = true;
  debounceTimer = setTimeout(() => {
    emitFilters();
    isDebouncing.value = false;
  }, 3000);
};

const emitFilters = () => {
  emit('update:filters', { ...localFilters });
};

const applyFilters = () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }
  isDebouncing.value = false;
  emitFilters();
};

const fetchCommodityGroupCategories = async () => {
  try {
    commodityGroupCategories.value = await ShopService.getCommodityGroupCategories();
  } catch (err) {
    console.error('Failed to fetch commodity group categories:', err);
  }
};

const fetchCommodityGroups = async () => {
  if (localFilters.commodity_group_category_id) {
    try {
      commodityGroups.value = await ShopService.getCommodityGroups(localFilters.commodity_group_category_id);
    } catch (err) {
      console.error('Failed to fetch commodity groups:', err);
    }
  } else {
    commodityGroups.value = [];
  }
};

watch(() => localFilters.category_name, fetchCommodityGroupCategories);

watch(() => localFilters.commodity_group_category_id, fetchCommodityGroups);

watch(() => props.contentType, (newContentType) => {
  if (newContentType === 'product') {
    fetchCommodityGroupCategories();
  }
});

onMounted(() => {
  if (props.contentType === 'product') {
    fetchCommodityGroupCategories();
  }
});

onBeforeUnmount(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  isDebouncing.value = false;
});
</script>