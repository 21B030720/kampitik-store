<template>
  <div class="bg-white rounded-lg shadow p-4 space-y-4 mb-10">
    <h2 class="font-semibold text-lg">{{ t('catalog.additionalFilters') }}</h2>
    
    <div class="space-y-4">
      <!-- Name and Category Filters in one line -->
      <div class="flex gap-4">
        <!-- Name Filter -->
        <div class="flex-1">
          <label class="block text-sm font-medium mb-1">
            {{ t('catalog.filters.name') }}
          </label>
          <input
            v-model="localFilters.name"
            type="text"
            class="w-full border rounded-lg p-2"
            @input="debouncedEmit"
          />
        </div>

        <!-- Category Filter -->
        <div class="flex-1">
          <label class="block text-sm font-medium mb-1">
            {{ t('catalog.filters.category') }}
          </label>
          <select
            v-model="localFilters.category_name"
            class="w-full border rounded-lg p-2"
            @change="debouncedEmit"
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
            ></div>

            <!-- Min Thumb -->
            <input
              v-model.number="localFilters.from_age"
              type="range"
              :min="0"
              :max="maxAge"
              :value="localFilters.from_age || 0"
              class="range-input absolute w-full top-1/2 -translate-y-1/2"
              @input="handleFromAgeInput"
            />

            <!-- Max Thumb -->
            <input
              v-model.number="localFilters.to_age"
              type="range"
              :min="0"
              :max="maxAge"
              :value="localFilters.to_age || maxAge"
              class="range-input absolute w-full top-1/2 -translate-y-1/2"
              @input="handleToAgeInput"
            />
          </div>

          <!-- Age Input Fields -->
          <!-- <div class="flex gap-4 mt-2">
            <div class="flex-1">
              <input
                v-model.number="localFilters.from_age"
                type="number"
                :min="0"
                :max="maxAge"
                class="w-full border rounded-lg p-2 text-sm"
                @input="handleFromAgeInput"
              />
            </div>
            <div class="flex items-center">-</div>
            <div class="flex-1">
              <input
                v-model.number="localFilters.to_age"
                type="number"
                :min="0"
                :max="maxAge"
                class="w-full border rounded-lg p-2 text-sm"
                @input="handleToAgeInput"
              />
            </div>
          </div> -->
        </div>
      </div>

      <!-- Apply Button -->
      <button
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        @click="applyFilters"
      >
        {{ t('catalog.filters.apply') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Category } from '~/types/category';
import { ShopService } from '~/services/ShopService';
import { ContentType, MenuSubtype, ActivitiesSubtype, ServicesSubtype } from '~/types/content-type';
import type { ProductFilterParams } from '~/types/product';

const { t } = useI18n();

const props = defineProps<{
  contentType: ContentType;
  categories: Category[];
}>();

const emit = defineEmits<{
  (e: 'update:filters', filters: ProductFilterParams): void;
}>();

const maxAge = 100;

// Initialize with default values
const localFilters = ref<ProductFilterParams>({
  name: '',
  category_name: '',
  from_age: 0,
  to_age: 1
});
let debounceTimer: NodeJS.Timeout | null = null;

// Show age filters for products, events, courses, and services
const showAgeFilters = computed(() => {
  return [
    ContentType.MENU,
    ContentType.ACTIVITIES,
    ContentType.SERVICES
  ].includes(props.contentType);
});

// Debounced emit function
const debouncedEmit = () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  
  debounceTimer = setTimeout(() => {
    emitFilters();
  }, 3000);
};

// Function to emit filters
const emitFilters = () => {
  emit('update:filters', {
    ...localFilters.value,
    ...(showAgeFilters.value ? {
      from_age: localFilters.value.from_age,
      to_age: localFilters.value.to_age
    } : {
      from_age: null,
      to_age: null
    })
  });
};

// Immediate apply function for the button
const applyFilters = () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  emitFilters();
};

// Modified handlers for age inputs
const handleFromAgeInput = () => {
  const fromAge = localFilters.value.from_age ?? 0;
  const toAge = localFilters.value.to_age ?? maxAge;
  
  // Ensure from_age doesn't exceed to_age
  if (fromAge > toAge) {
    localFilters.value.from_age = toAge;
  }
  debouncedEmit();
};

const handleToAgeInput = () => {
  const fromAge = localFilters.value.from_age ?? 0;
  const toAge = localFilters.value.to_age ?? maxAge;
  
  // Ensure to_age isn't less than from_age
  if (toAge < fromAge) {
    localFilters.value.to_age = fromAge;
  }
  debouncedEmit();
};

// Clean up timer when component is destroyed
onBeforeUnmount(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
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
  box-shadow: 0 0 0 3px rgba(var(--color-primary-600), 0.2);
}

.range-input:focus::-moz-range-thumb {
  box-shadow: 0 0 0 3px rgba(var(--color-primary-600), 0.2);
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