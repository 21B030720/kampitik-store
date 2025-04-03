<template>
  <div>
    <!-- Courses grid -->
    <transition-group name="fade-slide" tag="div" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CatalogCourseCard
        v-for="course in courses"
        :key="course.id"
        :course="course"
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
import type { Course } from '~/types/course';
import { usePagination } from '~/composables/usePagination';
import { ShopService } from '~/services/ShopService';
import Pagination from '~/components/shared/pagination.vue';
import CatalogCourseCard from '~/components/features/catalog/catalog-course-card.vue';

const { t } = useI18n();
const isLoading = ref(false);
const error = ref<string | null>(null);

const props = defineProps<{
  filters: {
    name?: string;
    category_name?: string;
  };
}>();

const courses = ref<Course[]>([]);
const totalItems = ref(0);

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
    const response = await ShopService.getAllCourses({
      ...props.filters,
      ...paginationParams.value
    });

    courses.value = response.results;
    totalItems.value = response.count;
    setTotalItems(response.count); // Ensure totalPages is correctly set
  } catch (err) {
    console.error('Failed to fetch courses:', err);
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