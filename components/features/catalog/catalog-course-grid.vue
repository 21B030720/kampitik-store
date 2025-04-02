<template>
  <div class="grid grid-cols-1 gap-6">
    <CourseCard
      v-for="course in courses"
      :key="course.id"
      :course="course"
    />
  </div>
</template>

<script setup lang="ts">
import type { Course } from '~/types/course';
import { useI18n } from 'vue-i18n';
import CourseCard from '~/components/features/catalog/catalog-course-card.vue';

const { t } = useI18n();
const localePath = useLocalePath();

defineProps<{
  courses: Course[];
}>();
</script>