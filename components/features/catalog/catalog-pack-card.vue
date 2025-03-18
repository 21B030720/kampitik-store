<template>
  <NuxtLink
    :to="localePath(`/bundles/${pack.id}`)"
    class="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
  >
    <div class="aspect-square relative">
      <img
        :src="pack.image || placeholderImage"
        :alt="pack.name"
        class="w-full h-full object-cover"
        @error="handleImageError"
      />
      <div 
        class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm"
        v-if="pack.discount"
      >
        -{{ pack.discount }}
      </div>
    </div>
    <div class="p-4">
      <h3 class="font-semibold text-lg mb-2">{{ pack.name }}</h3>
      <p v-if="pack.description" class="text-gray-600 text-sm mb-4 line-clamp-2">
        {{ pack.description }}
      </p>
      <div class="flex items-center justify-between">
        <p v-if="!basketStore.getItemQuantity(pack.id, 'BUNDLE')" class="text-gray-600 font-medium whitespace-nowrap">
					<p class="font-bold text-lg">{{ pack.price }}₸</p>
				</p>
        <AddToBasketButton
          :item="{ ...pack, type: 'BUNDLE' }"
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
</style>