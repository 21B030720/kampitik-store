<template>
  <div class="relative">
    <label class="block text-sm font-medium mb-1">
      {{ t('catalog.filters.commodityGroupCategory') }}
    </label>
    <select
      v-model="localFilters.commodity_group_category_id"
      class="w-full border rounded-lg p-2"
      @change="handleCategoryChange"
    >
      <option value="">{{ t('catalog.filters.all') }}</option>
      <option
        v-for="groupCategory in commodityGroupCategories"
        :key="groupCategory.id"
        :value="groupCategory.id"
      >
        {{ truncateText(groupCategory.name) }}
      </option>
    </select>
    <!-- Loading indicator for commodity group category select -->
    <div v-if="isDebouncing" class="absolute right-8 top-[34px]">
      <div class="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Category } from '~/types/category';
import type { ProductFilterParams } from '~/types/product';

const { t } = useI18n();

const props = defineProps<{
  localFilters: ProductFilterParams;
  commodityGroupCategories: Category[];
  fetchCommodityGroups: () => void;
  isDebouncing: boolean;
}>();

const handleCategoryChange = () => {
  props.localFilters.commodity_group_id = ''; // Set to "all" value
  props.fetchCommodityGroups();
};

const truncateText = (text: string, maxLength = 18) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};
</script>