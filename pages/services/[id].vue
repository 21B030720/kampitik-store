<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="error" class="text-red-600 mb-4">{{ error }}</div>

    <div v-else-if="service" class="bg-white rounded-2xl border-2 border-[#E8EDF5] overflow-hidden shadow-lg">
      <!-- Service Header -->
      <div class="p-6 flex justify-between items-center bg-custom-blue text-white">
        <button @click="goBack" class="hover:text-custom-blue-dark flex items-center gap-2">
          <span>←</span>
          <span>{{ t('back.toServices') }}</span>
        </button>
      </div>

      <!-- Image Section -->
      <div class="flex justify-center items-center p-6 bg-gray-100">
        <img
          :src="service.service_provider.profile_photo || placeholderImage"
          :alt="service.service_provider.full_name"
          class="w-40 h-40 rounded-full object-cover border-4 border-white shadow-md"
          @error="handleImageError"
        >
      </div>

      <!-- Service Content -->
      <div class="p-6">
        <div class="flex flex-col space-y-4">
          <div class="text-center">
            <h1 class="text-3xl font-bold mb-2 text-custom-blue">{{ service.title }}</h1>
            <div class="flex justify-center items-center gap-2 mt-1">
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
            <p v-if="service.details" class="text-gray-600 mb-4">{{ service.details }}</p>
            <div class="flex justify-center items-center gap-2 text-sm">
              <span class="text-gray-500">{{ service.category_name }}</span>
              <span v-if="service.service_type">•</span>
              <span v-if="service.service_type" class="text-gray-500">
                {{ service.service_type }}
              </span>
            </div>
          </div>

          <!-- Service Provider Details -->
          <div class="space-y-4 text-center">
            <div>
              <h2 class="font-semibold mb-2 text-custom-blue">{{ t('service.providerDetails') }}</h2>
              <h3 class="font-medium text-lg">{{ service.service_provider.full_name }}</h3>
              <div class="mt-2 space-y-1">
                <p class="text-lg">{{ service.service_provider.email }}</p>
                <p class="text-lg">{{ service.service_provider.phone_number }}</p>
              </div>
            </div>

            <div>
              <h2 class="font-semibold mb-2 text-custom-blue">{{ t('service.address') }}</h2>
              <p>{{ service.address }}</p>
              <a 
                v-if="service.two_gis_link"
                :href="service.two_gis_link"
                target="_blank"
                class="text-white bg-custom-blue hover:bg-custom-blue-dark text-sm inline-block mt-1 px-4 py-2 rounded-lg transition-colors"
              >
                {{ t('common.viewOnMap') }}
              </a>
            </div>
          </div>

          <div class="text-center">
            <p class="text-2xl font-bold text-custom-blue">{{ service.price }}₸</p>
            <p v-if="service.payment_period" class="text-sm text-gray-600">
              /{{ service.payment_period }}
            </p>
          </div>
        </div>
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
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { Service } from '~/types/service';
import { ShopService } from '~/services/ShopService';
import { useAuthStore } from '~/stores/useAuthStore';
import ServiceRatingModal from '~/components/features/service/service-rating-modal.vue';
import ReviewsSection from '~/components/shared/reviews-section.vue';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const authStore = useAuthStore();

const serviceId = parseInt(route.params.id as string);
const service = ref<Service | null>(null);
const error = ref<string | null>(null);
const showRatingModal = ref(false);

const placeholderImage = new URL(
  '@/assets/images/profile-placeholder.jpg',
  import.meta.url,
).href;

onMounted(async () => {
  try {
    const id = Number(route.params.id);
    service.value = await ShopService.getServiceById(id);
  } catch (err) {
    console.error('Failed to fetch service details:', err);
    error.value = t('errors.failedToLoadService');
  }
});

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = placeholderImage;
};

const goBack = () => {
  router.back();
};

const refreshServiceData = async () => {
  try {
    const id = Number(route.params.id);
    service.value = await ShopService.getServiceById(id);
  } catch (err) {
    console.error('Failed to refresh service details:', err);
  }
};
</script>

<style scoped>
.bg-custom-blue {
  background-color: #128C7E;
}

.hover\:bg-custom-blue-dark:hover {
  background-color: #0A6C5A;
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>