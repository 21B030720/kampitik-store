<template>
  <div class="relative w-full h-[500px] bg-[#F2D4CC] rounded-xl p-6 shadow-md text-center">
    <h2 class="text-[32px] font-bold text-[#914C3F]">Services</h2>
    <p class="text-sm text-[#914C3F] mt-1">
    It’s a like a app with everything <br> for parents: cources, <br> babysisters or tutors and etc.
    </p>

    <!-- Floating Images -->
    <img :src="toysImage" class="absolute w-120 top-60 left-1/2 transform -translate-x-1/2">
  </div>
</template>

<script setup lang="ts">
import toysImage from '@/assets/images/toys.png';
</script>

<style scoped>
/* Optional: Add animations or hover effects if needed */
</style>