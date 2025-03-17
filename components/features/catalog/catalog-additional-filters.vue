<template>
  <div class="bg-white rounded-lg shadow p-4 space-y-4">
    <h2 class="font-semibold text-lg">{{ t('catalog.additionalFilters') }}</h2>
    
    <div class="space-y-4">
      <!-- Name Filter -->
      <div>
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
      <div>
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

      <!-- Age Range Filters -->
      <div v-if="showAgeFilters" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">
            {{ t('catalog.filters.fromAge') }}
          </label>
          <input
            v-model.number="localFilters.from_age"
            type="number"
            min="0"
            class="w-full border rounded-lg p-2"
            @input="debouncedEmit"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">
            {{ t('catalog.filters.toAge') }}
          </label>
          <input
            v-model.number="localFilters.to_age"
            type="number"
            min="0"
            class="w-full border rounded-lg p-2"
            @input="debouncedEmit"
          />
        </div>
      </div>

      <!-- Apply Button -->
      <button
        class="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700"
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

const localFilters = ref<ProductFilterParams>({
  name: '',
  category_name: '',
  from_age: null,
  to_age: null
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

// Clean up timer when component is destroyed
onBeforeUnmount(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
});
</script> 