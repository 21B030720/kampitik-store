<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">{{ t('orderDetails.title') }}</h1>
    <div v-if="isLoading" class="text-center py-4">
      <p class="text-gray-500">{{ t('loading') }}</p>
    </div>
    <div v-else>
      <OrderInfo :order="order" :rejectOrder="rejectOrder" />
      <div class="bg-white rounded-lg p-6">
        <h2 class="text-lg font-semibold mb-4">{{ t('orderDetails.orderItems') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <OrderItem
            v-for="item in order?.order_items"
            :key="item.id"
            :item="item"
            :rejectOrderItem="rejectOrderItem"
          />
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
import OrderInfo from '~/components/features/order/order-info.vue';
import OrderItem from '~/components/features/order/order-item.vue';

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

const rejectOrder = async () => {
  try {
    await ClientService.updateOrderStatus(orderId, 'CANCELLED');
    order.value!.status = 'CANCELLED';
  } catch (error) {
    console.error('Failed to update order status:', error);
  }
};

const rejectOrderItem = async (itemId: string) => {
  try {
    await ClientService.updateOrderItemStatus(itemId, 'CANCELLED');
    const item = order.value!.order_items.find(item => item.id === itemId);
    if (item) {
      item.status = 'CANCELLED';
    }
    checkOrderStatus();
  } catch (error) {
    console.error('Failed to update order item status:', error);
  }
};

const checkOrderStatus = () => {
  if (order.value) {
    const allItemsCancelledOrGiven = order.value.order_items.every(
      item => item.status === 'CANCELLED' || item.status === 'GIVEN_TO_CUSTOMER'
    );
    if (allItemsCancelledOrGiven) {
      order.value.status = 'CANCELLED';
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>