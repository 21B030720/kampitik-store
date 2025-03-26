<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg font-semibold">{{ t('cabinet.children') }}</h2>
      <button
        class="inline-flex items-center bg-[#128C7E] text-white px-4 py-2 rounded-lg hover:bg-[#0E7265] transition-colors text-sm"
        @click="$emit('add-kid')"
      >
        <span class="mr-2">+</span>
        {{ t('cabinet.addChild') }}
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-4">
      <p class="text-gray-500">{{ t('loading') }}</p>
    </div>

    <!-- No Kids Message -->
    <p
      v-else-if="kids.length === 0"
      class="text-center text-gray-500 py-4"
    >
      {{ t('cabinet.noKids') }}
    </p>

    <!-- Kids Grid -->
    <div
      v-else
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <KidCard
        v-for="kid in kids"
        :key="kid.id"
        :kid="kid"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import type { Kid } from '~/types/kid';
  import KidCard from './kid-card.vue';
  
  const { t } = useI18n();
  
  defineProps<{
    kids: Kid[];
    isLoading: boolean;
  }>();
  
  defineEmits<{
    'add-kid': [];
  }>();
</script>