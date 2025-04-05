<template>
  <div class="relative">
    <label class="block text-sm font-medium mb-1">
      {{ t('catalog.filters.category') }}
    </label>
    <select
      v-model="localFilters.category_name"
      class="w-full border rounded-lg p-2"
      @change="handleInput"
    >
      <option value="">{{ t('catalog.filters.allCategories') }}</option>
      <option
        v-for="category in categories"
        :key="category.name"
        :value="category.name"
      >
        {{ truncateText(category.name) }}
      </option>
    </select>
    <!-- Loading indicator for category select -->
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
  categories: Category[];
  handleInput: () => void;
  isDebouncing: boolean;
}>();

const truncateText = (text: string, maxLength = 18) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};
</script>