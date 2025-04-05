<template>
  <div class="bg-[#F5F0E6]" >
    <Hero />
    <Shops />
    <OneTime />
    <Bundles />
    <!-- <Convinience /> -->
    <AiAssitant @send-message="handleSendMessage" />
    <GrowthStages />
    <Cards />
    <!-- <CompanyInfo /> -->
    <!-- <Advantages /> -->
    <ChatButton @click="toggleChat" />
    <ChatWindow 
      v-if="isChatOpen" 
      @close="isChatOpen = false" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Hero from '~/components/features/landing/landing-hero.vue';
import CompanyInfo from '~/components/features/landing/landing-company-info.vue';
import Advantages from '~/components/features/landing/landing-advantages.vue';
import GrowthStages from '~/components/features/landing/landing-leveling.vue';
import Shops from '~/components/features/landing/landing-shops.vue';
import Convinience from '~/components/features/landing/landing-convinience.vue';
import Bundles from '~/components/features/landing/landing-bundles.vue';
import AiAssitant from "~/components/features/landing/landing-ai-assistant.vue";
import ChatButton from '~/components/features/chat/chat-button.vue';
import ChatWindow from '~/components/features/chat/chat-window.vue';
import Cards from "~/components/features/landing/landing-cards-container.vue";
import OneTime from "~/components/features/landing/landing-one-time.vue";
import { useChatStore } from '~/stores/useChatStore';
import { BASE_URL } from '~/BASE_URL';

const { t } = useI18n();

const isChatOpen = ref(false);
const chatStore = useChatStore();
const isLoading = ref(false);

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
};

const sendMessage = async (messageText) => {
  if (!messageText || isLoading.value) return;

  // Add user message
  chatStore.addMessage({
    text: messageText,
    isUser: true
  });

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

const handleSendMessage = (message) => {
  isChatOpen.value = true;
  sendMessage(message);
};
</script>