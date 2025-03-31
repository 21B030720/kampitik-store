<template>
  <div class="flex-1 mt-4 overflow-hidden">
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
    <!-- Overlay Section -->
    <div class="relative mt-[-100px] mx-4 bg-[#D9D9D9] bg-opacity-60 rounded-2xl p-6 flex flex-col items-center justify-center">
      <div class="bg-white rounded-2xl p-8 flex flex-col items-center mb-6">
        <img src="@/assets/icons/shop.svg" alt="Shop Icon" class="w-16 h-16 mb-4">
        <p class="text-center text-xl font-semibold mb-2">Find many shops</p>
        <p class="text-center text-base">Discover a variety of shops offering unique products and services.</p>
      </div>
      <div class="flex space-x-6 mb-6">
        <div class="bg-white rounded-2xl p-8 flex flex-col items-center">
          <img src="@/assets/icons/brown-box.svg" alt="Products Icon" class="w-16 h-16 mb-4">
          <p class="text-center text-xl font-semibold mb-2">Products</p>
          <p class="text-center text-base">Explore a wide range of products tailored to your needs.</p>
        </div>
        <div class="bg-white rounded-2xl p-8 flex flex-col items-center">
          <img src="@/assets/icons/three-brown-boxes.svg" alt="Bundles Icon" class="w-16 h-16 mb-4">
          <p class="text-center text-xl font-semibold mb-2">Bundles</p>
          <p class="text-center text-base">Get the best deals with our exclusive product bundles.</p>
        </div>
      </div>
      <!-- Payment Section -->
        <div class="bg-white rounded-2xl p-8 flex flex-col items-center w-full max-w-xl">
            <div class="flex items-center justify-between w-full mb-4">
            <img src="@/assets/images/freedom_pay_logo.png" alt="Freedom Pay Logo" class="h-auto max-w-[200px]">
            <img src="@/assets/icons/sim.svg" alt="Payment Card Icon" class="w-16 h-16">
            </div>
            <div class="flex flex-col items-center">
            <p class="text-center text-xl font-semibold mb-2">Pay and top up with trusted banks</p>
            <p class="text-center text-base">Enjoy secure and convenient payment options with Freedom Pay.</p>
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