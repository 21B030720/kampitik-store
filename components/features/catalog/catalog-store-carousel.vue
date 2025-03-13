<template>
	<div class="mb-8">
		<div class="flex justify-between items-center mb-4">
			<h2 class="text-2xl font-bold">{{ t('catalog.stores') }}</h2>
			<div class="flex items-center space-x-4">
				<!-- City Filter -->
				<div class="relative">
					<select
						v-model="selectedCityId"
						class="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none"
					>
						<option value="">{{ t('catalog.allCities') }}</option>
						<option
							v-for="city in cities"
							:key="city.id"
							:value="city.id"
						>
							{{ city.name }}
						</option>
					</select>
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
							d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
						/>
					</svg>
				</div>
			</div>
		</div>

		<!-- Loading State -->
		<div v-if="isLoading" class="flex justify-center items-center py-8">
			<p class="text-gray-500">{{ t('loading') }}</p>
		</div>

		<!-- Error State -->
		<div v-else-if="error" class="text-red-600 mb-4">
			{{ error }}
		</div>

		<!-- Stores Grid -->
		<div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
			<StoreCard
				v-for="store in stores"
				:key="store.id"
				:store="store"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, watch, onMounted } from 'vue';
	import { useI18n } from 'vue-i18n';
	import type { Store } from '~/types/store';
	import StoreCard from './catalog-store-card.vue';
	import { ShopService } from '~/services/ShopService';

	interface City {
		id: number;
		name: string;
	}

	const { t } = useI18n();

	// State
	const stores = ref<Store[]>([]);
	const cities = ref<City[]>([]);
	const isLoading = ref(false);
	const error = ref<string | null>(null);
	const selectedCityId = ref<number | ''>('');

	// Fetch cities
	const fetchCities = async () => {
		try {
			cities.value = await ShopService.getCities();
		} catch (err) {
			console.error('Failed to fetch cities:', err);
			error.value = t('errors.failedToLoadCities');
		}
	};

	// Fetch stores with city filter
	const fetchStores = async () => {
		try {
			isLoading.value = true;
			error.value = null;
			
			const filters = selectedCityId.value ? { city_id: selectedCityId.value } : undefined;
			stores.value = await ShopService.getShops(filters);
		} catch (err) {
			console.error('Failed to fetch stores:', err);
			error.value = t('errors.failedToLoadStores');
		} finally {
			isLoading.value = false;
		}
	};

	// Watch for city selection changes
	watch(selectedCityId, () => {
		fetchStores();
	});

	// Initial fetch
	onMounted(async () => {
		await fetchCities();
		await fetchStores();
	});
</script>
