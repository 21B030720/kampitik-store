<template>
  <div class="flex items-center gap-2">
    <button
      type="button"
      class="text-sm px-3 py-1 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
      @click="showKidModal = true"
    >
      <span v-if="selectedKid">
        {{ selectedKid.name }}
      </span>
      <span v-else class="text-gray-500">
        {{ t('checkout.selectKidPlaceholder') }}
      </span>
      <span class="text-gray-400">▼</span>
    </button>

    <!-- Kid Selection Modal -->
    <SelectKidModal
      :show="showKidModal"
      @close="closeModal"
      @select="handleKidSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Kid } from '~/types/kid';
import { KidService } from '~/services/KidService';
import SelectKidModal from '~/components/features/checkout/select-kid-modal.vue';

const props = defineProps<{
  productId: number;
  initialKidId?: number | null;
}>();

const emit = defineEmits<{
  (e: 'update', kidId: number | null): void;
}>();

const { t } = useI18n();
const showKidModal = ref(false);
const selectedKid = ref<Kid | null>(null);

// Load initial kid if provided
onMounted(async () => {
  if (props.initialKidId) {
    try {
      const kid = await KidService.getKidById(props.initialKidId);
      selectedKid.value = kid;
    } catch (error) {
      console.error('Failed to fetch kid details:', error);
    }
  }
});

const handleKidSelect = async (kidId: number) => {
  try {
    const kid = await KidService.getKidById(kidId);
    selectedKid.value = kid;
    emit('update', kidId);
  } catch (error) {
    console.error('Failed to fetch kid details:', error);
  }
};

const closeModal = () => {
  showKidModal.value = false;
};
</script> 