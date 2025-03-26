<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-lg font-semibold mb-4">
      {{ t('cabinet.personalInfo') }}
    </h2>
    <div class="grid gap-4">
      <div>
        <span class="text-gray-600">{{ t('cabinet.username') }}:</span>
        <span class="ml-2">{{ user?.username }}</span>
      </div>
      <div>
        <span class="text-gray-600">{{ t('cabinet.userId') }}:</span>
        <span class="ml-2">{{ user?.id }}</span>
      </div>
      <div>
        <span class="text-gray-600">{{ t('cabinet.clientId') }}:</span>
        <span class="ml-2">{{ user?.client_id }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { User } from '~/types/auth';
  import { useI18n } from 'vue-i18n';
  
  const { t } = useI18n();
  defineProps<{
    user: User | null;
  }>();
</script>