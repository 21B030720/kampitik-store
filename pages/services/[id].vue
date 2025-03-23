<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="error" class="text-red-600 mb-4">{{ error }}</div>
    
    <div v-else-if="service" class="bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- Service Header -->
      <div class="p-6 border-b">
        <div class="flex items-start justify-between">
          <div>
            <h1 class="text-2xl font-bold mb-2">{{ service.title }}</h1>
            <p v-if="service.details" class="text-gray-600 mb-4">{{ service.details }}</p>
            <div class="flex items-center gap-2 text-sm">
              <span class="text-gray-500">{{ service.category_name }}</span>
              <span v-if="service.service_type">•</span>
              <span v-if="service.service_type" class="text-gray-500">
                {{ service.service_type }}
              </span>
            </div>
          </div>
          <div class="text-right">
            <p class="text-2xl font-bold">{{ service.price }}₸</p>
            <p v-if="service.payment_period" class="text-sm text-gray-600">
              /{{ service.payment_period }}
            </p>
          </div>
        </div>
      </div>

      <!-- Service Provider -->
      <div class="p-6 border-b">
        <h2 class="text-lg font-semibold mb-4">{{ t('service.providerDetails') }}</h2>
        <div class="flex items-start gap-4">
          <img
            v-if="service.service_provider.profile_photo"
            :src="service.service_provider.profile_photo"
            :alt="service.service_provider.full_name"
            class="w-20 h-20 rounded-full object-cover"
          />
          <div class="flex-grow">
            <h3 class="font-medium text-lg">{{ service.service_provider.full_name }}</h3>
            <div class="flex items-center gap-2 mt-1">
              <div class="flex items-center">
                <span class="text-yellow-400">★</span>
                <span class="ml-1">
                  {{ service.service_provider.avg_rating || t('service.noRating') }}
                </span>
                <span class="text-sm text-gray-500 ml-1">
                  ({{ service.service_provider.rating_count }})
                </span>
              </div>
            </div>
            <div class="mt-2 space-y-1">
              <p class="text-sm">{{ service.service_provider.email }}</p>
              <p class="text-sm">{{ service.service_provider.phone_number }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Rating Section -->
      <div class="p-6">
        <button
          class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          @click="showRatingModal = true"
        >
          {{ t('service.rateProvider') }}
        </button>
      </div>
    </div>

    <div v-else class="flex justify-center items-center py-8">
      <p class="text-gray-500">{{ t('loading') }}</p>
    </div>

    <!-- Add the modal at the end of the template -->
    <!-- <ServiceRatingModal
      :show="showRatingModal"
      :service-id="Number(route.params.id)"
      @close="showRatingModal = false"
      @rated="refreshServiceData"
    /> -->
    
    <ReviewsSection
        :fetch-reviews="() => ShopService.getServiceReviews(serviceId)"
        :submit-review="(rating, review) => ShopService.submitServiceReview(serviceId, rating, review)"
        :fetch-my-review="() => ShopService.getMyServiceReview(serviceId)"
        class="mt-8"
    />
    
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { Service } from '~/types/service';
import { ShopService } from '~/services/ShopService';
import { useAuthStore } from '~/stores/useAuthStore';
import ServiceRatingModal from '~/components/features/service/service-rating-modal.vue';
import ReviewsSection from '~/components/shared/reviews-section.vue';

const route = useRoute();
const { t } = useI18n();
const authStore = useAuthStore();

const serviceId = parseInt(route.params.id as string);
const service = ref<Service | null>(null);
const error = ref<string | null>(null);
const showRatingModal = ref(false);

onMounted(async () => {
  try {
    const id = Number(route.params.id);
    service.value = await ShopService.getServiceById(id);
  } catch (err) {
    console.error('Failed to fetch service details:', err);
    error.value = t('errors.failedToLoadService');
  }
});

const refreshServiceData = async () => {
  try {
    const id = Number(route.params.id);
    service.value = await ShopService.getServiceById(id);
  } catch (err) {
    console.error('Failed to refresh service details:', err);
  }
};
</script> 