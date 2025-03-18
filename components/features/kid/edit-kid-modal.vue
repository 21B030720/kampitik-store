<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen p-4">
          <!-- Backdrop -->
          <div class="fixed inset-0 bg-black/50" @click="$emit('close')" />
          
          <!-- Modal -->
          <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 class="text-lg font-semibold mb-4">{{ t('kid.editProfile') }}</h3>
            
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <!-- Image -->
              <div>
                <label class="block text-sm font-medium mb-1">
                  {{ t('kid.image') }}
                </label>
                <div class="flex items-center gap-4">
                  <img
                    :src="imagePreview || kid.image || placeholderImage"
                    alt=""
                    class="w-24 h-24 rounded-lg object-cover"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    class="hidden"
                    ref="fileInput"
                    @change="handleImageChange"
                  >
                  <button
                    type="button"
                    class="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    @click="$refs.fileInput.click()"
                  >
                    {{ t('common.change') }}
                  </button>
                </div>
              </div>

              <!-- Name -->
              <div>
                <label class="block text-sm font-medium mb-1">
                  {{ t('kid.name') }}
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                >
              </div>

              <!-- Age -->
              <div>
                <label class="block text-sm font-medium mb-1">
                  {{ t('kid.age') }}
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
                  {{ t('kid.details') }}
                </label>
                <textarea
                  v-model="form.details"
                  rows="3"
                  class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
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
                  class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  :disabled="isLoading"
                >
                  {{ isLoading ? t('common.processing') : t('common.save') }}
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
import type { Kid } from '~/types/kid';
import { KidService } from '~/services/KidService';

const props = defineProps<{
  show: boolean;
  kid: Kid;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'updated'): void;
}>();

const { t } = useI18n();
const fileInput = ref<HTMLInputElement | null>(null);
const imagePreview = ref<string | null>(null);
const isLoading = ref(false);
const error = ref('');

const form = reactive({
  name: props.kid.name,
  age: props.kid.age,
  details: props.kid.details,
  image: null as File | null
});

const placeholderImage = new URL(
  '@/assets/images/placeholder-kid.png',
  import.meta.url
).href;

const handleImageChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    form.image = input.files[0];
    imagePreview.value = URL.createObjectURL(input.files[0]);
  }
};

const handleSubmit = async () => {
  error.value = '';
  isLoading.value = true;

  try {
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('age', form.age.toString());
    formData.append('details', form.details);
    if (form.image) {
      formData.append('image', form.image);
    }

    await KidService.updateKid(props.kid.id, formData);
    emit('updated');
    emit('close');
  } catch (err) {
    console.error('Failed to update kid:', err);
    error.value = t('errors.failedToUpdateKid');
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