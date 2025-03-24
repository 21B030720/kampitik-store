<template>
  <div class="bg-white rounded-lg shadow p-4 space-y-4 mb-10">
    <h2 class="font-semibold text-lg">{{ t('catalog.additionalFilters') }}</h2>
    
    <div class="space-y-4">
      <!-- Name and Category Filters in one line -->
      <div class="flex gap-4">
        <!-- Name Filter -->
        <div class="flex-1 relative">
          <label class="block text-sm font-medium mb-1">
            {{ t('catalog.filters.name') }}
          </label>
          <input
            v-model="localFilters.name"
            type="text"
            class="w-full border rounded-lg p-2"
            @input="handleInput"
          />
          <!-- Loading indicator for name input -->
          <div v-if="isDebouncing" class="absolute right-2 top-[34px]">
            <div class="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        </div>

        <!-- Category Filter -->
        <div class="flex-1 relative">
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
              {{ category.name }}
            </option>
          </select>
          <!-- Loading indicator for category select -->
          <div v-if="isDebouncing" class="absolute right-8 top-[34px]">
            <div class="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        </div>
      </div>
      
      <!-- Price Range Filters -->
      <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-3">
                {{ t('catalog.filters.priceRange') }}: {{ localFilters.from_price || 0 }} - {{ localFilters.to_price || maxPrice }} {{ t('common.currency') }}
              </label>
              <div class="relative h-14">
                <!-- Track -->
                <div class="absolute h-2 bg-gray-200 rounded-full w-full top-1/2 -translate-y-1/2"></div>
                
                <!-- Selected Range -->
                <div 
                  class="absolute h-2 bg-blue-500 rounded-full top-1/2 -translate-y-1/2"
                  :style="{
                    left: `${((localFilters.from_price || 0) / maxPrice) * 100}%`,
                    width: `${((localFilters.to_price || maxPrice) - (localFilters.from_price || 0)) / maxPrice * 100}%`
                  }"
                ></div>
                
                <!-- Min Price Thumb -->
                <input
                  v-model.number="localFilters.from_price"
                  type="range"
                  :min="0"
                  :max="maxPrice"
                  class="range-input absolute w-full top-1/2 -translate-y-1/2"
                  @input="handleInput"
                />
                
                <!-- Max Price Thumb -->
                <input
                  v-model.number="localFilters.to_price"
                  type="range"
                  :min="0"
                  :max="maxPrice"
                  class="range-input absolute w-full top-1/2 -translate-y-1/2"
                  @input="handleInput"
                />
              </div>
            </div>
          </div>

      <!-- Age Range Filters -->
      <div v-if="showAgeFilters" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-3">
            {{ t('catalog.filters.ageRange') }}: {{ localFilters.from_age || 0 }} - {{ localFilters.to_age || maxAge }} {{ t('common.years') }}
          </label>
          <div class="relative h-14">
            <!-- Track -->
            <div class="absolute h-2 bg-gray-200 rounded-full w-full top-1/2 -translate-y-1/2"></div>
            
            <!-- Selected Range -->
            <div 
              class="absolute h-2 bg-blue-500 rounded-full top-1/2 -translate-y-1/2"
              :style="{
                left: `${((localFilters.from_age || 0) / maxAge) * 100}%`,
                width: `${((localFilters.to_age || maxAge) - (localFilters.from_age || 0)) / maxAge * 100}%`
              }"
            />

            <!-- Min Thumb -->
            <input
              v-model.number="localFilters.from_age"
              type="range"
              :min="0"
              :max="maxAge"
              class="range-input absolute w-full top-1/2 -translate-y-1/2"
              @input="handleInput"
            >

            <!-- Max Thumb -->
            <input
              v-model.number="localFilters.to_age"
              type="range"
              :min="0"
              :max="maxAge"
              class="range-input absolute w-full top-1/2 -translate-y-1/2"
              @input="handleInput"
            >
          </div>
        </div>
      </div>

      <!-- Apply Button with loading state -->
      <button
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
          <div class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Category } from '~/types/category';
import type { ProductFilterParams } from '~/types/product';

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
  to_price: 10000
});

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

onBeforeUnmount(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  isDebouncing.value = false;
});
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