<template>
  <div class="p-6 w-full md:w-2/3">
    <!-- Level and Age -->
    <div class="flex items-center gap-3 mb-6">
      <div class="flex items-center gap-2 text-gray-800">
        <img
          v-if="kid.kid_level.level_image"
          :src="kid.kid_level.level_image"
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
  
  const { t } = useI18n();
  
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