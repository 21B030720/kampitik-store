<template>
	<div class="container mx-auto px-4 py-8">
		<h1 class="text-2xl font-bold mb-6">{{ t('cabinet.title') }}</h1>

		<div class="grid gap-6">
			<!-- Budget Section -->
			<div class="bg-white rounded-lg shadow-lg p-6">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-lg font-semibold">{{ t('cabinet.budget') }}</h2>
					<NuxtLink
						:to="localePath('/balance-replenishment')"
						class="bg-[#128C7E] text-white px-4 py-2 rounded-lg hover:bg-[#0E7265] transition-colors text-sm"
					>
						{{ t('cabinet.replenishBalance') }}
					</NuxtLink>
				</div>
				<div v-if="wallet" class="flex items-center justify-between">
					<div>
						<p class="text-gray-600">{{ t('cabinet.balance') }}</p>
						<p class="text-2xl font-bold">{{ wallet.balance }}тг</p>
					</div>
					<div class="text-sm text-gray-500">
						{{ t('cabinet.walletId') }}: {{ wallet.client_user_name }}
					</div>
				</div>
				<div v-else-if="isWalletLoading" class="text-gray-500">
					{{ t('loading') }}
				</div>
				<div v-else class="text-gray-500">
					{{ t('cabinet.noWallet') }}
				</div>
			</div>

			<!-- Client Info Section -->
			<div class="bg-white rounded-lg shadow-lg p-6">
				<h2 class="text-lg font-semibold mb-4">
					{{ t('cabinet.clientInfo') }}
				</h2>
				<div v-if="clientDetails" class="grid gap-4">
					<div>
						<span class="text-gray-600">{{ t('cabinet.name') }}:</span>
						<span class="ml-2">{{ clientDetails.name }}</span>
					</div>
					<div>
						<span class="text-gray-600">{{ t('cabinet.email') }}:</span>
						<span class="ml-2">{{ clientDetails.email }}</span>
						<span v-if="clientDetails.is_email_valid" class="ml-2 text-green-500 text-sm">
							✓ {{ t('cabinet.emailVerified') }}
						</span>
					</div>
					<div>
						<span class="text-gray-600">{{ t('cabinet.phone') }}:</span>
						<span class="ml-2">{{ clientDetails.phone_number }}</span>
					</div>
				</div>
				<div v-else-if="isClientLoading" class="text-gray-500">
					{{ t('loading') }}
				</div>
			</div>

			<!-- User Info Section -->
			<div class="bg-white rounded-lg shadow-lg p-6">
				<h2 class="text-lg font-semibold mb-4">
					{{ t('cabinet.personalInfo') }}
				</h2>
				<div class="grid gap-4">
					<div>
						<span class="text-gray-600">{{ t('cabinet.username') }}:</span>
						<span class="ml-2">{{ authStore.user?.username }}</span>
					</div>
					<div>
						<span class="text-gray-600">{{ t('cabinet.userId') }}:</span>
						<span class="ml-2">{{ authStore.user?.id }}</span>
					</div>
					<div>
						<span class="text-gray-600">{{ t('cabinet.clientId') }}:</span>
						<span class="ml-2">{{ authStore.user?.client_id }}</span>
					</div>
				</div>
			</div>

			<!-- Order History Section -->
			<div class="bg-white rounded-lg shadow-lg p-6">
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
	import { ref, onMounted } from 'vue';
	import { useI18n } from 'vue-i18n';
	import { useAuthStore } from '~/stores/useAuthStore';
	import { usePurchaseStore } from '~/stores/usePurchaseStore';
	import { WalletService } from '~/services/WalletService';
	import { ClientService } from '~/services/ClientService';
	import type { Wallet } from '~/types/wallet';
	import type { ClientDetails } from '~/types/client';

	const { t } = useI18n();
	const authStore = useAuthStore();
	const purchaseStore = usePurchaseStore();

	const wallet = ref<Wallet | null>(null);
	const isWalletLoading = ref(true);
	const clientDetails = ref<ClientDetails | null>(null);
	const isClientLoading = ref(true);

	onMounted(async () => {
		try {
			const walletData = await WalletService.getMyWallet();
			wallet.value = walletData;
		} catch (error) {
			console.error('Failed to fetch wallet:', error);
		} finally {
			isWalletLoading.value = false;
		}

		try {
			if (authStore.user?.client_id) {
				const details = await ClientService.getClientDetails(authStore.user.client_id);
				clientDetails.value = details;
			}
		} catch (error) {
			console.error('Failed to fetch client details:', error);
		} finally {
			isClientLoading.value = false;
		}
	});

	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString();
	};

	definePageMeta({
		middleware: ['auth']
	});
</script>
