<template>
  <div class="flex-1 mt-4 overflow-hidden">
    <!-- Heading -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-primary">
        FIND EVERYTHING FOR YOUR CHILD IN ONE PLATFORM
      </h1>
    </div>
    <!-- Hero Images -->
    <div class="flex flex-wrap -mx-1">
      <!-- Column 1 -->
      <div class="flex flex-col flex-1 mx-1">
        <div class="height-large bg-cover bg-center mb-2">
          <img
            :src="imageSources[0]"
            alt="Hero image 1"
            class="w-full h-full object-cover"
          >
        </div>
        <div class="height-small bg-cover bg-center">
          <img
            :src="imageSources[1]"
            alt="Hero image 2"
            class="w-full h-full object-cover"
          >
        </div>
      </div>
      <!-- Column 2 -->
      <div class="flex flex-col flex-1 mx-1">
        <div class="height-small bg-cover bg-center mb-2">
          <img
            :src="imageSources[2]"
            alt="Hero image 3"
            class="w-full h-full object-cover"
          >
        </div>
        <div class="height-large bg-cover bg-center">
          <img
            :src="imageSources[3]"
            alt="Hero image 4"
            class="w-full h-full object-cover"
          >
        </div>
      </div>
      <!-- Column 3 -->
      <div class="flex flex-col flex-1 mx-1">
        <div class="height-large bg-cover bg-center mb-2">
          <img
            :src="imageSources[4]"
            alt="Hero image 5"
            class="w-full h-full object-cover"
          >
        </div>
        <div class="flex flex-row height-small">
          <div class="flex-1 bg-cover bg-center mr-1">
            <img
              :src="imageSources[5]"
              alt="Hero image 6"
              class="w-full h-full object-cover"
            >
          </div>
          <div class="flex-1 bg-cover bg-center ml-1">
            <img
              :src="imageSources[6]"
              alt="Hero image 7"
              class="w-full h-full object-cover"
            >
          </div>
        </div>
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
import imageSrc6 from '@/assets/images/hero/hero-6.jpeg';
import imageSrc7 from '@/assets/images/hero/hero-7.jpg';

const { t } = useI18n();

const imageSources = [imageSrc1, imageSrc2, imageSrc3, imageSrc4, imageSrc5, imageSrc6, imageSrc7];
</script>

<style scoped>
.height-large {
  height: 500px; /* Adjust this value as needed */
}

.height-small {
  height: 250px; /* Adjust this value as needed */
}

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