<template>
  <div class="flex items-center p-20 bg-[#E9F5FF] rounded-lg shadow-md relative">
    <!-- Image Section -->
    <div class="flex-shrink-0">
      <img :src="imageSrc" alt="Baby Image" class="h-[300px] object-cover rounded-lg">
    </div>
    <!-- Text Section -->
    <div class="ml-4 flex-1 relative h-full">
      
      <!-- Title -->
      <h2 class="text-2xl font-bold mb-2">Who Says All Stores and Services For Your Baby In One App?</h2>
      <!-- Description -->
      <p class="text-lg mb-10">Find many shops</p>
    </div>
    <!-- Icon -->
    <img src="@/assets/icons/shop_blue.svg" alt="Shop Icon" class="absolute top-10 right-10 w-12 h-12 ">
  </div>
</template>

<script setup lang="ts">
import imageSrc from '@/assets/images/baby_shop.webp'; // Replace with your image path
</script>

<style scoped>
/* Add any additional styles here */
</style>