<template>
<div class="flex-1 mt-6 bg-[#E8EDF5] overflow-hidden">
  <div class="flex">
    <div
      v-for="(src, index) in imageSources"
      :key="index"
      class="flex-1 h-100 bg-cover bg-center"
    >
      <img
        :src="src"
        :alt="`Hero image ${index + 1}`"
        class="w-full h-full object-cover"
      >
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import imageSrc1 from '@/assets/images/hero/hero-1.jpeg';
import imageSrc2 from '@/assets/images/hero/hero-2.jpg';
import imageSrc3 from '@/assets/images/hero/hero-3.jpeg';
import imageSrc4 from '@/assets/images/hero/hero-4.jpg';
import imageSrc5 from '@/assets/images/hero/hero-5.jpg';

const { t } = useI18n();

const imageSources = [imageSrc1, imageSrc2, imageSrc3, imageSrc4, imageSrc5];
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

/* Optional: Add hover effect to consultant images */
.rounded-full:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease-in-out;
}
</style>