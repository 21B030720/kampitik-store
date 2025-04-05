<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="error" class="text-red-600 mb-4">{{ error }}</div>

    <div v-else-if="event" class="bg-white rounded-2xl border-2 border-[#E8EDF5] overflow-hidden relative">
      <!-- Event Header -->
      <div class="p-6 flex justify-between items-center">
        <button @click="goBack" class="text-custom-blue hover:text-custom-blue-dark flex items-center gap-2">
          <span>←</span>
          <span>{{ t('back.toEvents') }}</span>
        </button>
      </div>

      <!-- Event Content -->
      <div class="grid md:grid-cols-2 gap-8 p-6">
        <!-- Image Section -->
        <div>
          <img
            :src="event.image || placeholderImage"
            :alt="event.title"
            class="w-full aspect-square object-cover rounded-lg"
            @error="handleImageError"
          >
        </div>

        <!-- Event Info -->
        <div class="flex flex-col space-y-4 relative">
          <div>
            <h1 class="text-3xl font-bold mb-2">{{ event.title }}</h1>
            <p class="text-gray-600 mb-4">{{ event.description }}</p>
            <div class="flex items-center gap-2 text-sm">
              <span class="text-gray-500">{{ event.category_name }}</span>
              <span>•</span>
              <span class="text-gray-500">{{ formatDate(event.date_held) }}</span>
            </div>
          </div>

          <!-- Event Details -->
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
                class="text-white bg-custom-blue hover:bg-custom-blue-dark text-sm inline-block mt-1 px-4 py-2 rounded-lg transition-colors"
              >
                {{ t('common.viewOnMap') }}
              </a>
            </div>

            <div v-if="event.from_age !== null && event.to_age !== null">
              <h2 class="font-semibold mb-2">{{ t('event.ageRange') }}</h2>
              <p>{{ event.from_age }}-{{ event.to_age }} {{ t('common.years') }}</p>
            </div>

            <div>
              <h2 class="font-semibold mb-2">{{ t('event.contacts') }}</h2>
              <p class="text-xl font-bold text-custom-blue">{{ event.contacts }}</p>
              <div v-if="event.social_networks" class="mt-2">
                <p class="text-sm text-gray-600">{{ event.social_networks }}</p>
              </div>
            </div>
          </div>

          <!-- Price and Tickets Left -->
          <div class="absolute bottom-0 right-0 p-6 text-right">
            <p class="text-2xl font-bold">{{ event.price }}₸</p>
            <p class="text-sm text-gray-600">
              {{ t('event.ticketsLeft') }}: {{ event.tickets_left }}
            </p>
          </div>
        </div>
      </div>

      
    </div>

    <div v-else class="flex justify-center items-center py-8">
      <p class="text-gray-500">{{ t('loading') }}</p>
    </div>
    <ReviewsSection
      :fetch-reviews="() => ShopService.getEventReviews(eventId)"
      :submit-review="(rating, review) => ShopService.submitEventReview(eventId, rating, review)"
      :fetch-my-review="() => ShopService.getMyEventReview(eventId)"
      class="mt-8"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { Event } from '~/types/event';
import { ShopService } from '~/services/ShopService';
import ReviewsSection from '~/components/shared/reviews-section.vue';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const eventId = parseInt(route.params.id as string);
const event = ref<Event | null>(null);
const error = ref<string | null>(null);

const placeholderImage = new URL(
  '@/assets/images/event-placeholder.png',
  import.meta.url,
).href;

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

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = placeholderImage;
};

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.bg-custom-blue {
  background-color: #128C7E;
}

.hover\:bg-custom-blue-dark:hover {
  background-color: #0A6C5A;
}
</style>