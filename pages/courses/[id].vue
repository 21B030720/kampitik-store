<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="error" class="text-red-600 mb-4">{{ error }}</div>

    <div v-else-if="course" class="bg-white rounded-2xl border-2 border-[#E8EDF5] overflow-hidden">
      <!-- Course Header -->
      <div class="p-6 flex justify-between items-center">
        <button @click="goBack" class="text-custom-blue hover:text-custom-blue-dark flex items-center gap-2">
          <span>←</span>
          <span>{{ t('back.toCourses') }}</span>
        </button>
      </div>

      <!-- Course Content -->
      <div class="grid md:grid-cols-2 gap-8 p-6">
        <!-- Image Section -->
        <div>
          <img
            :src="course.image || placeholderImage"
            :alt="course.title"
            class="w-full aspect-square object-cover rounded-lg"
            @error="handleImageError"
          >
        </div>

        <!-- Course Info -->
        <div class="flex flex-col space-y-4">
          <div>
            <h1 class="text-3xl font-bold mb-2">{{ course.title }}</h1>
            <p class="text-gray-600 mb-4">{{ course.description }}</p>
            <div class="flex items-center gap-2 text-sm">
              <span class="text-gray-500">{{ course.category_name }}</span>
              <span>•</span>
              <span class="text-gray-500">{{ course.company }}</span>
            </div>
          </div>

          <!-- Course Details -->
          <div class="space-y-4">
            <div>
              <h2 class="font-semibold mb-2">{{ t('course.company') }}</h2>
              <p>{{ course.company }}</p>
            </div>

            <div>
              <h2 class="font-semibold mb-2">{{ t('course.location') }}</h2>
              <p>{{ course.location }}</p>
              <a 
                v-if="course.two_gis_link"
                :href="course.two_gis_link"
                target="_blank"
                class="text-white bg-custom-blue hover:bg-custom-blue-dark text-sm inline-block mt-1 px-4 py-2 rounded-lg transition-colors"
              >
                {{ t('common.viewOnMap') }}
              </a>
            </div>

            <div v-if="course.from_age !== null && course.to_age !== null">
              <h2 class="font-semibold mb-2">{{ t('course.ageRange') }}</h2>
              <p>{{ course.from_age }}-{{ course.to_age }} {{ t('common.years') }}</p>
            </div>

            <div>
              <h2 class="font-semibold mb-2">{{ t('course.contacts') }}</h2>
              <p class="text-xl font-bold text-custom-blue">{{ course.contacts }}</p>
              <div v-if="course.social_networks" class="mt-2">
                <p class="text-sm text-gray-600">{{ course.social_networks }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pricing Plans -->
      <div class="p-6">
        <h2 class="text-2xl font-semibold mb-4">{{ t('course.pricingPlans') }}</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div 
            v-for="price in course.course_prices" 
            :key="price.id"
            class="border rounded-lg p-4 shadow-lg"
          >
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-semibold text-lg">{{ price.name }}</h3>
              <div class="text-right">
                <p class="text-xl font-bold text-custom-blue">{{ price.price }}₸</p>
                <p class="text-sm text-gray-500">{{ t('course.per') }} {{ price.payment_period }}</p>
              </div>
            </div>
            <p class="text-gray-600">{{ price.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex justify-center items-center py-8">
      <p class="text-gray-500">{{ t('loading') }}</p>
    </div>

    <ReviewsSection
      :fetch-reviews="() => ShopService.getCourseReviews(courseId)"
      :submit-review="(rating, review) => ShopService.submitCourseReview(courseId, rating, review)"
      :fetch-my-review="() => ShopService.getMyCourseReview(courseId)"
      class="mt-8"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { Course } from '~/types/course';
import { ShopService } from '~/services/ShopService';
import ReviewsSection from '~/components/shared/reviews-section.vue';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const courseId = parseInt(route.params.id as string);
const course = ref<Course | null>(null);
const error = ref<string | null>(null);

const placeholderImage = new URL(
  '@/assets/images/course-placeholder.webp',
  import.meta.url,
).href;

onMounted(async () => {
  try {
    const id = Number(route.params.id);
    course.value = await ShopService.getCourseById(id);
  } catch (err) {
    console.error('Failed to fetch course details:', err);
    error.value = t('errors.failedToLoadCourse');
  }
});

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