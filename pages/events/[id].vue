<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="error" class="text-red-600 mb-4">{{ error }}</div>
    
    <div v-else-if="event" class="bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- Event Header -->
      <div class="p-6 border-b">
        <div class="flex items-start justify-between">
          <div>
            <h1 class="text-2xl font-bold mb-2">{{ event.title }}</h1>
            <p class="text-gray-600 mb-4">{{ event.description }}</p>
            <div class="flex items-center gap-2 text-sm">
              <span class="text-gray-500">{{ event.category_name }}</span>
              <span>•</span>
              <span class="text-gray-500">{{ formatDate(event.date_held) }}</span>
            </div>
          </div>
          <div class="text-right">
            <p class="text-2xl font-bold">{{ event.price }}₸</p>
            <p class="text-sm text-gray-600">
              {{ t('event.ticketsLeft') }}: {{ event.tickets_left }}
            </p>
          </div>
        </div>
      </div>

      <!-- Event Details -->
      <div class="p-6">
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Left Column -->
          <div class="space-y-4">
            <div>
              <h2 class="font-semibold mb-2">{{ t('event.organizer') }}</h2>
              <p>{{ event.organizator }}</p>
            </div>
            
            <div>
              <h2 class="font-semibold mb-2">{{ t('event.location') }}</h2>
              <p>{{ event.location }}</p>
              <a 
                v-if="event.two_gis_link"
                :href="event.two_gis_link"
                target="_blank"
                class="text-primary-600 hover:text-primary-700 text-sm inline-block mt-1"
              >
                {{ t('common.viewOnMap') }}
              </a>
            </div>

            <div>
              <h2 class="font-semibold mb-2">{{ t('event.ageRange') }}</h2>
              <p>{{ event.from_age }}-{{ event.to_age }} {{ t('common.years') }}</p>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-4">
            <div>
              <h2 class="font-semibold mb-2">{{ t('event.contacts') }}</h2>
              <p>{{ event.contacts }}</p>
              <div v-if="event.social_networks" class="mt-2">
                <p class="text-sm text-gray-600">{{ event.social_networks }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex justify-center items-center py-8">
      <p class="text-gray-500">{{ t('loading') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { Event } from '~/types/event';
import { ShopService } from '~/services/ShopService';

const route = useRoute();
const { t } = useI18n();

const event = ref<Event | null>(null);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const id = Number(route.params.id);
    event.value = await ShopService.getEventById(id);
  } catch (err) {
    console.error('Failed to fetch event details:', err);
    error.value = t('errors.failedToLoadEvent');
  }
});

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script> 