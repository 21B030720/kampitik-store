import { defineStore } from 'pinia';

interface ChatMessage {
  text: string;
  isUser: boolean;
}

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as ChatMessage[],
  }),

  actions: {
    addMessage(message: ChatMessage) {
      this.messages.push(message);
    },

    clearMessages() {
      this.messages = [];
    },
  },

  persist: true,
}); 