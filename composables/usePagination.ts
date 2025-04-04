import { ref, computed } from 'vue';

export const DEFAULT_PER_PAGE = 10;
export const PER_PAGE = 10;
export const DEFAULT_PER_PAGE_OPTIONS = [10, 20, 50, 100];

export interface PaginationParams {
  page: number;
  per_page: number;
}

export function usePagination(initialPerPage = DEFAULT_PER_PAGE) {
  const currentPage = ref(1);
  const totalPages = ref(1);
  const totalItems = ref(0);
  const perPage = ref(initialPerPage);

  const paginationParams = computed<PaginationParams>(() => ({
    page: currentPage.value,
    per_page: perPage.value
  }));

  const setTotalItems = (total: number) => {
    totalItems.value = total;
    totalPages.value = Math.ceil(total / perPage.value);
  };

  const setPage = (page: number) => {
    currentPage.value = page;
  };

  const setPerPage = (newPerPage: number) => {
    perPage.value = newPerPage;
    // Recalculate total pages
    totalPages.value = Math.ceil(totalItems.value / newPerPage);
    // Reset to first page when changing items per page
    currentPage.value = 1;
  };

  return {
    currentPage,
    totalPages,
    totalItems,
    perPage,
    paginationParams,
    setTotalItems,
    setPage,
    setPerPage
  };
} 