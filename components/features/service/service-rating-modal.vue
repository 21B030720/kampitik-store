<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen p-4">
          <!-- Backdrop -->
          <div class="fixed inset-0 bg-black opacity-75" @click="$emit('close')" />
          
          <!-- Modal -->
          <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 class="text-lg font-semibold mb-4 text-black">{{ t('service.rateProvider') }}</h3>
            
            <!-- Rating Stars -->
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2 text-black">{{ t('service.rating') }}</label>
              <div class="flex gap-2">
                <button
                  v-for="star in 5"
                  :key="star"
                  class="text-3xl focus:outline-none"
                  :class="star <= rating ? 'text-yellow-400' : 'text-gray-300'"
                  @click="rating = star"
                >
                  ★
                </button>
              </div>
            </div>

            <!-- Review Text -->
            <div class="mb-6">
              <label class="block text-sm font-medium mb-2 text-black">
                {{ t('service.review') }} ({{ t('common.optional') }})
              </label>
              <textarea
                v-model="comment"
                rows="3"
                class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-black"
                :placeholder="t('service.reviewPlaceholder')"
              />
            </div>

            <!-- Actions -->
            <div class="flex justify-end gap-3">
              <button
                class="px-4 py-2 text-gray-600 hover:text-gray-800"
                @click="$emit('close')"
              >
                {{ t('common.cancel') }}
              </button>
              <button
                class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
                :disabled="!rating || isSubmitting"
                @click="submitRating"
              >
                {{ t('service.submitRating') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ShopService } from '~/services/ShopService';

const { t } = useI18n();

const props = defineProps<{
  show: boolean;
  serviceId: number;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'rated'): void;
}>();

const rating = ref(0);
const comment = ref('');
const isSubmitting = ref(false);

const submitRating = async () => {
  if (!rating.value) return;
  
  isSubmitting.value = true;
  try {
    await ShopService.rateServiceProvider(props.serviceId, {
      rating: rating.value,
      comment: comment.value
    });
    emit('rated');
    emit('close');
    rating.value = 0;
    comment.value = '';
  } catch (err) {
    console.error('Failed to submit rating:', err);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style> 