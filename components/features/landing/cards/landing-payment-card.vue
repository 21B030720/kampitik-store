<template>
  <div class="relative w-full h-[500px] bg-[#F2D4CC] rounded-xl p-6 shadow-md text-center">
    <h2 class="text-[32px] font-bold text-[#914C3F]">Payment</h2>
    <p class="text-sm text-[#914C3F] mt-1">
    Pay in installments rather <br> than all at once.
    </p>

    <!-- Floating Images -->
    <img :src="bankCardsImage" class="absolute w-64 top-40 left-1/2 transform -translate-x-1/2">
    <img :src="freedomLogo" class="absolute w-24 top-2 right-2">
  </div>
</template>

<script setup lang="ts">
import freedomLogo from '@/assets/images/freedom_pay_logo.png';
import bankCardsImage from '@/assets/images/bank_cards.png';
</script>

<style scoped>
/* Optional: Add animations or hover effects if needed */
</style>