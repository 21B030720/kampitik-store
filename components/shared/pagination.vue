<template>
  <div class="flex items-center justify-center space-x-2 mt-6">
    <!-- Previous button -->
    <button
      class="px-3 py-1 rounded-lg border"
      :class="[
        currentPage === 1 
        ? 'text-gray-400 border-gray-200 cursor-not-allowed' 
        : 'text-gray-700 border-gray-300 hover:bg-gray-50'
      ]"
      :disabled="currentPage === 1"
      @click="$emit('update:page', currentPage - 1)"
    >
      ←
    </button>

    <!-- Page numbers -->
    <div class="flex space-x-1">
      <button
        v-for="page in displayedPages"
        :key="page"
        class="px-3 py-1 rounded-lg border"
        :class="[
          page === currentPage
          ? 'bg-primary-500 text-white border-primary-500'
          : 'text-gray-700 border-gray-300 hover:bg-gray-50'
        ]"
        @click="$emit('update:page', page)"
      >
        {{ page }}
      </button>
    </div>

    <!-- Next button -->
    <button
      class="px-3 py-1 rounded-lg border"
      :class="[
        currentPage === totalPages 
        ? 'text-gray-400 border-gray-200 cursor-not-allowed' 
        : 'text-gray-700 border-gray-300 hover:bg-gray-50'
      ]"
      :disabled="currentPage === totalPages"
      @click="$emit('update:page', currentPage + 1)"
    >
      →
    </button>

    <!-- Items per page selector (optional) -->
    <select
      v-if="showPerPage"
      v-model="perPageModel"
      class="ml-4 px-2 py-1 border rounded-lg"
    >
      <option v-for="size in perPageOptions" :key="size" :value="size">
        {{ size }} / page
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  currentPage: number;
  totalPages: number;
  perPage?: number;
  showPerPage?: boolean;
  perPageOptions?: number[];
}>();

const emit = defineEmits<{
  (e: 'update:page', page: number): void;
  (e: 'update:perPage', perPage: number): void;
}>();

const perPageModel = computed({
  get: () => props.perPage ?? 10,
  set: (value: number) => emit('update:perPage', value)
});

// Show max 5 pages, centered around current page
const displayedPages = computed(() => {
  const pages: number[] = [];
  const maxPages = 5;
  let start = Math.max(1, props.currentPage - Math.floor(maxPages / 2));
  let end = Math.min(props.totalPages, start + maxPages - 1);

  if (end - start + 1 < maxPages) {
    start = Math.max(1, end - maxPages + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});
</script>