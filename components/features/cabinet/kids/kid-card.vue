<template>
  <NuxtLink
    :to="localePath(`/kids/${kid.id}`)"
    class="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
  >
    <!-- Kid Card Content -->
    <div class="aspect-square relative">
      <img
        :src="kid.image || getDefaultImage(kid.kid_level.level_position)"
        :alt="kid.name"
        class="w-full h-full object-cover"
        @error="handleImageError"
      >
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
        <div class="flex items-center gap-2">
          <img
            v-if="kid.kid_level.level_image"
            :src="kid.kid_level.level_image"
            :alt="kid.kid_level.level_name"
            class="w-6 h-6"
          >
          <span class="text-white text-sm">{{ kid.kid_level.level_name }}</span>
        </div>
      </div>
    </div>

    <div class="p-4">
      <div class="flex justify-between items-start mb-2">
        <div>
          <h3 class="font-semibold">{{ kid.name }}</h3>
          <p class="text-sm text-gray-600">{{ kid.age }} {{ t('common.years') }}</p>
        </div>
        <div class="text-right">
          <p class="font-medium text-primary-600">{{ kid.xp }} XP</p>
        </div>
      </div>
      
      <KidLevelProgress :kid-level="kid.kid_level" />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { Kid } from '~/types/kid';

import level_1 from '@/assets/images/level/level_1.png';
import level_2 from '@/assets/images/level/level_2.png';
import level_3 from '@/assets/images/level/level_3.png';
import level_4 from '@/assets/images/level/level_4.png';
import level_5 from '@/assets/images/level/level_5.png';
import level_6 from '@/assets/images/level/level_6.png';

const { t } = useI18n();
const localePath = useLocalePath();

defineProps<{
  kid: Kid;
}>();

const levelImages: { [key: number]: string } = {
  1: level_1,
  2: level_2,
  3: level_3,
  4: level_4,
  5: level_5,
  6: level_6,
};

const getDefaultImage = (level: number) => {
  if (level >= 1 && level <= 6) {
    return levelImages[level];
  } else if (level >= 7 && level <= 10) {
    return levelImages[6];
  } else {
    return new URL('@/assets/images/placeholder-kid.png', import.meta.url).href;
  }
};

const placeholderImage = new URL(
  '@/assets/images/placeholder-kid.png',
  import.meta.url
).href;

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = placeholderImage;
};
</script>