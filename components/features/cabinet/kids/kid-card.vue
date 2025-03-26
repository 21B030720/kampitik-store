<template>
  <NuxtLink
    :to="localePath(`/kids/${kid.id}`)"
    class="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
  >
    <!-- Kid Card Content -->
    <div class="aspect-square relative">
      <img
        :src="kid.image || placeholderImage"
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
  
  const { t } = useI18n();
  const localePath = useLocalePath();
  
  defineProps<{
    kid: Kid;
  }>();
  
  const placeholderImage = new URL(
    '@/assets/images/placeholder-kid.png',
    import.meta.url
  ).href;
  
  const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement;
    img.src = placeholderImage;
  };
</script>