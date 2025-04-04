<template>
  <div class="bg-white rounded-lg border-2 border-[#E8EDF5] p-6 mb-6">
    <h2 class="text-lg font-semibold mb-4">{{ t('orderDetails.orderInfo') }}</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <p><strong>{{ t('order.id') }}:</strong> {{ order?.id }}</p>
      <p><strong>{{ t('order.clientName') }}:</strong> {{ order?.client_name }}</p>
      <p><strong>{{ t('order.clientPhoneNumber') }}:</strong> {{ order?.client_phone_number }}</p>
      <p><strong>{{ t('order.discount') }}:</strong> {{ order?.discount }}</p>
      <p><strong>{{ t('order.overallPrice') }}:</strong> {{ order?.overall_price }}</p>
      <p><strong>{{ t('order.finalPrice') }}:</strong> {{ order?.final_price }}</p>
      <p><strong>{{ t('order.createdAt') }}:</strong> {{ formatDate(order?.created_at) }}</p>
      <p><strong>{{ t('order.status') }}:</strong> {{ t(`order.statuses.${order.status}`) }}</p>
    </div>
    <button v-if="order?.status !== 'CANCELLED' && order?.status !== 'TOTALLY_GIVEN'" @click="rejectOrder" class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg">
      {{ t('order.reject') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { ClientOrder } from '~/types/client';

const { t } = useI18n();

const props = defineProps<{
  order: ClientOrder | null;
  rejectOrder: () => void;
}>();

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};
</script>