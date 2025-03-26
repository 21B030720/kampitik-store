<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-lg font-semibold mb-4">{{ t('cabinet.clientOrdersTitle') }}</h2>
    <div v-if="isLoading" class="text-center py-4">
      <p class="text-gray-500">{{ t('loading') }}</p>
    </div>
    <div v-else-if="orders.length > 0">
      <div v-for="order in orders" :key="order.id" class="border-b last:border-0 py-4">
        <div class="flex justify-between items-start mb-2">
          <div>
            <p class="font-medium">{{ formatDate(order.created_at) }}</p>
            <p class="text-sm text-gray-600">{{ order.client_name }}</p>
            <p class="text-sm text-gray-600">{{ order.client_phone_number }}</p>
          </div>
          <span
            :class="{
              'text-green-600': order.status === 'TOTALLY_GIVEN',
              'text-yellow-600': order.status === 'PARTIALLY_GIVEN' || order.status === 'WAITING',
              'text-red-600': order.status === 'CANCELLED'
            }"
            class="text-sm"
          >
            {{ t(`order.status.${order.status}`) }}
          </span>
        </div>
        <div class="text-sm text-gray-600">
          <p>{{ t('order.discount') }}: {{ order.discount }}</p>
          <p>{{ t('order.overallPrice') }}: {{ order.overall_price }}</p>
          <p>{{ t('order.finalPrice') }}: {{ order.final_price }}</p>
        </div>
      </div>
    </div>
    <div v-else class="text-gray-500 text-center py-4">
      {{ t('cabinet.noOrders') }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { ClientService } from '~/services/ClientService';
  import type { ClientOrder } from '~/types/client';
  
  const { t } = useI18n();
  const orders = ref<ClientOrder[]>([]);
  const isLoading = ref(true);
  
  onMounted(async () => {
    try {
      const clientOrders = await ClientService.getClientOrders();
      orders.value = clientOrders.results;
    } catch (error) {
      console.error('Failed to fetch client orders:', error);
    } finally {
      isLoading.value = false;
    }
  });
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };
</script>

<style scoped>
    .client-orders-section {
    margin-top: 2rem;
    }
</style>