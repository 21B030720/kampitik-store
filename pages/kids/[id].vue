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

import level_1 from '@/assets/images/level/level_1.png';
import level_2 from '@/assets/images/level/level_2.png';
import level_3 from '@/assets/images/level/level_3.png';
import level_4 from '@/assets/images/level/level_4.png';
import level_5 from '@/assets/images/level/level_5.png';
import level_6 from '@/assets/images/level/level_6.png';

const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();

const kid = ref<KidDetails | null>(null);
const error = ref<string | null>(null);
const showEditModal = ref(false);

const levelImages: { [key: number]: string } = {
  1: level_1,
  2: level_2,
  3: level_3,
  4: level_4,
  5: level_5,
  6: level_6,
};

const getDefaultImage = (level: number) => {
  if (level >= 1 && level <= 6) {
    return levelImages[level];
  } else if (level >= 7 && level <= 10) {
    return levelImages[6];
  } else {
    return new URL('@/assets/images/placeholder-kid.png', import.meta.url).href;
  }
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