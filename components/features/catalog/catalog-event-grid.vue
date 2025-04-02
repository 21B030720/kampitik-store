<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <EventCard
      v-for="event in events"
      :key="event.id"
      :event="event"
    />
  </div>
</template>

<script setup lang="ts">
import type { Event } from '~/types/event';
import { useI18n } from 'vue-i18n';
import EventCard from '~/components/features/catalog/catalog-event-card.vue';

const { t } = useI18n();
const localePath = useLocalePath();

defineProps<{
  events: Event[];
}>();
</script>