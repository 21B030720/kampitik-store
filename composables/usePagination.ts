import { ref, computed } from 'vue';

export const PER_PAGE = 10; // Global default value

export function usePagination() {
  const currentPage = ref(1);
  const totalPages = ref(1);
  const totalItems = ref(0);

  const paginationParams = computed(() => ({
    page: currentPage.value,
    per_page: PER_PAGE
  }));

  const setTotalItems = (total: number) => {
    totalItems.value = total;
    totalPages.value = Math.ceil(total / PER_PAGE);
  };

  const setPage = (page: number) => {
    currentPage.value = page;
  };

  return {
    currentPage,
    totalPages,
    totalItems,
    paginationParams,
    setTotalItems,
    setPage
  };
} 