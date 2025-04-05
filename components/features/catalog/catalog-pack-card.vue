<template>
  <NuxtLink
    :to="localePath(`/bundles/${pack.id}`)"
    class="bg-white rounded-lg hover:bg-[#F6FFFE] transition-colors flex flex-col h-full relative group"
  >
    <div class="aspect-square relative rounded-lg overflow-hidden">
      <img
        :src="pack.image || placeholderImage"
        :alt="pack.name"
        class="w-full h-full object-cover rounded-lg"
        @error="handleImageError"
      >
      <div 
        class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm"
        v-if="pack.discount"
      >
        -{{ pack.discount }}%
      </div>
      <!-- Rating -->
      <div
        class="absolute top-2 left-2 bg-white rounded-full px-2 py-1 text-sm flex items-center gap-1"
      >
        <span>{{ pack.avg_rating ?? 0 }}</span>
        <span class="text-yellow-400">★</span>
      </div>
    </div>
    <div class="p-4 flex flex-col flex-grow">
      <div class="flex-grow">
        <h3 class="font-semibold text-lg mb-2 product-name">{{ pack.name }}</h3>
        <p v-if="pack.description" class="text-gray-600 text-sm mb-4 line-clamp-2">
          {{ pack.description }}
        </p>
      </div>
      <div class="flex items-center justify-between">
        <p v-if="!basketStore.getItemQuantity(pack.id, 'BUNDLE')" class="text-gray-600 font-medium whitespace-nowrap">
          <span class="font-bold text-lg">{{ pack.price }}₸</span>
        </p>
        <AddToBasketButton
          :item="{ ...pack, type: 'BUNDLE' }"
          class="ml-auto"
          @click.prevent
        />
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { Bundle } from '~/types/bundle';
import { useBasketStore } from '~/stores/useBasketStore';
import AddToBasketButton from '~/components/shared/add-to-basket-button.vue';

const { t } = useI18n();
const localePath = useLocalePath();
const basketStore = useBasketStore();

defineProps<{
  pack: Bundle;
}>();

const placeholderImage = new URL(
  '@/assets/images/placeholder-bundle.png',
  import.meta.url
).href;

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = placeholderImage;
};
</script>

<style scoped>
.aspect-square {
  aspect-ratio: 1;
}
.product-name {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* Limit to 2 lines */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>