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
    
    <!-- Stores Carousel -->
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
        <ShopCard
          v-for="store in stores"
          :key="store.id"
          :store="store"
        />
      </div>

      <!-- Scroll Progress Indicator -->
      <div class="flex justify-center mt-4 space-x-1">
        <div
          v-for="index in Math.ceil(stores.length / itemsPerView)"
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
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Shop } from '~/types/shop';
import ShopCard from './catalog-shop-card.vue';
import { ShopService } from '~/services/ShopService';

interface City {
  id: number;
  name: string;
}

const { t } = useI18n();

// State
const stores = ref<Shop[]>([]);
const cities = ref<City[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);
const selectedCityId = ref<number | ''>('');
const currentPage = ref(0);
const itemsPerView = ref(4); // Number of items per view

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

// Carousel state and controls
const storesContainer = ref<HTMLElement | null>(null);
const isAtStart = ref(true);
const isAtEnd = ref(false);

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