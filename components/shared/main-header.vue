<template>
	<nav class="bg-white border-b-2 border-[#D6D6D6]">
		<div class="container mx-auto px-14">
			<div class="flex items-center justify-between h-16">
				<NuxtLink :to="localePath('/')" class="flex items-center">
					<img
						src="~/assets/images/logo.png"
						alt="Kampitik Store"
						class="h-14"
					>
				</NuxtLink>

				<div class="flex items-center space-x-6">
					<div class="flex space-x-4">
						<NuxtLink
							v-for="link in navigationLinks"
							:key="link.path"
							:to="localePath(link.path)"
							class="px-3 py-2 rounded-md hover:bg-gray-100"
							prefetch
						>
							{{ link.name }}
						</NuxtLink>
					</div>

					<!-- Basket Button -->
					<NuxtLink
						:to="localePath('/basket')"
						class="p-2 hover:bg-gray-100 rounded-full relative"
					>
						<img src="~/assets/icons/basket.svg" alt="Basket" class="w-6 h-6" >
						<span
							v-if="basketStore.itemCount > 0"
							class="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
						>
							{{ basketStore.itemCount }}
						</span>
					</NuxtLink>

					<a
						href="https://wa.me/YOUR_WHATSAPP_NUMBER"
						target="_blank"
						class="flex items-center px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#128C7E] transition-colors"
					>
						<img
							src="~/assets/icons/whatsapp.svg"
							alt="WhatsApp"
							class="w-5 h-5 mr-2 invert"
						>
						<span>{{ t('nav.chat') }}</span>
					</a>

					<template v-if="authStore.isAuthenticated">
						<div class="relative">
							<button
								class="flex items-center gap-2"
								@click.stop="toggleDropdown"
							>
								<div
									class="w-8 h-8 bg-[#128C7E] rounded-full flex items-center justify-center text-white"
								>
									{{ authStore.user?.username[0]?.toUpperCase() }}
								</div>
								<span class="text-xs">▼</span>
							</button>

							<div
								v-if="isDropdownOpen"
								class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
							>
								<div v-if="wallet" class="px-4 py-2 border-b">
									<div class="text-sm text-gray-600">{{ t('nav.balance') }}</div>
									<div class="font-semibold">{{ wallet.balance }}тг</div>
								</div>

								<NuxtLink
									:to="localePath('/cabinet')"
									class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
								>
									{{ t('nav.cabinet') }}
								</NuxtLink>
								<button
									class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
									@click="handleLogout"
								>
									{{ t('nav.logout') }}
								</button>
							</div>
						</div>
					</template>
					<template v-else>
						<NuxtLink
							:to="localePath('/login')"
							class="text-gray-600 hover:text-gray-900"
						>
							{{ t('nav.signIn') }}
						</NuxtLink>
					</template>
				</div>
			</div>
		</div>
	</nav>
</template>

<script setup lang="ts">
	import { ref, onMounted, onUnmounted, watch } from 'vue';
	import { useI18n } from 'vue-i18n';
	import { useBasketStore } from '~/stores/useBasketStore';
	import { useAuthStore } from '~/stores/useAuthStore';
	import { useRouter } from 'vue-router';
	import { WalletService } from '~/services/WalletService';
	import type { Wallet } from '~/types/wallet';

	const { t } = useI18n();
	const localePath = useLocalePath();
	const basketStore = useBasketStore();
	const authStore = useAuthStore();
	const router = useRouter();

	const isDropdownOpen = ref(false);
	const wallet = ref<Wallet | null>(null);

	const toggleDropdown = () => {
		isDropdownOpen.value = !isDropdownOpen.value;
	};

	const handleClickOutside = (event: MouseEvent) => {
		const dropdown = document.querySelector('.relative');
		if (dropdown && !dropdown.contains(event.target as Node)) {
			isDropdownOpen.value = false;
		}
	};

	const handleLogout = () => {
		authStore.logout();
		router.push(localePath('/'));
		isDropdownOpen.value = false;
	};

	onMounted(() => {
		document.addEventListener('click', handleClickOutside);
		fetchWallet();
	});

	onUnmounted(() => {
		document.removeEventListener('click', handleClickOutside);
	});

	const navigationLinks = [
		{ name: 'nav.home', path: '/' },
		{ name: 'nav.catalog', path: '/catalog' },
		// { name: 'nav.bonusPoints', path: '/bonus-points' },
	].map((link) => ({
		...link,
		name: t(link.name),
	}));

	// Fetch wallet data when authenticated
	const fetchWallet = async () => {
		if (authStore.isAuthenticated) {
			try {
				const walletData = await WalletService.getMyWallet();
				wallet.value = walletData;
			} catch (error) {
				console.error('Failed to fetch wallet:', error);
			}
		}
	};

	// Watch for auth state changes
	watch(() => authStore.isAuthenticated, (isAuthenticated) => {
		if (isAuthenticated) {
			fetchWallet();
		} else {
			wallet.value = null;
		}
	});
</script>
