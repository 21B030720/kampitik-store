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
            v-if="contentType !== 'product' && contentType !== 'bundle'"
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
      <div>
        <label for="sort" class="block text-sm font-medium text-gray-700">{{ t('catalog.sortBy') }}</label>
        <select id="sort" v-model="localFilters.sort" @change="handleInput" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
          <option value="">{{ t('catalog.sortOptions.default') }}</option>
          <option value="price asc">{{ t('catalog.sortOptions.priceAsc') }}</option>
          <option value="price desc">{{ t('catalog.sortOptions.priceDesc') }}</option>
        </select>
      </div>
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
  commodity_group_id: null,
  sort: ''
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