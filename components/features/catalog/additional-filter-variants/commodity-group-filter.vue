<template>
  <div class="relative">
    <label class="block text-sm font-medium mb-1">
      {{ t('catalog.filters.commodityGroup') }}
    </label>
    <select
      v-model="localFilters.commodity_group_id"
      class="w-full border rounded-lg p-2"
      @change="handleInput"
    >
      <option value="">{{ t('catalog.filters.allCommodityGroups') }}</option>
      <option
        v-for="group in commodityGroups"
        :key="group.id"
        :value="group.id"
      >
        {{ group.name }}
      </option>
    </select>
    <!-- Loading indicator for commodity group select -->
    <div v-if="isDebouncing" class="absolute right-8 top-[34px]">
      <div class="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { CommodityGroup } from '~/types/commodity-group';
import type { ProductFilterParams } from '~/types/product';

const { t } = useI18n();

const props = defineProps<{
  localFilters: ProductFilterParams;
  commodityGroups: CommodityGroup[];
  handleInput: () => void;
  isDebouncing: boolean;
}>();
</script>