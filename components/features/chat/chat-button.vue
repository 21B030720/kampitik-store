<template>
  <button
    class="fixed bottom-6 right-6 bg-white rounded-full p-4 shadow-lg hover:bg-gray-50 transition-colors z-50"
    @click="$emit('click')"
  >
    <img
      src="@/assets/icons/chat-bot.svg"
      alt="Chat"
      class="h-6 w-6"
    />
  </button>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'click'): void;
}>();
</script> 