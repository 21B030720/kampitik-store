<template>
  <div class="reviews-section mt-8">
    <h2 class="text-2xl font-semibold mb-4">{{ t('reviews.title') }}</h2>
    
    <ReviewInput :on-submit="handleReviewSubmit" :existing-review="myReview" />
    
    <!-- Reviews Stats -->
    <div v-if="reviews.length" class="mb-6">
      <div class="flex items-center gap-2">
        <span class="text-2xl font-bold">{{ averageRating }}</span>
        <div class="flex items-center">
          <template v-for="i in 5" :key="i">
            <span
              class="text-xl"
              :class="i <= averageRating ? 'text-yellow-400' : 'text-gray-300'"
            >★</span>
          </template>
        </div>
        <span class="text-gray-600">({{ reviews.length }} {{ t('reviews.count') }})</span>
      </div>
    </div>

    <!-- Reviews List -->
    <div v-if="reviews.length" class="space-y-4">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="border-b pb-4"
      >
        <div class="flex justify-between items-start">
          <div>
            <div class="flex items-center gap-2">
              <span class="font-semibold">{{ review.client_name }}</span>
              <div class="flex">
                <template v-for="i in 5" :key="i">
                  <span
                    :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
                  >★</span>
                </template>
              </div>
            </div>
            <p class="text-sm text-gray-600">
              {{ formatDate(review.created_at) }}
            </p>
          </div>
        </div>
        <p class="mt-2 text-gray-700">{{ review.review }}</p>
      </div>
    </div>

    <!-- No Reviews -->
    <div v-else class="text-center py-8 text-gray-500">
      {{ t('reviews.noReviews') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Review, MyReview } from '~/types/review';
import ReviewInput from './review-input.vue';

const props = defineProps<{
  fetchReviews: () => Promise<Review[]>;
  submitReview: (rating: number, review: string) => Promise<void>;
  fetchMyReview: () => Promise<MyReview | null>;
}>();

const myReview = ref<Review | null>(null);
const { t } = useI18n();
const reviews = ref<Review[]>([]);
const error = ref<string | null>(null);

const averageRating = computed(() => {
  if (!reviews.value.length) return 0;
  const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0);
  return Number((sum / reviews.value.length).toFixed(1));
});

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

const handleReviewSubmit = async (rating: number, review: string) => {
  try {
      await props.submitReview(rating, review);
      // Refresh both reviews list and personal review
      const [updatedReviews, updatedMyReview] = await Promise.all([
        props.fetchReviews(),
        props.fetchMyReview()
      ]);
      reviews.value = updatedReviews;
      myReview.value = updatedMyReview;
  } catch (err) {
      console.error('Failed to submit review:', err);
      error.value = t('errors.failedToSubmitReview');
  }
};

onMounted(async () => {
  try {
    const [reviewsData, myReviewData] = await Promise.all([
          props.fetchReviews(),
          props.fetchMyReview()
        ]);
        reviews.value = reviewsData;
        myReview.value = myReviewData;
  } catch (err) {
    console.error('Failed to fetch reviews:', err);
    error.value = t('errors.failedToLoadReviews');
  }
});
</script>