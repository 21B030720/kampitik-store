<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen p-4">
          <!-- Backdrop -->
          <div class="fixed inset-0 bg-black/50" @click="$emit('close')" />
          
          <!-- Modal -->
          <div class="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-semibold">{{ t('checkout.selectKid') }}</h3>
              <button 
                class="text-gray-500 hover:text-gray-700"
                @click="$emit('close')"
              >
                ✕
              </button>
            </div>
            
            <div v-if="isLoading" class="text-center py-8">
              {{ t('loading') }}
            </div>

            <div v-else-if="error" class="text-red-600 mb-4">
              {{ error }}
            </div>

            <div v-else>
              <div v-if="kids.length === 0" class="text-center text-gray-500 py-8">
                {{ t('checkout.noKids') }}
              </div>

              <div v-else class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <button
                  v-for="kid in kids"
                  :key="kid.id"
                  class="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors relative"
                  :class="{ 'border-primary-600 bg-primary-50': selectedKidId === kid.id }"
                  @click="selectKid(kid.id)"
                >
                  <!-- Selected indicator -->
                  <div 
                    v-if="selectedKidId === kid.id"
                    class="absolute top-2 right-2 w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center"
                  >
                    <span class="text-white text-sm">✓</span>
                  </div>

                  <!-- Kid image -->
                  <div class="w-24 h-24 mb-3">
                    <img
                      :src="kid.image || placeholderImage"
                      :alt="kid.name"
                      class="w-full h-full rounded-full object-cover"
                    />
                  </div>

                  <!-- Kid info -->
                  <div class="text-center">
                    <div class="font-medium">{{ kid.name }}</div>
                    <div class="text-sm text-gray-600">{{ kid.age }} {{ t('common.years') }}</div>
                  </div>

                  <!-- Level info if available -->
                  <div v-if="kid.kid_level" class="mt-2 flex items-center gap-2">
                    <img
                      v-if="kid.kid_level.level_image"
                      :src="kid.kid_level.level_image"
                      :alt="kid.kid_level.level_name"
                      class="w-4 h-4"
                    />
                    <span class="text-xs text-gray-600">{{ kid.kid_level.level_name }}</span>
                  </div>
                </button>
              </div>

              <!-- Actions -->
              <div class="flex justify-end gap-3 mt-6 pt-4 border-t">
                <button
                  type="button"
                  class="px-4 py-2 text-gray-600 hover:text-gray-800"
                  @click="$emit('close')"
                >
                  {{ t('common.cancel') }}
                </button>
                <button
                  type="button"
                  class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
                  :disabled="!selectedKidId"
                  @click="confirmSelection"
                >
                  {{ t('common.confirm') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { KidService } from '~/services/KidService';
import type { Kid } from '~/types/kid';

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'select', kidId: number): void;
}>();

const { t } = useI18n();
const kids = ref<Kid[]>([]);
const selectedKidId = ref<number | null>(null);
const isLoading = ref(true);
const error = ref('');

const placeholderImage = new URL(
  '@/assets/images/placeholder-kid.png',
  import.meta.url
).href;

const loadKids = async () => {
  isLoading.value = true;
  error.value = '';
  
  try {
    console.log('Fetching kids...');
    const response = await KidService.getKids();
    console.log('Kids response:', response);
    if (response && response.results) {
      kids.value = response.results;
    } else {
      console.error('Invalid response format:', response);
      error.value = t('errors.failedToLoadKids');
    }
  } catch (err) {
    console.error('Failed to fetch kids:', err);
    error.value = t('errors.failedToLoadKids');
  } finally {
    isLoading.value = false;
  }
};

// Load kids when modal becomes visible
watch(() => props.show, async (newValue) => {
  if (newValue) {
    await loadKids();
  }
}, { immediate: true });

const selectKid = (kidId: number) => {
  selectedKidId.value = kidId;
};

const confirmSelection = () => {
  if (selectedKidId.value) {
    emit('select', selectedKidId.value);
    emit('close');
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