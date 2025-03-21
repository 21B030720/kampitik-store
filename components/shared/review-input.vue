<template>
  <div class="review-input-section border rounded-lg p-4 mb-6">
    <h3 class="text-lg font-semibold mb-4">
      {{ existingReview ? t('reviews.yourReview') : t('reviews.leaveReview') }}
    </h3>

    <!-- View Mode -->
    <div v-if="existingReview && !isEditing" class="space-y-4">
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-600">{{ t('reviews.rating') }}:</span>
        <div class="flex">
          <template v-for="star in 5" :key="star">
            <span
              class="text-2xl"
              :class="star <= existingReview.rating ? 'text-yellow-400' : 'text-gray-300'"
            >★</span>
          </template>
        </div>
      </div>

      <p class="text-gray-700 border rounded-lg p-3 bg-gray-50">
        {{ existingReview.review }}
      </p>

      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-500">
          {{ formatDate(existingReview.created_at) }}
        </span>
        <button
          class="text-primary-600 hover:text-primary-700"
          @click="startEditing"
        >
          {{ t('reviews.edit') }}
        </button>
      </div>
    </div>

    <!-- Edit Mode -->
    <div v-else>
      <!-- Rating Stars -->
      <div class="flex items-center gap-2 mb-4">
        <span class="text-sm text-gray-600">{{ t('reviews.rating') }}:</span>
        <div class="flex">
          <button
            v-for="star in 5"
            :key="star"
            class="text-2xl focus:outline-none"
            :class="star <= (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-300'"
            @click="rating = star"
            @mouseover="hoverRating = star"
            @mouseleave="hoverRating = 0"
          >★</button>
        </div>
      </div>

      <!-- Review Text -->
      <textarea
        v-model="reviewText"
        :placeholder="t('reviews.writeReview')"
        class="w-full p-3 border rounded-lg mb-4 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary-500"
        :maxlength="maxReviewLength"
      />

      <!-- Character Count -->
      <div class="text-sm text-gray-500 mb-4">
        {{ reviewText.length }}/{{ maxReviewLength }}
      </div>

      <!-- Submit Button -->
      <div class="flex gap-2">
        <button
          class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!isValid || isSubmitting"
          @click="submitReview"
        >
          {{ t(existingReview ? 'reviews.update' : 'reviews.submit') }}
        </button>
        
        <button
          v-if="isEditing"
          class="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
          @click="cancelEditing"
        >
          {{ t('reviews.cancel') }}
        </button>
      </div>

      <!-- Error Message -->
      <p v-if="error" class="text-red-500 mt-2 text-sm">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Review } from '~/types/review';

const props = defineProps<{
  existingReview?: Review | null;
  onSubmit: (rating: number, review: string) => Promise<void>;
}>();

const { t } = useI18n();

const isEditing = ref(false);
const rating = ref(props.existingReview?.rating || 0);
const hoverRating = ref(0);
const reviewText = ref(props.existingReview?.review || '');
const error = ref('');
const isSubmitting = ref(false);
const maxReviewLength = 500;

const isValid = computed(() => {
  return rating.value > 0 && reviewText.value.trim().length > 0;
});

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

const startEditing = () => {
  isEditing.value = true;
};

const cancelEditing = () => {
  isEditing.value = false;
  rating.value = props.existingReview?.rating || 0;
  reviewText.value = props.existingReview?.review || '';
  error.value = '';
};

const submitReview = async () => {
  if (!isValid.value) return;

  isSubmitting.value = true;
  error.value = '';
  
  try {
    await props.onSubmit(rating.value, reviewText.value.trim());
    if (isEditing.value) {
      isEditing.value = false;
    }
  } catch (err) {
    error.value = t('errors.failedToSubmitReview');
  } finally {
    isSubmitting.value = false;
  }
};

// Watch for changes in existingReview
watch(() => props.existingReview, (newReview) => {
  if (newReview) {
    rating.value = newReview.rating;
    reviewText.value = newReview.review;
  }
}, { immediate: true });
</script>