<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">{{ t('cabinet.budget') }}</h2>
      <NuxtLink
        :to="localePath('/balance-replenishment')"
        class="bg-[#128C7E] text-white px-4 py-2 rounded-lg hover:bg-[#0E7265] transition-colors text-sm"
      >
        {{ t('cabinet.replenishBalance') }}
      </NuxtLink>
    </div>
    <div v-if="wallet" class="flex items-center justify-between">
      <div>
        <p class="text-gray-600">{{ t('cabinet.balance') }}</p>
        <p class="text-2xl font-bold">{{ wallet.balance }}тг</p>
      </div>
      <div class="text-sm text-gray-500">
        {{ t('cabinet.walletId') }}: {{ wallet.client_user_name }}
      </div>
    </div>
    <div v-else-if="isLoading" class="text-gray-500">
      {{ t('loading') }}
    </div>
    <div v-else class="text-gray-500">
      {{ t('cabinet.noWallet') }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Wallet } from '~/types/wallet';
  import { useI18n } from 'vue-i18n';
  
  const { t } = useI18n();
  
  const localePath = useLocalePath();
  defineProps<{
    wallet: Wallet | null;
    isLoading: boolean;
  }>();
</script>