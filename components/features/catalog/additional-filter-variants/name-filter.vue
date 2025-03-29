<template>
  <div class="relative">
    <label class="block text-sm font-medium mb-1">
      {{ t('catalog.filters.name') }}
    </label>
    <input
      v-model="localFilters.name"
      type="text"
      class="w-full border rounded-lg p-2"
      @input="handleInput"
    >
    <!-- Loading indicator for name input -->
    <div v-if="isDebouncing" class="absolute right-2 top-[34px]">
      <div class="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { ProductFilterParams } from '~/types/product';

const { t } = useI18n();

const props = defineProps<{
  localFilters: ProductFilterParams;
  handleInput: () => void;
  isDebouncing: boolean;
}>();
</script>