<template>
  <div class="flex p-20 bg-[#F2D4CC] rounded-lg items-center justify-start">
    <!-- Left Section: Bundle Layout -->
    <div class="bg-[#E5E1EC] p-8 rounded-2xl w-[400px] h-[280px] relative">
      <p class="text-xl text-center text-[#914f48] font-semibold mb-4">All In One</p>

      <!-- Central Box at the Bottom Center -->
      <div class="absolute left-1/2 bottom-4 transform -translate-x-1/2 flex flex-col items-center">
        <img :src="boxImg" alt="Box" class="w-24 h-24" >
        <p class="text-xl text-[#914f48] font-bold">Bundle</p>
      </div>

      <!-- Semi-Circle Images Above the Box -->
      <img :src="strollerImg" alt="Stroller" class="absolute left-28 top-20 w-16 h-16" >
      <img :src="stackImg" alt="Stack Toy" class="absolute right-28 top-20 w-16 h-16" >
      <img :src="bottleImg" alt="Bottle" class="absolute left-16 top-36 w-16 h-16" >
      <img :src="pacifierImg" alt="Pacifier" class="absolute right-16 top-36 w-16 h-16" >
    </div>

    <!-- Right Section: Text -->
    <div class="ml-10 mb-24">
      <h2 class="text-4xl font-bold text-[#7A3E3E] leading-snug mb-2">
        All products that your baby need in one bundle.
      </h2>
      <p class="text-[#5E3B3B] text-xl">Система подписок</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import actual image files
import bottleImg from '@/assets/images/bundle/bottle.png'
import strollerImg from '@/assets/images/bundle/stroller.png'
import stackImg from '@/assets/images/bundle/stack.png'
import pacifierImg from '@/assets/images/bundle/pacifier.png'
import boxImg from '@/assets/images/bundle/plane(3).png'
// import boxImg from '@/assets/images/bundle/bundle-box.png'
</script>

<style scoped>
/* Optional: Add hover or responsive adjustments */
</style>
