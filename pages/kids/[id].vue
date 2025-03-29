<template>
  <div class="container mx-auto px-4 py-8">
    <NuxtLink
      :to="localePath('/cabinet')"
      class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
    >
      ← {{ t('back.toCabinet') }}
    </NuxtLink>

    <div v-if="error" class="text-red-600 mb-4">{{ error }}</div>

    <div v-else-if="kid" class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="flex flex-col md:flex-row">
        <KidHeader
          :kid="kid"
          :getDefaultImage="getDefaultImage"
          :handleImageError="handleImageError"
          @edit="showEditModal = true"
        />
        <KidDetailing :kid="kid" />
      </div>
    </div>

    <div v-else class="flex justify-center items-center py-8">
      <p class="text-gray-500">{{ t('loading') }}</p>
    </div>

    <!-- Edit Modal -->
    <EditKidModal
      v-if="kid"
      :show="showEditModal"
      :kid="kid"
      @close="showEditModal = false"
      @updated="refreshKid"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import type { KidDetails } from '~/types/kid';
import { KidService } from '~/services/KidService';
import EditKidModal from '~/components/features/kid/edit-kid-modal.vue';
import KidHeader from '~/components/features/kid/kid-header.vue';
import KidDetailing from '~/components/features/kid/kid-details.vue';

const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();

const kid = ref<KidDetails | null>(null);
const error = ref<string | null>(null);
const showEditModal = ref(false);

const levelImages: { [key: number]: string } = {
  1: new URL('@/assets/images/levels/default/level_1.png', import.meta.url).href,
  2: new URL('@/assets/images/levels/default/level_2.png', import.meta.url).href,
  3: new URL('@/assets/images/levels/default/level_3.png', import.meta.url).href,
  // Add more levels as needed
};

const getDefaultImage = (level: number) => {
  return levelImages[level] || new URL('@/assets/images/placeholder-kid.png', import.meta.url).href;
};

const placeholderImage = new URL(
  '@/assets/images/placeholder-kid.png',
  import.meta.url
).href;

onMounted(async () => {
  try {
    const id = Number(route.params.id);
    kid.value = await KidService.getKidById(id);
  } catch (err) {
    console.error('Failed to fetch kid details:', err);
    error.value = t('errors.failedToLoadKid');
  }
});

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = placeholderImage;
};

const refreshKid = async () => {
  try {
    const id = Number(route.params.id);
    kid.value = await KidService.getKidById(id);
  } catch (err) {
    console.error('Failed to refresh kid details:', err);
    error.value = t('errors.failedToLoadKid');
  }
};
</script>