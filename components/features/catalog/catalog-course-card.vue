<template>
  <NuxtLink
    :to="localePath(`/courses/${course.id}`)"
    class="bg-white rounded-lg hover:bg-[#F6FFFE] transition-colors flex flex-col h-full relative group card"
  >
    <div class="flex flex-row h-full">
      <!-- Image Section -->
      <div class="w-1/3 aspect-square relative rounded-lg overflow-hidden">
        <img
          v-if="course.image"
          :src="course.image"
          :alt="course.title"
          class="w-full h-full object-cover rounded-lg"
          @error="handleImageError"
        >
        <div
          v-else
          class="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center"
        >
          <span class="text-gray-400">No image</span>
        </div>
        <!-- Rating -->
        <div
          class="absolute top-2 left-2 bg-white rounded-full px-2 py-1 text-sm flex items-center gap-1"
        >
          <span>{{ course.avg_rating ?? 0 }}</span>
          <span class="text-yellow-400">★</span>
        </div>
      </div>

      <!-- Content Section -->
      <div class="w-2/3 p-4 flex flex-col flex-grow">
        <div class="flex-grow">
          <h3 class="font-semibold text-lg mb-2">{{ course.title }}</h3>
          <p class="text-gray-600 text-sm mb-4 description">{{ course.description }}</p>

          <!-- Course Details -->
          <div class="space-y-2 mb-4">
            <p class="text-sm">
              <span class="font-medium">{{ t('course.company') }}:</span> 
              {{ course.company }}
            </p>
            <p class="text-sm">
              <span class="font-medium">{{ t('course.location') }}:</span>
              {{ course.location }}
            </p>
            <p class="text-sm">
              <span class="font-medium">{{ t('course.ageRange') }}:</span>
              {{ course.from_age }}-{{ course.to_age }} {{ t('common.years') }}
            </p>
          </div>
        </div>

        <!-- Course Prices -->
        <div class="space-y-2">
          <div v-if="course.course_prices.length > 0" class="p-2 border rounded">
            <div class="flex justify-between items-center">
              <span class="font-medium">{{ course.course_prices[0].name }}</span>
              <span class="text-primary-600">{{ course.course_prices[0].price }}₸/{{ course.course_prices[0].payment_period }}</span>
            </div>
            <p class="text-sm text-gray-600 price-description">{{ course.course_prices[0].description }}</p>
          </div>
          <div v-if="course.course_prices.length > 1" class="p-2 border rounded bg-blue-100 text-blue-800">
            {{ t('course.additionalPrices') }}
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Course } from '~/types/course';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const localePath = useLocalePath();

defineProps<{
  course: Course;
}>();

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement;
  img.style.display = 'none';
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.aspect-square {
  aspect-ratio: 1;
}

.bg-blue-100 {
  background-color: #ebf8ff;
}

.text-blue-800 {
  color: #2c5282;
}

.description,
.price-description {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem; /* Adjust the gap between cards as needed */
}

.card {
  flex: 1 1 calc(33.333% - 1rem); /* Adjust the width of the cards as needed */
  display: flex;
  flex-direction: column;
  min-height: 300px; /* Set a minimum height for the cards */
}
</style>