<template>
  <section v-if="categories.length > 0" class="mb-12">
    <h2 class="text-2xl font-bold mb-6 text-center">{{ t('shop.commodityCategories') }}</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink
        v-for="category in categories"
        :key="category.id"
        :to="localePath(`/shop/${shopId}/commodity-groups/categories/${category.id}`)"
        class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col items-center"
      >
        <div class="flex flex-col items-center gap-4">
          <div class="text-center">
            <h3 class="text-xl font-semibold mb-2">{{ category.name }}</h3>
          </div>
          <img
            :src="category.icon || placeholderImage"
            :alt="category.name"
            class="w-32 h-32 rounded-lg object-cover"
            @error="handleImageError"
          >
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { Category } from '~/types/category';

const { t } = useI18n();
const localePath = useLocalePath();

defineProps<{
  categories: Category[];
  shopId: number;
}>();

const placeholderImage = new URL(
  '@/assets/images/placeholder-commodity-group.png',
  import.meta.url
).href;

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = placeholderImage;
};
</script> 