<template>
	<div class="container mx-auto px-4 py-8">
		<div class="flex items-center gap-2 mb-6">
			<NuxtLink
				:to="localePath('/cabinet')"
				class="text-gray-600 hover:text-gray-900"
			>
				← {{ t('back.toCabinet') }}
			</NuxtLink>
		</div>

		<div class="grid md:grid-cols-2 gap-8">
			<BalanceForm
				v-model="amount"
				:wallet="wallet"
				:is-loading="isLoading"
				:error="error"
				@submit="handleSubmit"
			/>
			
			<SavedCards
				:cards="cards"
				:is-loading="isCardsLoading"
				:selected-card-id="selectedCardId"
				@update:selected-card-id="selectedCardId = $event"
			/>
		</div>
	</div>

	<PaymentModal
		:show="showPaymentModal"
		:transaction-id="transactionId"
		@close="showPaymentModal = false"
		@payment-initiated="handlePaymentInitiated"
	/>

	<PaymentFormPage
		v-if="showPaymentForm"
		:html="cleanedHtml"
		@close="showPaymentForm = false"
	/>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { WalletService } from '~/services/WalletService';
import { PayboxService } from '~/services/PayboxService';
import type { Wallet } from '~/types/wallet';
import BalanceForm from '~/components/features/balance/balance-form.vue';
import SavedCards from '~/components/features/balance/saved-cards.vue';
import PaymentFormPage from '~/components/features/balance/payment-form-page.vue';
import PaymentModal from '~/components/shared/payment-modal.vue';

interface SavedCard {
	id: number;
	card_hash: string;
	card_month: string;
	card_year: string;
	default: boolean;
}

const { t } = useI18n();
const localePath = useLocalePath();
const router = useRouter();

const wallet = ref<Wallet | null>(null);
const amount = ref(2000);
const isLoading = ref(false);
const error = ref('');
const cards = ref<SavedCard[]>([]);
const isCardsLoading = ref(true);

const quickAmounts = [2000, 5000, 10000];

const showPaymentModal = ref(false);
const transactionId = ref('');
const selectedCardId = ref<number | null>(null);
const showPaymentForm = ref(false);
const cleanedHtml = ref('');

const isValidAmount = computed(() => {
	const value = amount.value;
	return value >= 2000;
});

onMounted(async () => {
	try {
		wallet.value = await WalletService.getMyWallet();
	} catch (error) {
		console.error('Failed to fetch wallet:', error);
	}

	try {
		cards.value = await PayboxService.getSavedCards();
	} catch (error) {
		console.error('Failed to fetch saved cards:', error);
	} finally {
		isCardsLoading.value = false;
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
		// First, create the top-up transaction
		const { id } = await WalletService.replenishBalance(amount.value);
		transactionId.value = id;

		// If a card is selected, proceed with card payment
		if (selectedCardId.value) {
			try {
				const response = await PayboxService.payWithCard(id, selectedCardId.value);
				cleanedHtml.value = response.message.replace(/\\"/g, '"');
				showPaymentForm.value = true;
			} catch (error: any) {
				console.error('Failed to process card payment:', error);
				error.value = t('payment.failure');
			}
		} else {
			// If no card selected, show regular payment modal
			showPaymentModal.value = true;
		}
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

<style scoped>
.modal-enter-active,
.modal-leave-active {
	transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
	opacity: 0;
	transform: scale(0.95);
}
</style> 