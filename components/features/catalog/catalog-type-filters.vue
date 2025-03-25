<template>
  <div class="w-full md:w-64">
    <div class="bg-white rounded-lg shadow-lg">
      <div class="p-4">
        <h3 class="text-lg font-medium text-gray-900">{{ t('catalog.filters') }}</h3>
      </div>

      <div>
        <div
          v-for="type in contentTypes"
          :key="type"
          class="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
          :class="{ 'bg-gray-50': selectedType === type }"
          @click="selectType(type)"
        >
          <div class="flex items-center gap-3">
            <!-- Icons for each type -->
            <span class="w-5 h-5">
              <ContentTypeIcon :type="type" />
            </span>
            <span class="text-gray-700">{{ t(`contentTypes.${type}`) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { ContentType } from '~/types/content-type';
import { useRoute, useRouter } from 'vue-router';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const contentTypes = Object.values(ContentType);

const props = defineProps<{
  selectedType: ContentType;
}>();

const emit = defineEmits<{
  (e: 'update:selectedType', type: ContentType): void;
}>();

// Update URL when type changes
watch(() => props.selectedType, (newType) => {
  const query = { ...route.query, type: newType };
  router.push({ query }).catch(() => {});
}, { immediate: false });

const selectType = (type: ContentType) => {
  emit('update:selectedType', type);
};

// Initialize with URL params if valid
onMounted(() => {
  const queryType = route.query.type as ContentType;
  if (queryType && Object.values(ContentType).includes(queryType)) {
    emit('update:selectedType', queryType);
  }
});
</script>