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
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-5 w-5" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fill-rule="evenodd" 
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
            clip-rule="evenodd" 
          />
        </svg>
      </button>
    </div>

    <!-- Messages -->
    <div 
      ref="messagesContainer"
      class="flex-1 overflow-y-auto p-4 space-y-4"
    >
      <div 
        v-for="(message, index) in messages" 
        :key="index"
        :class="[
          'max-w-[80%] rounded-lg p-3',
          message.isUser ? 'ml-auto bg-primary-100' : 'bg-gray-100'
        ]"
      >
        {{ message.text }}
      </div>
    </div>

    <!-- Input -->
    <div class="p-4 border-t">
      <form @submit.prevent="sendMessage">
        <div class="flex gap-2">
          <input
            v-model="newMessage"
            type="text"
            :placeholder="t('chat.inputPlaceholder')"
            class="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
          <button
            type="submit"
            class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50"
            :disabled="!newMessage.trim() || isLoading"
          >
            <svg 
              v-if="isLoading"
              class="animate-spin h-5 w-5" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                class="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                stroke-width="4"
              />
              <path 
                class="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <svg
              v-else 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" 
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import { BASE_URL } from '~/BASE_URL';

const { t } = useI18n();

interface ChatMessage {
  text: string;
  isUser: boolean;
}

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const messages = ref<ChatMessage[]>([]);
const newMessage = ref('');
const isLoading = ref(false);
const messagesContainer = ref<HTMLElement | null>(null);

// Load chat history from localStorage
onMounted(() => {
  const savedMessages = localStorage.getItem('chatHistory');
  if (savedMessages) {
    messages.value = JSON.parse(savedMessages);
  }
  scrollToBottom();
});

// Save messages to localStorage whenever they change
watch(messages, (newMessages) => {
  localStorage.setItem('chatHistory', JSON.stringify(newMessages));
  nextTick(() => {
    scrollToBottom();
  });
}, { deep: true });

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

const sendMessage = async () => {
  const messageText = newMessage.value.trim();
  if (!messageText || isLoading.value) return;

  // Add user message
  messages.value.push({
    text: messageText,
    isUser: true
  });

  newMessage.value = '';
  isLoading.value = true;

  try {
    const response = await fetch(`${BASE_URL}/deep-seek/send-message/`, {
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
    messages.value.push({
      text: data.response,
      isUser: false
    });
  } catch (error) {
    console.error('Failed to send message:', error);
    messages.value.push({
      text: t('chat.error'),
      isUser: false
    });
  } finally {
    isLoading.value = false;
  }
};
</script> 