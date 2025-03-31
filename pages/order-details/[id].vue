<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">{{ t('orderDetails.title') }}</h1>
    <div v-if="isLoading" class="text-center py-4">
      <p class="text-gray-500">{{ t('loading') }}</p>
    </div>
    <div v-else>
      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 class="text-lg font-semibold mb-4">{{ t('orderDetails.orderInfo') }}</h2>
        <p>{{ t('order.id') }}: {{ order.id }}</p>
        <p>{{ t('order.clientName') }}: {{ order.client_name }}</p>
        <p>{{ t('order.clientPhoneNumber') }}: {{ order.client_phone_number }}</p>
        <p>{{ t('order.discount') }}: {{ order.discount }}</p>
        <p>{{ t('order.overallPrice') }}: {{ order.overall_price }}</p>
        <p>{{ t('order.finalPrice') }}: {{ order.final_price }}</p>
        <p>{{ t('order.createdAt') }}: {{ formatDate(order.created_at) }}</p>
        <p>{{ t('order.status') }}: {{ t(`order.statuses.${order.status}`) }}</p>
      </div>
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-lg font-semibold mb-4">{{ t('orderDetails.orderItems') }}</h2>
        <div v-for="item in order.order_items" :key="item.id" class="border-b last:border-0 py-4">
          <div class="flex justify-between items-start mb-2">
            <div>
              <p class="font-medium">{{ formatDate(item.created_at) }}</p>
              <p class="text-sm text-gray-600">{{ item.for_kid_name }}</p>
              <p class="text-sm text-gray-600">{{ item.product ? item.product.name : item.bundle.name }}</p>
            </div>
            <span
              :class="{
                'text-green-600': item.status === 'TOTALLY_GIVEN',
                'text-yellow-600': item.status === 'PARTIALLY_GIVEN' || item.status === 'WAITING',
                'text-red-600': item.status === 'CANCELLED'
              }"
              class="text-sm"
            >
              {{ t(`order.statuses.${item.status}`) }}
            </span>
          </div>
          <div class="text-sm text-gray-600">
            <p>{{ t('order.discount') }}: {{ item.discount }}</p>
            <p>{{ t('order.overallPrice') }}: {{ item.overall_price }}</p>
            <p>{{ t('order.finalPrice') }}: {{ item.final_price }}</p>
            <p>{{ t('order.quantity') }}: {{ item.quantity }}</p>
            <p>{{ t('order.shopName') }}: {{ item.shop_name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { ClientService } from '~/services/ClientService';
import type { ClientOrder } from '~/types/client';

const { t } = useI18n();
const route = useRoute();
const orderId = route.params.id as string;
const order = ref<ClientOrder | null>(null);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const orderData = await ClientService.getClientOrderDetails(orderId);
    order.value = orderData;
  } catch (error) {
    console.error('Failed to fetch order details:', error);
  } finally {
    isLoading.value = false;
  }
});

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};
</script>