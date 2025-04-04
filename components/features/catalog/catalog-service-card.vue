<template>
  <NuxtLink
    :to="localePath(`/services/${service.id}`)"
    class="bg-white rounded-lg hover:bg-[#F6FFFE] transition-colors flex flex-col h-full relative"
  >
    <div class="aspect-square relative rounded-lg overflow-hidden group">
      <img
        v-if="service.service_provider.profile_photo"
        :src="service.service_provider.profile_photo"
        :alt="service.title"
        class="w-full h-full object-cover rounded-lg"
        @error="handleImageError"
      >
      <div
        v-else
        class="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center"
      >
        <span class="text-gray-400">No image</span>
      </div>
      <!-- Rating -->
      <div
        v-if="service.service_provider.avg_rating"
        class="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-sm flex items-center gap-1"
      >
        <span>{{ service.service_provider.avg_rating }}</span>
        <span class="text-yellow-400">★</span>
      </div>
      <!-- Info overlay on hover -->
      <div class="absolute inset-0 bg-black/70 text-white p-3 text-sm backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
        <div class="grid grid-cols-2 gap-x-4 gap-y-1">
          <p class="font-medium">{{ t('service.provider') }}:</p>
          <p class="text-right">{{ service.service_provider.full_name }}</p>
          <p class="font-medium">{{ t('service.type') }}:</p>
          <p class="text-right">{{ service.service_type }}</p>
          <p class="font-medium">{{ t('service.location') }}:</p>
          <p class="text-right">{{ service.address }}</p>
        </div>
      </div>
    </div>

    <div class="p-4 flex flex-col flex-grow">
      <div class="flex-grow">
        <div class="flex justify-between items-start mb-2">
          <div>
            <h2 class="text-lg font-semibold service-title">{{ service.title }}</h2>
          </div>
        </div>
        <p v-if="service.details" class="text-sm text-gray-600 mb-2">
          {{ service.details }}
        </p>
      </div>

      <!-- Price and Payment Period in horizontal layout -->
      <div class="mt-2 flex items-center justify-between">
        <p class="text-lg font-bold">{{ service.price }}₸</p>
        <p v-if="service.payment_period" class="text-sm text-gray-600">
          /{{ service.payment_period }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Service } from '~/types/service';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const localePath = useLocalePath();

defineProps<{
  service: Service;
}>();

const placeholderImage = new URL('@/assets/images/placeholder-product.png', import.meta.url).href;

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement;
  img.src = placeholderImage;
};
</script>

<style scoped>
.aspect-square {
  aspect-ratio: 1;
}
.service-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* Limit to 2 lines */
  overflow: hidden;
  text-overflow: ellipsis;
}
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}
</style>