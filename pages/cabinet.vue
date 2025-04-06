<template>
	<div class="container mx-auto px-4 py-8">
		<h1 class="text-2xl font-bold mb-6">{{ t('cabinet.title') }}</h1>

		<div class="grid gap-6">
    		<WalletSection
            :wallet="wallet"
            :is-loading="isWalletLoading"
        />

        <ClientInfoSection
            :client-details="clientDetails"
            :is-loading="isClientLoading"
        />

        <UserInfoSection
            :user="authStore.user"
        />
			
		<KidsSection
            :kids="kids"
            :is-loading="isKidsLoading"
            @add-kid="showAddKidModal = true"
        />
        
        <ClientOrdersSection />

		<TransactionHistorySection
            :transactions="transactions"
            :is-loading="isTransactionsLoading"
        />
		</div>
		<AddKidModal
          :show="showAddKidModal"
          @close="showAddKidModal = false"
          @added="refreshKids"
        />
		
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
	import WalletSection from '~/components/features/cabinet/wallet-section.vue';
    import ClientInfoSection from '~/components/features/cabinet/client-info-section.vue';
    import UserInfoSection from '~/components/features/cabinet/user-info-section.vue';
    import TransactionHistorySection from '~/components/features/cabinet/transaction-history-section.vue';
	import AddKidModal from '~/components/features/cabinet/add-kid-modal.vue';
    import KidsSection from '~/components/features/cabinet/kids/kid-section.vue';
	import ClientOrdersSection from '~/components/features/cabinet/client-orders-section.vue';
    import placeholderKid from '@/assets/images/placeholder-kid.jpg';
    
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
	const placeholderImage = placeholderKid;

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
