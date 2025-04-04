<template>
  <div class="flex items-center p-20 bg-[#F2D4CC] rounded-lg shadow-md relative">
    <!-- Text Section -->
    <div class="mr-4 flex-1 relative h-full">
      <!-- Title -->
      <h2 class="text-2xl font-bold mb-2">All products that your baby need in one bundle.</h2>
    </div>
    <!-- Bundle Section -->
    <div class="flex-shrink-0 flex flex-col items-center bg-[#F3F7FC] border-2 border-black p-10 rounded-[20px]">
      <!-- Big Icon with Text -->
      <div class="flex flex-col items-center mb-4">
        <img src="@/assets/icons/brown-box.svg" alt="Bundle Icon" class="h-20 w-20 mb-2">
        <p class="text-lg font-bold">Bundle</p>
      </div>
      <!-- Small Icons with Text -->
      <div class="flex space-x-4">
        <div class="flex flex-col items-center">
          <img src="@/assets/icons/brown-box.svg" alt="Product Icon" class="h-10 w-10 mb-1">
          <p class="text-sm">Product 1</p>
        </div>
        <div class="flex flex-col items-center">
          <img src="@/assets/icons/brown-box.svg" alt="Product Icon" class="h-10 w-10 mb-1">
          <p class="text-sm">Product 2</p>
        </div>
        <div class="flex flex-col items-center">
          <img src="@/assets/icons/brown-box.svg" alt="Product Icon" class="h-10 w-10 mb-1">
          <p class="text-sm">Product 3</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional script needed for this example
</script>

<style scoped>
/* Add any additional styles here */
</style>