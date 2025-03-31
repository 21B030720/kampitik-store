<template>
  <div class="flex flex-col items-center p-6 bg-blue-500 rounded-2xl shadow-lg">
    <h2 class="text-2xl font-bold mb-2 text-white">Baby Grow and Level Greending</h2>
    <p class="text-center text-base mb-6 text-white">Watch the growth stages from baby to teenager.</p>
    <div class="relative w-full mb-4">
      <!-- Images above points -->
      <div class="flex justify-between">
        <div
          v-for="(src, index) in imageSources"
          :key="index"
          class="flex flex-col items-center transition-transform transform hover:scale-105"
          :style="{ width: `${10 + index * 2}%` }"
        >
          <div class="flex-1 flex items-end">
            <img
              :src="src"
              :alt="`Growth stage ${index + 1}`"
              class="h-auto object-contain rounded-lg  mb-2"
            >
          </div>
          <div class="w-10 h-10 bg-white rounded-full border-2 border-blue-500 shadow-md mb-2"></div>
          <span class="text-white font-bold">{{ `Level ${index + 1}` }}</span>
        </div>
      </div>
      <!-- Line for points -->
      <div class="absolute inset-x-0 bottom-12 flex items-center justify-between">
        <div class="w-full h-1 bg-white"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import imageSrc1 from '@/assets/images/level/level_1.png';
import imageSrc2 from '@/assets/images/level/level_2.png';
import imageSrc3 from '@/assets/images/level/level_3.png';
import imageSrc4 from '@/assets/images/level/level_4.png';
import imageSrc5 from '@/assets/images/level/level_5.png';
import imageSrc6 from '@/assets/images/level/level_6.png';

const imageSources = [imageSrc1, imageSrc2, imageSrc3, imageSrc4, imageSrc5, imageSrc6];
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
.transition-transform {
  transition: transform 0.3s ease-in-out;
}
.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}
.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>