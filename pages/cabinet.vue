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

			<!-- Kids Section -->
			<div class="bg-white rounded-lg shadow-lg p-6">
				<div class="flex justify-between items-center mb-6">
					<h2 class="text-lg font-semibold">{{ t('cabinet.children') }}</h2>
					<button
						class="inline-flex items-center bg-[#128C7E] text-white px-4 py-2 rounded-lg hover:bg-[#0E7265] transition-colors text-sm"
						@click="showAddKidModal = true"
					>
						<span class="mr-2">+</span>
						{{ t('cabinet.addChild') }}
					</button>
				</div>

				<!-- Loading State -->
				<div v-if="isKidsLoading" class="text-center py-4">
					<p class="text-gray-500">{{ t('loading') }}</p>
				</div>

				<!-- No Kids Message -->
				<p
					v-else-if="kids.length === 0"
					class="text-center text-gray-500 py-4"
				>
					{{ t('cabinet.noKids') }}
				</p>

				<!-- Kids Grid -->
				<div
					v-else
					class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
				>
					<NuxtLink
						v-for="kid in kids"
						:key="kid.id"
						:to="localePath(`/kids/${kid.id}`)"
						class="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
					>
						<!-- Kid Card Content -->
						<div class="aspect-square relative">
							<img
								:src="kid.image || placeholderImage"
								:alt="kid.name"
								class="w-full h-full object-cover"
								@error="handleImageError"
							>
							<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
								<div class="flex items-center gap-2">
									<img
										v-if="kid.kid_level.level_image"
										:src="kid.kid_level.level_image"
										:alt="kid.kid_level.level_name"
										class="w-6 h-6"
									>
									<span class="text-white text-sm">{{ kid.kid_level.level_name }}</span>
								</div>
							</div>
						</div>

						<div class="p-4">
							<div class="flex justify-between items-start mb-2">
								<div>
									<h3 class="font-semibold">{{ kid.name }}</h3>
									<p class="text-sm text-gray-600">{{ kid.age }} {{ t('common.years') }}</p>
								</div>
								<div class="text-right">
									<p class="font-medium text-primary-600">{{ kid.xp }} XP</p>
								</div>
							</div>

							<!-- Progress bar -->
							<div class="mt-2">
								<div class="h-2 bg-gray-200 rounded-full overflow-hidden">
									<div
										class="h-full bg-primary-600 transition-all"
										:style="{ width: `${kid.kid_level.current_progress}%` }"
									/>
								</div>
								<div class="flex justify-between text-xs text-gray-500 mt-1">
									<span>{{ kid.kid_level.from_xp }} XP</span>
									<span>{{ kid.kid_level.to_xp }} XP</span>
								</div>
							</div>
						</div>
					</NuxtLink>
				</div>
			</div>

			<!-- Order History Section -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-lg font-semibold mb-4">
                {{ t('cabinet.transactionHistory') }}
                </h2>
                <!-- Loading State -->
                <div v-if="isTransactionsLoading" class="text-center py-4">
                <p class="text-gray-500">{{ t('loading') }}</p>
                </div>
                <!-- Transactions List -->
                <div v-else-if="transactions.length > 0">
                <div
                    v-for="transaction in transactions"
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
            </div>
            <!-- No Transactions -->
            <div v-else class="text-gray-500 text-center py-4">
                {{ t('cabinet.noTransactions') }}
            </div>
		</div>

		<!-- Add Kid Modal -->
		<AddKidModal
			:show="showAddKidModal"
			@close="showAddKidModal = false"
			@added="refreshKids"
		/>
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
	import { KidService } from '~/services/KidService';
	import type { Wallet, Transaction } from '~/types/wallet';
	import type { ClientDetails } from '~/types/client';
	import type { Kid } from '~/types/kid';
	import KidsList from '~/components/features/cabinet/kids-list.vue';
	import AddKidModal from '~/components/features/cabinet/add-kid-modal.vue';

	const { t } = useI18n();
	const authStore = useAuthStore();
	const localePath = useLocalePath();

	const purchaseStore = usePurchaseStore();

	const wallet = ref<Wallet | null>(null);
	const isWalletLoading = ref(true);
	const clientDetails = ref<ClientDetails | null>(null);
	const isClientLoading = ref(true);
	const kids = ref<Kid[]>([]);
	const isKidsLoading = ref(true);
	const showAddKidModal = ref(false);
	const transactions = ref<Transaction[]>([]);
	const isTransactionsLoading = ref(true);
	const placeholderImage = new URL(
		'@/assets/images/placeholder-kid.png',
		import.meta.url
	).href;

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

		try {
			const kidsResponse = await KidService.getKids();
			kids.value = kidsResponse.results;
		} catch (error) {
			console.error('Failed to fetch kids:', error);
		} finally {
			isKidsLoading.value = false;
		}
		
		try {
          const transactionHistory = await WalletService.getTransactionHistory();
          transactions.value = transactionHistory.results;
        } catch (error) {
          console.error('Failed to fetch transaction history:', error);
        } finally {
          isTransactionsLoading.value = false;
        }
	});

	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString();
	};

	const refreshKids = async () => {
		try {
			const kidsResponse = await KidService.getKids();
			kids.value = kidsResponse.results;
		} catch (error) {
			console.error('Failed to refresh kids:', error);
		}
	};

	const handleImageError = (event: Event) => {
		const img = event.target as HTMLImageElement;
		img.src = placeholderImage;
	};

	definePageMeta({
		middleware: ['auth']
	});
</script>
