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
        <!-- Header with image -->
        <div class="relative w-full md:w-1/3">
          <img
            :src="kid.image || placeholderImage"
            :alt="kid.name"
            class="w-full h-full object-cover"
            @error="handleImageError"
          >
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <h1 class="text-3xl font-bold text-white mb-2">{{ kid.name }}</h1>
          </div>

          <!-- Settings Button -->
          <button
            class="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
            @click="showEditModal = true"
          >
            <img
              src="@/assets/icons/settings.svg"
              alt="Settings"
              class="w-12 h-12"
            />
          </button>
        </div>

        <div class="p-6 w-full md:w-2/3">
          <!-- Level and Age -->
          <div class="flex items-center gap-3 mb-6">
            <div class="flex items-center gap-2 text-gray-800">
              <img
                v-if="kid.kid_level.level_image"
                :src="kid.kid_level.level_image"
                :alt="kid.kid_level.level_name"
                class="w-8 h-8"
              >
              <span>{{ kid.kid_level.level_name }}</span>
            </div>
            <span class="text-gray-600">•</span>
            <span class="text-gray-800">{{ kid.age }} {{ t('common.years') }}</span>
          </div>

          <!-- XP Progress -->
          <div class="mb-6">
            <div class="flex justify-between items-end mb-2">
              <h2 class="font-semibold">Experience</h2>
              <p class="text-xl font-bold text-primary-600">{{ kid.xp }} XP</p>
            </div>
            <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                class="h-full bg-blue-600 transition-all"
                :style="{ width: `${kid.xp / (kid.kid_level.to_xp) * 100}%` }"
              />
            </div>
            <div class="flex justify-between text-sm text-gray-500 mt-1">
              <span>Level {{ kid.kid_level.level_position }}</span>
              <span>{{ kid.kid_level.from_xp }} XP - {{ kid.kid_level.to_xp }} XP</span>
              <span>Level {{ kid.kid_level.next_level_position }}</span>
            </div>
          </div>

          <!-- Details -->
          <div>
            <h2 class="font-semibold mb-2">{{ t('cabinet.kidDetails') }}</h2>
            <p class="text-gray-600">{{ kid.details }}</p>
          </div>
        </div>
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

const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();

const kid = ref<KidDetails | null>(null);
const error = ref<string | null>(null);
const showEditModal = ref(false);

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