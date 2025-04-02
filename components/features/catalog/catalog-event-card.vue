<template>
  <NuxtLink
    :to="localePath(`/events/${event.id}`)"
    class="bg-white rounded-lg hover:bg-[#F6FFFE] transition-colors flex flex-col h-full relative group"
  >
    <div class="aspect-square relative rounded-lg overflow-hidden">
      <img
        v-if="event.image"
        :src="event.image"
        :alt="event.title"
        class="w-full h-full object-cover rounded-lg"
        @error="handleImageError"
      >
      <div
        v-else
        class="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center"
      >
        <span class="text-gray-400">No image</span>
      </div>
    </div>
    <div class="p-4 flex flex-col flex-grow">
      <div class="flex-grow">
        <h3 class="font-semibold text-lg mb-2">{{ event.title }}</h3>
        <p class="text-gray-600 text-sm mb-4">{{ event.description }}</p>

        <!-- Event Details -->
        <div class="space-y-2 mb-4">
          <p class="text-sm">
            <span class="font-medium">{{ t('event.date') }}:</span>
            {{ formatDate(event.date_held) }}
          </p>
          <p class="text-sm">
            <span class="font-medium">{{ t('event.organizer') }}:</span>
            {{ event.organizator }}
          </p>
          <p class="text-sm">
            <span class="font-medium">{{ t('event.location') }}:</span>
            {{ event.location }}
          </p>
          <p class="text-sm">
            <span class="font-medium">{{ t('event.ageRange') }}:</span>
            {{ event.from_age }}-{{ event.to_age }} {{ t('common.years') }}
          </p>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <p class="text-lg font-bold">{{ event.price }}₸</p>
        <p class="text-sm text-gray-600">
          {{ t('event.ticketsLeft') }}: {{ event.tickets_left }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Event } from '~/types/event';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const localePath = useLocalePath();

defineProps<{
  event: Event;
}>();

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement;
  img.style.display = 'none';
};
</script>