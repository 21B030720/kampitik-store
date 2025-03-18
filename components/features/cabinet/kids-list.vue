<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">{{ t('cabinet.children') }}</h2>
      <button
        class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        @click="showAddModal = true"
      >
        {{ t('cabinet.addChild') }}
      </button>
    </div>
    
    <!-- No kids message -->
    <p
      v-if="kids.length === 0"
      class="text-center text-gray-500 py-8"
    >
      {{ t('cabinet.noKids') }}
    </p>

    <!-- Kids grid -->
    <div
      v-else
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <NuxtLink
        v-for="kid in kids"
        :key="kid.id"
        :to="localePath(`/kids/${kid.id}`)"
        class="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
      >
        <div class="aspect-square relative">
          <img
            :src="kid.image || placeholderImage"
            :alt="kid.name"
            class="w-full h-full object-cover"
            @error="handleImageError"
          >
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <div class="flex items-center gap-2">
              <img
                v-if="kid.kid_level.level_image"
                :src="kid.kid_level.level_image"
                :alt="kid.kid_level.level_name"
                class="w-6 h-6"
              >
              <span class="text-white text-sm">{{ kid.kid_level.level_name }}</span>
            </div>
          </div>
        </div>

        <div class="p-4">
          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="font-semibold">{{ kid.name }}</h3>
              <p class="text-sm text-gray-600">{{ kid.age }} {{ t('common.years') }}</p>
            </div>
            <div class="text-right">
              <p class="font-medium text-primary-600">{{ kid.xp }} XP</p>
            </div>
          </div>

          <!-- Progress bar -->
          <div class="mt-2">
            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                class="h-full bg-primary-600 transition-all"
                :style="{ width: `${kid.kid_level.current_progress}%` }"
              />
            </div>
            <div class="flex justify-between text-xs text-gray-500 mt-1">
              <span>{{ kid.kid_level.from_xp }} XP</span>
              <span>{{ kid.kid_level.to_xp }} XP</span>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Add Kid Modal -->
    <AddKidModal
      :show="showAddModal"
      @close="showAddModal = false"
      @added="$emit('kid-added')"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { Kid } from '~/types/kid';
import AddKidModal from './add-kid-modal.vue';

const { t } = useI18n();
const localePath = useLocalePath();

defineProps<{
  kids: Kid[];
}>();

const placeholderImage = new URL(
  '@/assets/images/placeholder-kid.png',
  import.meta.url
).href;

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = placeholderImage;
};

const showAddModal = ref(false);

defineEmits<{
  (e: 'kid-added'): void;
}>();
</script> 