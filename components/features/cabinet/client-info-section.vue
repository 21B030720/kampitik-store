<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-lg font-semibold mb-4">
      {{ t('cabinet.clientInfo') }}
    </h2>
    <div v-if="clientDetails" class="grid gap-4">
      <div>
        <span class="text-gray-600">{{ t('cabinet.name') }}:</span>
        <span class="ml-2">{{ clientDetails.name }}</span>
      </div>
      <div>
        <span class="text-gray-600">{{ t('cabinet.email') }}:</span>
        <span class="ml-2">{{ clientDetails.email }}</span>
        <span v-if="clientDetails.is_email_valid" class="ml-2 text-green-500 text-sm">
          ✓ {{ t('cabinet.emailVerified') }}
        </span>
      </div>
      <div>
        <span class="text-gray-600">{{ t('cabinet.phone') }}:</span>
        <span class="ml-2">{{ clientDetails.phone_number }}</span>
      </div>
    </div>
    <div v-else-if="isLoading" class="text-gray-500">
      {{ t('loading') }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { ClientDetails } from '~/types/client';
  import { useI18n } from 'vue-i18n';
  
  const { t } = useI18n();
  defineProps<{
    clientDetails: ClientDetails | null;
    isLoading: boolean;
  }>();
</script>