<template>
  <div class="flex items-center p-20 bg-[#FFF8F8] rounded-lg shadow-md relative">
    <!-- Text Section -->
    <div class="mr-4 flex-1 relative h-full">
      <!-- Title -->
      <h2 class="text-2xl font-bold mb-2">Convenience at Your Fingertips</h2>
      <!-- Description -->
      <p class="text-lg mb-10">All the services you need in one app</p>
    </div>
    <!-- Image Section -->
    <div class="flex-shrink-0">
      <img :src="imageSrc" alt="Convenience Image" class="h-[300px] object-cover rounded-lg">
    </div>
  </div>
</template>

<script setup lang="ts">
import imageSrc from '@/assets/images/convinience.jpeg'; // Replace with your image path
</script>

<style scoped>
/* Add any additional styles here */
</style>