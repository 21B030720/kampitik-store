<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <NuxtLink
      v-for="group in commodityGroups"
      :key="group.id"
      :to="localePath(`/commodity-groups/${group.id}`)"
      class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
    >
      <div class="flex items-start gap-6">
        <img
          :src="group.image || placeholderImage"
          :alt="group.name"
          class="w-24 h-24 rounded-lg object-cover"
          @error="handleImageError"
        >
        <div>
          <h3 class="text-xl font-semibold mb-2">{{ group.name }}</h3>
          <p class="text-base text-gray-600 mb-2">{{ group.description }}</p>
          <p class="text-base text-gray-500">
            {{ group.category_name }}
          </p>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { CommodityGroup } from '~/types/commodity-group';

const { t } = useI18n();
const localePath = useLocalePath();

defineProps<{
  commodityGroups: CommodityGroup[];
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