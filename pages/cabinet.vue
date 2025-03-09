<template>
	<div class="container mx-auto px-4 py-8">
		<h1 class="text-2xl font-bold mb-6">{{ t('cabinet.title') }}</h1>

		<div class="bg-white rounded-lg shadow-lg p-6">
			<!-- User Info Section -->
			<div class="mb-8">
				<h2 class="text-lg font-semibold mb-4">
					{{ t('cabinet.personalInfo') }}
				</h2>
				<div class="grid gap-4">
					<div>
						<span class="text-gray-600">{{ t('cabinet.name') }}:</span>
						<span class="ml-2">{{ authStore.user?.name }}</span>
					</div>
					<div>
						<span class="text-gray-600">{{ t('cabinet.username') }}:</span>
						<span class="ml-2">{{ authStore.user?.username }}</span>
					</div>
					<div>
						<span class="text-gray-600">{{ t('cabinet.email') }}:</span>
						<span class="ml-2">{{ authStore.user?.email }}</span>
					</div>
					<div>
						<span class="text-gray-600">{{ t('cabinet.phone') }}:</span>
						<span class="ml-2">{{ authStore.user?.phone }}</span>
					</div>
				</div>
			</div>

			<!-- Order History Section -->
			<div>
				<h2 class="text-lg font-semibold mb-4">
					{{ t('cabinet.orderHistory') }}
				</h2>
				<div v-if="purchaseStore.purchases.length > 0">
					<div
						v-for="purchase in purchaseStore.purchases"
						:key="purchase.createdAt.toString()"
						class="border-b last:border-0 py-4"
					>
						<div class="flex justify-between items-start mb-2">
							<div>
								<p class="font-medium">{{ formatDate(purchase.createdAt) }}</p>
								<p class="text-sm text-gray-600">
									{{ purchase.totalAmount }}тг
								</p>
							</div>
							<span class="text-green-600 text-sm">{{
								t('cabinet.completed')
							}}</span>
						</div>
						<div class="text-sm text-gray-600">
							{{ purchase.items.length }} {{ t('cabinet.items') }}
						</div>
					</div>
				</div>
				<div v-else class="text-gray-500 text-center py-4">
					{{ t('cabinet.noOrders') }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useI18n } from 'vue-i18n';
	import { useAuthStore } from '~/stores/useAuthStore';
	import { usePurchaseStore } from '~/stores/usePurchaseStore';

	const { t } = useI18n();
	const authStore = useAuthStore();
	const purchaseStore = usePurchaseStore();

	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString();
	};
</script>
