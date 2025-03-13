<template>
	<div class="mb-8">
		<!-- Loading state -->
		<div v-if="isLoading" class="flex justify-center items-center py-8">
			<p class="text-gray-500">{{ t('loading') }}</p>
		</div>

		<!-- Error state -->
		<div v-else-if="error" class="text-red-600 mb-4">
			{{ error }}
		</div>

		<!-- Content -->
		<div v-else>
			<div class="flex justify-between items-center mb-4">
				<h2 class="text-2xl font-bold">{{ t('catalog.stores') }}</h2>
				<div class="flex items-center space-x-4">
					<div class="relative">
						<input
							v-model="searchQuery"
							type="text"
							:placeholder="t('catalog.searchStores')"
							class="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
						>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
					<select
						v-model="sortBy"
						class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
					>
						<option value="" disabled>{{ t('catalog.sortBy.label') }}</option>
						<option value="popularity">
							{{ t('catalog.sortBy.popularity') }}
						</option>
						<option value="newest">{{ t('catalog.sortBy.newest') }}</option>
						<option value="priceAsc">{{ t('catalog.sortBy.priceAsc') }}</option>
						<option value="priceDesc">{{ t('catalog.sortBy.priceDesc') }}</option>
					</select>
				</div>
			</div>
			<div class="relative">
				<!-- Navigation Buttons -->
				<button
					class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
					:disabled="isAtStart"
					@click="scrollStores('left')"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
				<button
					class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
					:disabled="isAtEnd"
					@click="scrollStores('right')"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>

				<!-- Stores Container -->
				<div
					ref="storesContainer"
					class="flex space-x-4 overflow-x-hidden scroll-smooth pb-4"
					@scroll="updateScrollState"
				>
					<StoreCard
						v-for="store in filteredStores"
						:key="store.id"
						:store="store"
					/>
				</div>

				<!-- Scroll Progress Indicator -->
				<div class="flex justify-center mt-4 space-x-1">
					<div
						v-for="index in Math.ceil(filteredStores.length / itemsPerView)"
						:key="index"
						:class="[
							'h-1 rounded transition-all duration-300',
							currentPage === index - 1
								? 'w-4 bg-primary-600'
								: 'w-2 bg-gray-300',
						]"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted, onUnmounted } from 'vue';
	import type { Store } from '~/types/store';
	import StoreCard from './catalog-store-card.vue';
	import { ShopService } from '~/services/ShopService';

	const { t } = useI18n();

	// Store state
	const stores = ref<Store[]>([]);
	const isLoading = ref(true);
	const error = ref<string | null>(null);

	// Search and sort state
	const searchQuery = ref('');
	const sortBy = ref('');

	// Fetch stores
	const fetchStores = async () => {
		try {
			isLoading.value = true;
			stores.value = await ShopService.getShops();
		} catch (err) {
			console.error('Failed to fetch stores:', err);
			error.value = 'Failed to load stores. Please try again later.';
		} finally {
			isLoading.value = false;
		}
	};

	// Filtered and sorted stores
	const filteredStores = computed(() => {
		let result = [...stores.value];

		// Apply search filter
		if (searchQuery.value) {
			const query = searchQuery.value.toLowerCase();
			result = result.filter((store) =>
				store.name.toLowerCase().includes(query),
			);
		}

		// Apply sorting
		switch (sortBy.value) {
			case 'popularity':
				result.sort((a, b) => (b.productCount || 0) - (a.productCount || 0));
				break;
			case 'newest':
				result.sort((a, b) => b.id - a.id);
				break;
			// Add more sorting options as needed
		}

		return result;
	});

	// Carousel state and controls
	const storesContainer = ref<HTMLElement | null>(null);
	const isAtStart = ref(true);
	const isAtEnd = ref(false);
	const currentPage = ref(0);
	const itemsPerView = ref(4);

	// Scroll stores carousel
	const scrollStores = (direction: 'left' | 'right') => {
		if (!storesContainer.value) return;

		const container = storesContainer.value;
		const scrollAmount = container.clientWidth;

		if (direction === 'left') {
			container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
		} else {
			container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
		}
	};

	// Update scroll state
	const updateScrollState = () => {
		if (!storesContainer.value) return;

		const container = storesContainer.value;
		isAtStart.value = container.scrollLeft <= 0;
		isAtEnd.value =
			container.scrollLeft + container.clientWidth >= container.scrollWidth;

		// Update current page
		currentPage.value = Math.floor(
			container.scrollLeft / container.clientWidth,
		);
	};

	// Update items per view based on viewport
	const updateItemsPerView = () => {
		if (window.innerWidth < 640) {
			itemsPerView.value = 1;
		} else if (window.innerWidth < 1024) {
			itemsPerView.value = 2;
		} else {
			itemsPerView.value = 4;
		}
	};

	// Lifecycle hooks
	onMounted(() => {
		fetchStores();
		updateItemsPerView();
		window.addEventListener('resize', updateItemsPerView);
	});

	onUnmounted(() => {
		window.removeEventListener('resize', updateItemsPerView);
	});
</script>

<style scoped>
	/* Hide scrollbar but keep functionality */
	.overflow-x-hidden::-webkit-scrollbar {
		display: none;
	}
	.overflow-x-hidden {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
