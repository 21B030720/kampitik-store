<template>
  <div class="flex items-center p-20 bg-[#FFFFFF] rounded-lg relative">
    <!-- Text Section -->
    <div class="mr-4 flex-1 relative h-full">
      <!-- Title -->
      <h2 class="text-4xl text-[#4A4A4A] font-bold mb-2">One time pay and don’t worry about baby spending</h2>
      <!-- Description -->
      <p class="text-xl text-[#7A7A7A] mb-10">Payment system</p>
    </div>
    <!-- Image Section -->
    <div class="flex-shrink-0">
      <img :src="imageSrc" alt="Baby Image" class="h-[300px] object-cover rounded-lg">
    </div>
  </div>
</template>

<script setup lang="ts">
import imageSrc from '@/assets/images/one_time.png'; // Replace with your image path
</script>

<style scoped>
/* Add any additional styles here */
</style>