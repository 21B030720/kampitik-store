<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-lg font-semibold mb-4">{{ t('cabinet.clientOrdersTitle') }}</h2>
    <div v-if="isLoading" class="text-center py-4">
      <p class="text-gray-500">{{ t('loading') }}</p>
    </div>
    <div v-else-if="orders.length > 0">
      <div v-for="order in displayedOrders" :key="order.id" class="border-b last:border-0 py-4">
        <NuxtLink
          :to="localePath(`/order-details/${order.id}`)"
          class="block hover:bg-gray-100 transition-colors p-4 rounded-lg"
        >
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
              {{ t(`order.statuses.${order.status}`) }}
            </span>
          </div>
          <div class="text-sm text-gray-600">
            <p>{{ t('order.discount') }}: {{ order.discount }}</p>
            <p>{{ t('order.overallPrice') }}: {{ order.overall_price }}</p>
            <p>{{ t('order.finalPrice') }}: {{ order.final_price }}</p>
          </div>
        </NuxtLink>
      </div>
      <div v-if="orders.length > limit" class="text-center py-4">
              <button @click="showMore" class="w-full px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors">
                {{ t('showMore') }}
              </button>
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
const localePath = useLocalePath();
const orders = ref<ClientOrder[]>([]);
const isLoading = ref(true);
const limit = ref(5); // Number of orders to show initially

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

const showMore = () => {
  limit.value += 5; // Increase the limit by 5
};

const displayedOrders = computed(() => {
  return orders.value.slice(0, limit.value);
});
</script>

<style scoped>
.client-orders-section {
  margin-top: 2rem;
}
</style>