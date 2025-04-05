<template>
  <div class="flex items-center p-20 bg-[#F7F0EE] rounded-lg relative">
    <!-- Text Section -->
    <div class="mr-4 flex-1 relative h-full">
      <!-- Title -->
      <h2 class="text-4xl text-[#4A4A4A] font-bold mb-2">Useful Baby Care Tips</h2>
      <!-- Description -->
      <p class="text-xl text-[#B28E87] mb-10">Ask anything and anytime from our AI assistant</p>
    </div>
    <!-- Image Section with Input -->
    <div class="flex-shrink-0 relative">
      <img src="@/assets/images/ai_assistant_bg.png" alt="AI Assistant Background" class="h-[300px] object-cover rounded-lg">
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="flex items-center bg-white rounded-lg shadow-md p-4">
          <input
            v-model="inputMessage"
            type="text"
            placeholder="What can I find?"
            class="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none h-12"
          >
          <button 
            class="bg-blue-500 text-white h-12 px-4 rounded-r-lg flex items-center justify-center"
            @click="sendMessage"
          >
            <img src="@/assets/icons/send.svg" alt="Send Icon" class="w-6 h-6">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const inputMessage = ref('');
const emit = defineEmits<{
  (e: 'send-message', message: string): void;
}>();

const sendMessage = () => {
  if (inputMessage.value.trim()) {
    emit('send-message', inputMessage.value.trim());
    inputMessage.value = '';
  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>