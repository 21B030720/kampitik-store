<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-lg font-semibold mb-4">
      {{ t('cabinet.transactionHistory') }}
    </h2>
    <div v-if="isLoading" class="text-center py-4">
      <p class="text-gray-500">{{ t('loading') }}</p>
    </div>
    <div v-else-if="transactions.length > 0">
      <div
        v-for="transaction in displayedTransactions"
        :key="transaction.id"
        class="border-b last:border-0 py-4"
      >
        <div class="flex justify-between items-start mb-2">
          <div>
            <p class="font-medium">{{ formatDate(transaction.created_at) }}</p>
            <p class="text-sm text-gray-600">
              {{ transaction.amount }}тг
            </p>
          </div>
          <span
            :class="{
              'text-green-600': transaction.status === 'finished',
              'text-yellow-600': transaction.status === 'pending',
              'text-red-600': transaction.status === 'canceled'
            }"
            class="text-sm"
          >
            {{ t(`cabinet.transactionStatus.${transaction.status}`) }}
          </span>
        </div>
        <div class="text-sm text-gray-600">
          {{ t(`cabinet.transactionType.${transaction.transaction_type}`) }}
        </div>
      </div>
      <div v-if="transactions.length > limit" class="text-center py-4">
        <button @click="showMore" class="w-full px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors">
          {{ t('showMore') }}
        </button>
      </div>
    </div>
    <div v-else class="text-gray-500 text-center py-4">
      {{ t('cabinet.noTransactions') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Transaction } from '~/types/wallet';

const { t } = useI18n();
const props = defineProps<{
  transactions: Transaction[];
  isLoading: boolean;
}>();

const limit = ref(5); // Number of transactions to show initially

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

const showMore = () => {
  limit.value += 5; // Increase the limit by 5
};

const displayedTransactions = computed(() => {
  return props.transactions.slice(0, limit.value);
});
</script>