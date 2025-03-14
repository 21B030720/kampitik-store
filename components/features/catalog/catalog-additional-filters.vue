<template>
  <div class="bg-white rounded-lg shadow p-4">
    <div class="flex flex-wrap gap-4 items-end">
      <!-- Name Filter -->
      <div class="flex-1 min-w-[200px]">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          {{ t('catalog.filters.name') }}
        </label>
        <input
          v-model="localName"
          type="text"
          class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          @input="handleNameInput"
        />
      </div>

      <!-- Category Filter -->
      <div class="flex-1 min-w-[200px]">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          {{ t('catalog.filters.category') }}
        </label>
        <div class="relative">
          <select
            v-model="categoryModel"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none"
            :disabled="isLoadingCategories"
          >
            <option value="">{{ t('catalog.filters.allCategories') }}</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.name"
            >
              {{ category.name }}
            </option>
          </select>
          <!-- Loading indicator -->
          <div 
            v-if="isLoadingCategories" 
            class="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <div class="animate-spin h-5 w-5 border-2 border-primary-500 rounded-full border-t-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Category } from '~/types/category';
import { ShopService } from '~/services/ShopService';
import { ContentType, MenuSubtype, ActivitiesSubtype, ServicesSubtype } from '~/types/content-type';

const { t } = useI18n();

const props = defineProps<{
  name?: string;
  categoryName?: string;
  contentType: ContentType;
  subtype?: MenuSubtype | ActivitiesSubtype | ServicesSubtype;
}>();

const emit = defineEmits<{
  (e: 'update:name', value: string): void;
  (e: 'update:categoryName', value: string): void;
}>();

const categories = ref<Category[]>([]);
const isLoadingCategories = ref(false);
const localName = ref(props.name ?? '');
let debounceTimer: NodeJS.Timeout | null = null;

const categoryModel = computed({
  get: () => props.categoryName ?? '',
  set: (value: string) => emit('update:categoryName', value)
});

const handleNameInput = () => {
  // Clear existing timer if it exists
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  
  // Set new timer
  debounceTimer = setTimeout(() => {
    emit('update:name', localName.value);
  }, 3000);
};

// Watch for external name changes
watch(() => props.name, (newValue) => {
  if (newValue !== localName.value) {
    localName.value = newValue ?? '';
  }
});

const fetchCategories = async () => {
  isLoadingCategories.value = true;
  try {
    switch (props.contentType) {
      case ContentType.MENU:
        if (props.subtype === MenuSubtype.PRODUCTS) {
          categories.value = await ShopService.getProductCategories();
        } else if (props.subtype === MenuSubtype.PACKS) {
          categories.value = await ShopService.getBundleCategories();
        }
        break;
      case ContentType.ACTIVITIES:
        if (props.subtype === ActivitiesSubtype.EVENTS) {
          categories.value = await ShopService.getEventCategories();
        } else if (props.subtype === ActivitiesSubtype.COURSES) {
          categories.value = await ShopService.getCourseCategories();
        }
        break;
      case ContentType.SERVICES:
        if (props.subtype === ServicesSubtype.SERVICES) {
          categories.value = await ShopService.getServiceCategories();
        }
        break;
    }
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  } finally {
    isLoadingCategories.value = false;
  }
};

// Clean up timer when component is destroyed
onBeforeUnmount(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
});

// Fetch categories when content type or subtype changes
watch([() => props.contentType, () => props.subtype], () => {
  fetchCategories();
});

onMounted(() => {
  fetchCategories();
});
</script> 