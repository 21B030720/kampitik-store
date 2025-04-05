<template>
  <div class="flex flex-col items-center mb-12">
    <div class="relative flex items-center justify-center w-full mb-4">
      <div class="line" />
      <img
        :src="shop?.image || placeholderImage"
        :alt="shop?.name"
        class="w-48 h-48 rounded-full object-cover shadow-lg z-10"
        @error="handleImageError"
      >
      <div class="line" />
    </div>
    <h1 class="text-3xl font-bold text-center mb-2">{{ shop?.name }}</h1>
    <p class="text-gray-600 mb-2">{{ shop?.address }}</p>
    <p class="text-gray-500">{{ shop?.city_name }}</p>
    <div class="flex items-center gap-4 mt-4">
      <p v-if="shop?.open_from" class="text-sm text-gray-600">
        {{ t('shop.openFrom') }}: {{ shop.open_from }}
      </p>
      <p v-if="shop?.open_until" class="text-sm text-gray-600">
        {{ t('shop.openUntil') }}: {{ shop.open_until }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Shop } from '~/types/shop';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps<{
  shop: Shop | null;
}>();

const placeholderImage = new URL(
  '@/assets/images/placeholder-store.png',
  import.meta.url,
).href;

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = placeholderImage;
};
</script>

<style scoped>
.relative {
  position: relative;
}

.line {
  flex-grow: 1;
  height: 2px;
  background-color: #ccc;
}

.line:first-child {
  margin-right: 1rem;
}

.line:last-child {
  margin-left: 1rem;
}
</style>