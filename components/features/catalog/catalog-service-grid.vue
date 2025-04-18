<template>
  <div>
    <!-- Loading state -->
    <div v-if="isLoading" class="flex justify-center items-center">
      <p class="text-gray-500">{{ t('loading') }}</p>
    </div>

    <!-- Services grid -->
    <transition-group name="fade-slide" tag="div" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CatalogServiceCard
        v-for="service in services"
        :key="service.id"
        :service="service"
      />
    </transition-group>

    <!-- Pagination - show when there are items -->
    <Pagination
      v-if="totalItems > 0"
      :current-page="currentPage"
      :total-pages="totalPages"
      @update:page="onPageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Service } from '~/types/service';
import { usePagination } from '~/composables/usePagination';
import { ShopService } from '~/services/ShopService';
import Pagination from '~/components/shared/pagination.vue';
import CatalogServiceCard from './catalog-service-card.vue';

const { t } = useI18n();

const props = defineProps<{
  filters: {
    name?: string;
    category_name?: string;
  };
}>();

const services = ref<Service[]>([]);
const totalItems = ref(0);
const isLoading = ref(false);
const error = ref<string | null>(null);

const {
  currentPage,
  totalPages,
  paginationParams,
  setTotalItems,
  setPage
} = usePagination();

// Handle page change and fetch data
const onPageChange = async (page: number) => {
  setPage(page);
  isLoading.value = true;
  error.value = null;

  try {
    const response = await ShopService.getAllServices({
      ...props.filters,
      ...paginationParams.value
    });

    services.value = response.results;
    totalItems.value = response.count;
    setTotalItems(response.count); // Ensure totalPages is correctly set
  } catch (err) {
    console.error('Failed to fetch services:', err);
    error.value = t('catalog.fetchError');
  } finally {
    isLoading.value = false;
  }
};

// Initial data fetch
onMounted(() => {
  onPageChange(1);
});

// Watch filters changes
watch(() => props.filters, () => {
  onPageChange(1); // Reset to first page when filters change
}, { deep: true });
</script>

<style scoped>
/* Fade and slide transition styles */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>