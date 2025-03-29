<template>
  <div>
    <label class="block text-sm font-medium mb-3">
      {{ t('catalog.filters.priceRange') }}: {{ localFilters.from_price || 0 }} - {{ localFilters.to_price || maxPrice }} {{ t('common.currency') }}
    </label>
    <div class="relative h-14">
      <!-- Track -->
      <div class="absolute h-2 bg-gray-200 rounded-full w-full top-1/2 -translate-y-1/2" />

      <!-- Selected Range -->
      <div 
        class="absolute h-2 bg-blue-500 rounded-full top-1/2 -translate-y-1/2"
        :style="{
          left: `${((localFilters.from_price || 0) / maxPrice) * 100}%`,
          width: `${((localFilters.to_price || maxPrice) - (localFilters.from_price || 0)) / maxPrice * 100}%`
        }"
      />

      <!-- Min Price Thumb -->
      <input
        v-model.number="localFilters.from_price"
        type="range"
        :min="0"
        :max="maxPrice"
        class="range-input absolute w-full top-1/2 -translate-y-1/2"
        @input="handleInput"
      >

      <!-- Max Price Thumb -->
      <input
        v-model.number="localFilters.to_price"
        type="range"
        :min="0"
        :max="maxPrice"
        class="range-input absolute w-full top-1/2 -translate-y-1/2"
        @input="handleInput"
      >
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
  maxPrice: number;
  handleInput: () => void;
}>();
</script>

<style scoped>
.range-input {
  -webkit-appearance: none;
  pointer-events: none;
  background: transparent;
  height: 0;
  width: 100%;
}

.range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  pointer-events: auto;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: blue;
  border: 2px solid blue;
  cursor: pointer;
  margin-top: -11px;
  transition: all 0.2s ease;
  z-index: 1;
  position: relative;
}

.range-input::-moz-range-thumb {
  pointer-events: auto;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: blue;
  border: 2px solid blue;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 1;
  position: relative;
}

/* Hide default focus styles */
.range-input:focus {
  outline: none;
}

/* Custom focus styles */
.range-input:focus::-webkit-slider-thumb {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.range-input:focus::-moz-range-thumb {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

/* Hover styles */
.range-input::-webkit-slider-thumb:hover {
  background: gray;
  border-color: gray;
}

.range-input::-moz-range-thumb:hover {
  background: gray;
  border-color: gray;
}
</style>