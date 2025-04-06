<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen p-4">
          <!-- Backdrop -->
          <div class="fixed inset-0 bg-black/50" @click="$emit('close')" />
          
          <!-- Modal -->
          <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 class="text-lg font-semibold mb-4">{{ t('cabinet.addChild') }}</h3>
            
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <!-- Name -->
              <div>
                <label class="block text-sm font-medium mb-1">
                  {{ t('cabinet.childName') }}
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  :placeholder="t('cabinet.enterChildName')"
                >
              </div>

              <!-- Age -->
              <div>
                <label class="block text-sm font-medium mb-1">
                  {{ t('cabinet.childAge') }}
                </label>
                <input
                  v-model.number="form.age"
                  type="number"
                  required
                  min="0"
                  max="18"
                  class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                >
              </div>

              <!-- Details -->
              <div>
                <label class="block text-sm font-medium mb-1">
                  {{ t('cabinet.childDetails') }}
                </label>
                <textarea
                  v-model="form.details"
                  rows="3"
                  class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  :placeholder="t('cabinet.enterChildDetails')"
                />
              </div>

              <!-- Error message -->
              <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>

              <!-- Actions -->
              <div class="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  class="px-4 py-2 text-gray-600 hover:text-gray-800"
                  @click="$emit('close')"
                >
                  {{ t('common.cancel') }}
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 text-white rounded-lg"
                  :style="{ backgroundColor: '#128C7E', borderColor: '#128C7E' }"
                  :disabled="isLoading"
                >
                  {{ isLoading ? t('common.processing') : t('common.add') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { KidService } from '~/services/KidService';

const { t } = useI18n();

defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'added'): void;
}>();

const form = reactive({
  name: '',
  age: 0,
  details: ''
});

const isLoading = ref(false);
const error = ref('');

const handleSubmit = async () => {
  error.value = '';
  isLoading.value = true;

  try {
    await KidService.createKid({
      name: form.name,
      age: form.age,
      details: form.details
    });
    
    emit('added');
    emit('close');
    
    // Reset form
    form.name = '';
    form.age = 0;
    form.details = '';
  } catch (err) {
    console.error('Failed to create kid:', err);
    error.value = t('errors.failedToCreateKid');
  } finally {
    isLoading.value = false;
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