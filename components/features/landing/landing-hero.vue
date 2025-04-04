<template>
  <div class="flex-1 mt-4 overflow-hidden">
    <!-- Heading -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-primary">
        FIND EVERYTHING FOR YOUR CHILD IN ONE PLATFORM
      </h1>
    </div>
    <!-- Hero Image -->
    <div class="flex justify-center">
      <img
        :src="imageSource"
        alt="Hero image"
        class="w-full h-auto object-cover"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import imageSrc from '@/assets/images/hero.jpg';

const { t } = useI18n();

const imageSource = imageSrc;
</script>

<style scoped>
.text-primary {
  color: #3490dc;
}
.bg-primary {
  background-color: #3490dc;
}
.hover\:bg-primary-dark:hover {
  background-color: #2779bd;
}
.focus\:ring-primary:focus {
  --tw-ring-color: #3490dc;
}
</style>