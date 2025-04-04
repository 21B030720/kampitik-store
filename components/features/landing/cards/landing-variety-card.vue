<template>
  <div class="relative w-full h-[500px] bg-[#F2D4CC] rounded-xl p-6 shadow-md text-center">
    <h2 class="text-[32px] font-bold text-[#914C3F]">Variety</h2>
    <p class="text-sm text-[#914C3F] mt-1">
    There is a variety of events <br> for children and parents 
    </p>

    <!-- Floating Images -->
    <img :src="helmetImage" class="absolute w-28 top-30 left-0" >
    <img :src="tennisImage" class="absolute w-28 top-16 right-0" >
    <img :src="skateboardImage" class="absolute w-40 bottom-0 left-2" >
    <img :src="golfCartImage" class="absolute w-32 bottom-4 right-0 " >
  </div>
</template>

<script setup lang="ts">
import helmetImage from '@/assets/images/helmet.png';
import tennisImage from '@/assets/images/tennis.png';
import skateboardImage from '@/assets/images/skateboard.png';
import golfCartImage from '@/assets/images/golf-cart.png';
</script>

<style scoped>
/* Optional: Add animations or hover effects if needed */
</style>