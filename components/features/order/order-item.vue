<template>
  <div class="bg-white rounded-lg hover:bg-[#F6FFFE] transition-colors flex flex-col h-full relative group border border-gray-200">
    <div class="aspect-square relative rounded-lg overflow-hidden">
      <img
        v-if="item.product?.image"
        :src="item.product.image"
        :alt="item.product.name"
        class="w-full h-full object-cover rounded-lg"
        @error="handleImageError"
      >
      <div
        v-else
        class="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center"
      >
        <span class="text-gray-400">No image</span>
      </div>
      <div
        v-if="item.product?.rating"
        class="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-sm flex items-center gap-1"
      >
        <span>{{ item.product.rating }}</span>
        <span class="text-yellow-400">★</span>
      </div>
    </div>
    <div class="p-4 flex flex-col flex-grow">
      <div class="flex-grow">
        <div class="flex justify-between items-start mb-2">
          <div>
            <h2 class="text-lg font-semibold product-name">{{ item.product ? item.product.name : item.bundle.name }}</h2>
          </div>
        </div>
        <p class="text-sm text-gray-600">{{ item.for_kid_name }}</p>
        <p class="text-sm text-gray-600">{{ formatDate(item.created_at) }}</p>
        <p class="text-sm text-gray-600">{{ t('order.shopName') }}: {{ item.shop_name }}</p>
        <p class="text-sm text-gray-600">{{ t('order.discount') }}: {{ item.discount }}</p>
        <p class="text-sm text-gray-600">{{ t('order.overallPrice') }}: {{ item.overall_price }}</p>
        <p class="text-sm text-gray-600">{{ t('order.finalPrice') }}: {{ item.final_price }}</p>
        <p class="text-sm text-gray-600">{{ t('order.quantity') }}: {{ item.quantity }}</p>
      </div>
      <div class="mt-2 flex items-center justify-between">
        <span
          :class="{
            'text-green-600': item.status === 'GIVEN_TO_CUSTOMER',
            'text-yellow-600': item.status === 'GIVEN_TO_COURIER' || item.status === 'WAITING_FOR_COURIER',
            'text-red-600': item.status === 'CANCELLED'
          }"
          class="text-sm"
        >
          {{ t(`order.statuses.${item.status}`) }}
        </span>
        <button v-if="item?.status !== 'CANCELLED' && item.status !== 'GIVEN_TO_CUSTOMER'" @click="showModal = true" class="ml-auto px-4 py-2 bg-red-600 text-white rounded-lg">
          {{ t('order.rejectItem') }}
        </button>
      </div>
    </div>
  </div>

  <!-- Confirmation Modal -->
  <ConfirmationModal
    v-if="showModal"
    :show="showModal"
    :title="t('order.confirmRejectTitle')"
    :message="t('order.confirmRejectMessage')"
    :cancelText="t('order.cancel')"
    :confirmText="t('order.confirm')"
    @cancel="showModal = false"
    @confirm="confirmReject"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { ClientOrderItem } from '~/types/client';
import ConfirmationModal from '~/components/features/order/order-item-reject-confirmation-modal.vue';

const { t } = useI18n();

const props = defineProps<{
  item: ClientOrderItem;
  rejectOrderItem: (itemId: string) => void;
}>();

const showModal = ref(false);

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.style.display = 'none';
  img.parentElement!.innerHTML = '<span class="text-gray-400">No image</span>';
};

const confirmReject = () => {
  props.rejectOrderItem(props.item.id);
  showModal.value = false;
};
</script>

<style scoped>
.aspect-square {
  aspect-ratio: 1;
}
.product-name {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* Limit to 2 lines */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>