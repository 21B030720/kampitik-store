<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg p-6 w-96 relative">
      <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
      <p class="text-gray-600 mb-6">
        {{ message }}
        <span class="text-3xl">):</span>
      </p>
      <div class="flex justify-end gap-4">
        <button @click="cancel" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors">
          {{ cancelText }}
        </button>
        <button @click="confirm" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  show: boolean;
  title: string;
  message: string;
  cancelText: string;
  confirmText: string;
}>();

const emit = defineEmits<{
  (e: 'cancel'): void;
  (e: 'confirm'): void;
}>();

const cancel = () => {
  emit('cancel');
};

const confirm = () => {
  emit('confirm');
};
</script>