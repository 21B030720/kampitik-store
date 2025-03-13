<template>
  <div class="bg-white rounded-lg shadow-lg p-4">
    <h3 class="text-lg font-medium text-gray-900 mb-4">{{ t('catalog.additionalFilters') }}</h3>
    
    <div class="space-y-4">
      <!-- Name Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          {{ t('catalog.filters.name') }}
        </label>
        <input
          v-model="nameModel"
          type="text"
          class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      <!-- Category Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          {{ t('catalog.filters.category') }}
        </label>
        <input
          v-model="categoryModel"
          type="text"
          class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  name?: string;
  categoryName?: string;
}>();

const emit = defineEmits<{
  (e: 'update:name', value: string): void;
  (e: 'update:categoryName', value: string): void;
}>();

const nameModel = computed({
  get: () => props.name ?? '',
  set: (value: string) => emit('update:name', value)
});

const categoryModel = computed({
  get: () => props.categoryName ?? '',
  set: (value: string) => emit('update:categoryName', value)
});
</script> 