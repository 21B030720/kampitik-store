<template>
  <div class="p-6 w-full md:w-2/3">
    <!-- Level and Age -->
    <div class="flex items-center gap-3 mb-6">
      <div class="flex items-center gap-2 text-gray-800">
        <img
          :src="kid.kid_level.level_image || getDefaultImage(kid.kid_level.level_position)"
          :alt="kid.kid_level.level_name"
          class="level-image"
        >
        <span>{{ kid.kid_level.level_name }}</span>
      </div>
      <span class="text-gray-600">•</span>
      <span class="text-gray-800">{{ kid.age }} {{ t('common.years') }}</span>
    </div>

    <!-- XP Progress -->
    <div class="mb-6">
      <div class="flex justify-between items-end mb-2">
        <h2 class="font-semibold">Experience</h2>
        <p class="text-xl font-bold text-primary-600">{{ kid.xp }} XP</p>
      </div>
      <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          class="h-full bg-blue-600 transition-all"
          :style="{ width: `${kid.xp / (kid.kid_level.to_xp) * 100}%` }"
        />
      </div>
      <div class="flex justify-between text-sm text-gray-500 mt-1">
        <span>Level {{ kid.kid_level.level_position }}</span>
        <span>{{ kid.kid_level.from_xp }} XP - {{ kid.kid_level.to_xp }} XP</span>
        <span>Level {{ kid.kid_level.next_level_position }}</span>
      </div>
    </div>
    
    <!-- Details -->
    <div>
      <h2 class="font-semibold mb-2">{{ t('cabinet.kidDetails') }}</h2>
      <p class="text-gray-600">{{ kid.details }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';
  import { useI18n } from 'vue-i18n';
  import type { KidDetails } from '~/types/kid';
  
  import level_1 from '@/assets/images/level/level_1.png';
  import level_2 from '@/assets/images/level/level_2.png';
  import level_3 from '@/assets/images/level/level_3.png';
  import level_4 from '@/assets/images/level/level_4.png';
  import level_5 from '@/assets/images/level/level_5.png';
  import level_6 from '@/assets/images/level/level_6.png';
  import placeholderKid from '@/assets/images/placeholder-kid.jpg';
  
  const { t } = useI18n();
  
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
      return placeholderKid;
    }
  };
  
  const props = defineProps<{
    kid: KidDetails;
  }>();
</script>

<style scoped>
.level-image {
  height: 32px; 
  width: auto;
  object-fit: contain;
}
</style>