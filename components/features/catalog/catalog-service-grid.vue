<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <CatalogServiceCard
      v-for="service in services"
      :key="service.id"
      :service="service"
    />
  </div>
</template>

<script setup lang="ts">
import type { Service } from '~/types/service';
import { useI18n } from 'vue-i18n';
import CatalogServiceCard from './catalog-service-card.vue';

const { t } = useI18n();
const localePath = useLocalePath();

defineProps<{
  services: Service[];
}>();
</script>