<template>
  <button
    class="fixed bottom-6 right-6 bg-primary-600 text-white rounded-full p-4 shadow-lg hover:bg-primary-700 transition-colors z-50"
    @click="$emit('click')"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      class="h-6 w-6" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'click'): void;
}>();
</script> 