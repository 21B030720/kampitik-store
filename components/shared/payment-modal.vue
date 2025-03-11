<template>
	<Teleport to="body">
		<Transition name="modal">
			<div v-if="show" class="fixed inset-0 flex items-center justify-center p-4" style="z-index: 9999;">
				<!-- Backdrop -->
				<div 
					class="fixed inset-0 bg-black/50 backdrop-blur-sm" 
					@click="$emit('close')"
				></div>

				<!-- Modal Container -->
				<div 
					class="relative w-full max-w-md transform bg-white rounded-lg shadow-xl transition-all"
					style="z-index: 10000;"
				>
					<!-- Modal Header -->
					<div class="border-b px-6 py-4">
						<h3 class="text-lg font-semibold text-gray-900">
							{{ t('balance.paymentProcessing') }}
						</h3>
					</div>

					<!-- Modal Content -->
					<div class="px-6 py-4">
						<div class="mb-4">
							<p class="text-gray-600 mb-2">{{ t('balance.transactionId') }}:</p>
							<p class="font-mono bg-gray-50 p-2 rounded select-all">{{ transactionId }}</p>
						</div>
					</div>

					<!-- Modal Footer -->
					<div class="border-t px-6 py-4 flex justify-end gap-3">
						<button
							class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
							@click="$emit('close')"
						>
							{{ t('common.cancel') }}
						</button>
						<button
							class="px-4 py-2 bg-[#128C7E] text-white rounded-lg hover:bg-[#0E7265] transition-colors"
							:disabled="isLoading"
							@click="proceedToPayment"
						>
							<span v-if="isLoading">{{ t('loading') }}</span>
							<span v-else>{{ t('balance.proceedToPayment') }}</span>
						</button>
					</div>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { WalletService } from '~/services/WalletService';

const { t } = useI18n();

const props = defineProps<{
	show: boolean;
	transactionId: string;
}>();

const emit = defineEmits<{
	(e: 'close'): void;
	(e: 'payment-initiated', url: string): void;
}>();

const isLoading = ref(false);

const proceedToPayment = async () => {
	isLoading.value = true;
	try {
		const { message } = await WalletService.initPayment(props.transactionId);
		// Emit the payment URL to parent component
		emit('payment-initiated', message);
	} catch (error) {
		console.error('Failed to initialize payment:', error);
	} finally {
		isLoading.value = false;
	}
};
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

.modal-enter-to,
.modal-leave-from {
	opacity: 1;
	transform: scale(1);
}
</style> 