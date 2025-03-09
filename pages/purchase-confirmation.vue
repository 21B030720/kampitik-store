<template>
	<div class="container mx-auto px-4 py-8">
		<div class="max-w-2xl mx-auto text-center">
			<div class="bg-white rounded-lg shadow-lg p-8">
				<h1 class="text-2xl font-bold text-green-600 mb-4">
					{{ t('purchase.confirmed') }}
				</h1>
				<p class="text-gray-600 mb-6">
					{{ t('purchase.thankYou') }}
				</p>

				<div v-if="purchaseStore.currentPurchase" class="text-left mb-8">
					<h2 class="font-semibold mb-2">{{ t('purchase.orderDetails') }}</h2>
					<div class="space-y-2 text-sm">
						<p>
							<span class="text-gray-600">{{ t('purchase.name') }}:</span>
							{{ purchaseStore.currentPurchase.customerName }}
						</p>
						<p>
							<span class="text-gray-600">{{ t('purchase.phone') }}:</span>
							{{ purchaseStore.currentPurchase.phoneNumber }}
						</p>
						<p>
							<span class="text-gray-600">{{ t('purchase.address') }}:</span>
							{{ purchaseStore.currentPurchase.address }}
						</p>
						<p>
							<span class="text-gray-600">{{ t('purchase.total') }}:</span>
							{{ purchaseStore.currentPurchase.totalAmount }}тг
						</p>
					</div>
				</div>

				<NuxtLink
					:to="localePath('/catalog')"
					class="inline-block bg-[#128C7E] text-white px-6 py-3 rounded-lg hover:bg-[#0E7265] transition-colors"
				>
					{{ t('purchase.continueShopping') }}
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useI18n } from 'vue-i18n';
	import { usePurchaseStore } from '~/stores/usePurchaseStore';

	const { t } = useI18n();
	const localePath = useLocalePath();
	const purchaseStore = usePurchaseStore();

	onUnmounted(() => {
		purchaseStore.clearCurrentPurchase();
	});
</script>
