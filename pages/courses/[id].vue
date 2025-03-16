<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="error" class="text-red-600 mb-4">{{ error }}</div>
    
    <div v-else-if="course" class="bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- Course Header -->
      <div class="p-6 border-b">
        <div class="flex items-start justify-between">
          <div>
            <h1 class="text-2xl font-bold mb-2">{{ course.title }}</h1>
            <p class="text-gray-600 mb-4">{{ course.description }}</p>
            <div class="flex items-center gap-2 text-sm">
              <span class="text-gray-500">{{ course.category_name }}</span>
              <span>•</span>
              <span class="text-gray-500">{{ course.company }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Course Details -->
      <div class="p-6">
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Left Column: Course Information -->
          <div class="space-y-6">
            <div>
              <h2 class="text-lg font-semibold mb-3">{{ t('course.details') }}</h2>
              <div class="space-y-3">
                <div>
                  <h3 class="font-medium">{{ t('course.company') }}</h3>
                  <p>{{ course.company }}</p>
                </div>
                <div>
                  <h3 class="font-medium">{{ t('course.location') }}</h3>
                  <p>{{ course.location }}</p>
                  <a 
                    v-if="course.two_gis_link"
                    :href="course.two_gis_link"
                    target="_blank"
                    class="text-primary-600 hover:text-primary-700 text-sm inline-block mt-1"
                  >
                    {{ t('common.viewOnMap') }}
                  </a>
                </div>
                <div>
                  <h3 class="font-medium">{{ t('course.ageRange') }}</h3>
                  <p>{{ course.from_age }}-{{ course.to_age }} {{ t('common.years') }}</p>
                </div>
                <div>
                  <h3 class="font-medium">{{ t('course.contacts') }}</h3>
                  <p>{{ course.contacts }}</p>
                  <div v-if="course.social_networks" class="mt-1">
                    <p class="text-sm text-gray-600">{{ course.social_networks }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Pricing Plans -->
          <div>
            <h2 class="text-lg font-semibold mb-4">{{ t('course.pricingPlans') }}</h2>
            <div class="space-y-4">
              <div 
                v-for="price in course.course_prices" 
                :key="price.id"
                class="border rounded-lg p-4"
              >
                <div class="flex justify-between items-start mb-2">
                  <h3 class="font-semibold text-lg">{{ price.name }}</h3>
                  <div class="text-right">
                    <p class="text-xl font-bold text-primary-600">{{ price.price }}₸</p>
                    <p class="text-sm text-gray-500">{{ t('course.per') }} {{ price.payment_period }}</p>
                  </div>
                </div>
                <p class="text-gray-600">{{ price.description }}</p>
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
import type { Course } from '~/types/course';
import { ShopService } from '~/services/ShopService';

const route = useRoute();
const { t } = useI18n();

const course = ref<Course | null>(null);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const id = Number(route.params.id);
    course.value = await ShopService.getCourseById(id);
  } catch (err) {
    console.error('Failed to fetch course details:', err);
    error.value = t('errors.failedToLoadCourse');
  }
});
</script> 