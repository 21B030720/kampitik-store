<template>
  <div 
    class="fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-xl z-50 flex flex-col"
    style="height: 500px;"
  >
    <!-- Header -->
    <div class="p-4 border-b flex justify-between items-center">
      <h3 class="text-lg font-medium">{{ t('chat.title') }}</h3>
      <button 
        class="text-gray-500 hover:text-gray-700"
        @click="$emit('close')"
      >
        <img
          src="@/assets/icons/close.svg"
          alt="Close"
          class="h-6 w-6"
        />
      </button>
    </div>

    <!-- Messages -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <div
        v-for="(message, index) in chatStore.messages"
        :key="index"
        :class="[
          'max-w-[80%] rounded-lg p-3',
          message.isUser 
            ? 'bg-gray-100 text-black ml-auto' 
            : 'bg-gray-100 text-gray-800'
        ]"
        v-html="formatMessage(message.text)"
      ></div>
    </div>

    <!-- Input -->
    <form @submit.prevent="sendMessage" class="p-4 border-t">
      <div class="flex gap-2">
        <input
          v-model="newMessage"
          type="text"
          class="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          :placeholder="t('chat.inputPlaceholder')"
          :disabled="isLoading"
        >
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50"
          :disabled="isLoading || !newMessage.trim()"
        >
          <span v-if="isLoading">{{ t('common.processing') }}</span>
          <span v-else>→</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { BASE_URL } from '~/BASE_URL';
import { useChatStore } from '~/stores/useChatStore';

const { t } = useI18n();
const chatStore = useChatStore();

const newMessage = ref('');
const isLoading = ref(false);

const formatMessage = (text: string) => {
  // Convert markdown-like syntax to HTML
  let formattedText = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
    .replace(/\*(.*?)\*/g, '<em>$1</em>'); // Italic

  return formattedText;
};

const sendMessage = async () => {
  const messageText = newMessage.value.trim();
  if (!messageText || isLoading.value) return;

  // Add user message
  chatStore.addMessage({
    text: messageText,
    isUser: true
  });

  newMessage.value = '';
  isLoading.value = true;

  try {
    const response = await fetch(`${BASE_URL}/open-ai/send-message/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: messageText
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const data = await response.json();
    
    // Add AI response
    chatStore.addMessage({
      text: data.message,
      isUser: false
    });
  } catch (error) {
    console.error('Failed to send message:', error);
    chatStore.addMessage({
      text: t('chat.error'),
      isUser: false
    });
  } finally {
    isLoading.value = false;
  }
};

defineEmits<{
  (e: 'close'): void;
}>();
</script>