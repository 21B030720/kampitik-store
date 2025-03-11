<template>
	<div class="container mx-auto px-4 py-8">
		<div class="max-w-md mx-auto">
			<div class="flex items-center gap-2 mb-6">
				<NuxtLink
					:to="localePath('/cabinet')"
					class="text-gray-600 hover:text-gray-900"
				>
					← {{ t('back.toCabinet') }}
				</NuxtLink>
			</div>

			<div class="bg-white rounded-lg shadow-lg p-6">
				<h1 class="text-2xl font-bold mb-6">
					{{ t('balance.replenishmentTitle') }}
				</h1>

				<!-- Current Balance -->
				<div class="mb-6 p-4 bg-gray-50 rounded-lg">
					<p class="text-sm text-gray-600">{{ t('balance.currentBalance') }}</p>
					<p class="text-2xl font-bold">{{ wallet?.balance || '0' }}тг</p>
				</div>

				<!-- Replenishment Form -->
				<form @submit.prevent="handleSubmit" class="space-y-6">
					<!-- Amount Input -->
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">
							{{ t('balance.amount') }}
						</label>
						<div class="relative">
							<input
								v-model="amount"
								type="number"
								min="2000"
								max="10000"
								step="100"
								required
								class="w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500"
								:placeholder="t('balance.enterAmount')"
							>
							<span class="absolute right-3 top-2 text-gray-500">тг</span>
						</div>
						<p class="text-sm text-gray-500 mt-1">
							{{ t('balance.limitNote') }}
						</p>
					</div>

					<!-- Quick Amount Buttons -->
					<div class="grid grid-cols-3 gap-2">
						<button
							v-for="quickAmount in quickAmounts"
							:key="quickAmount"
							type="button"
							class="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
							@click="amount = quickAmount"
						>
							{{ quickAmount }}тг
						</button>
					</div>

					<!-- Submit Button -->
					<button
						type="submit"
						class="w-full bg-[#128C7E] text-white py-3 rounded-lg hover:bg-[#0E7265] transition-colors"
						:disabled="isLoading || !isValidAmount"
					>
						{{ t('balance.replenish') }}
					</button>

					<!-- Error Message -->
					<p v-if="error" class="text-red-600 text-sm text-center">
						{{ error }}
					</p>
				</form>
			</div>
		</div>
	</div>
	<PaymentModal
		:show="showPaymentModal"
		:transaction-id="transactionId"
		@close="showPaymentModal = false"
		@payment-initiated="handlePaymentInitiated"
	/>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { WalletService } from '~/services/WalletService';
import type { Wallet } from '~/types/wallet';
import PaymentModal from '~/components/shared/payment-modal.vue';

const { t } = useI18n();
const localePath = useLocalePath();
const router = useRouter();

const wallet = ref<Wallet | null>(null);
const amount = ref<number>(2000);
const isLoading = ref(false);
const error = ref('');

// Updated quick amounts within the allowed range
const quickAmounts = [2000, 5000, 10000];

const isValidAmount = computed(() => {
	const value = amount.value;
	return value >= 2000 && value <= 10000;
});

const showPaymentModal = ref(false);
const transactionId = ref('');

onMounted(async () => {
	try {
		wallet.value = await WalletService.getMyWallet();
	} catch (error) {
		console.error('Failed to fetch wallet:', error);
	}
});

const handleSubmit = async () => {
	if (!isValidAmount.value) {
		error.value = t('balance.invalidAmount');
		return;
	}

	isLoading.value = true;
	error.value = '';

	try {
		const { id } = await WalletService.replenishBalance(amount.value);
		transactionId.value = id;
		showPaymentModal.value = true;
	} catch (err) {
		error.value = t('balance.replenishmentError');
	} finally {
		isLoading.value = false;
	}
};

const handlePaymentInitiated = (paymentUrl: string) => {
	showPaymentModal.value = false;
	// Redirect to the payment URL
	window.location.href = paymentUrl;
};

definePageMeta({
	middleware: ['auth']
});
</script> 