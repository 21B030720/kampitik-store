<template>
  <div class="relative w-full md:w-1/3">
    <img
      :src="kid?.image || getDefaultImage(kid.kid_level.level_position)"
      :alt="kid?.name"
      class="w-full h-full object-cover"
      @error="handleImageError"
    >
    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
      <h1 class="text-3xl font-bold text-white mb-2">{{ kid.name }}</h1>
    </div>

    <!-- Settings Button -->
    <button
      class="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
      @click="$emit('edit')"
    >
      <img
        src="@/assets/icons/settings.svg"
        alt="Settings"
        class="w-12 h-12"
      >
    </button>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    kid: Object,
    getDefaultImage: Function ,
    handleImageError: Function,
  });
  
  const emit = defineEmits(['edit']);
</script>