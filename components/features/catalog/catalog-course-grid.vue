<template>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		<NuxtLink
			v-for="course in courses"
			:key="course.id"
			:to="localePath(`/courses/${course.id}`)"
			class="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
		>
			<img
                v-if="course.image"
                :src="course.image"
                :alt="course.title"
                class="w-full h-48 object-cover"
                @error="handleImageError"
            />
			<div class="p-4">
				<h3 class="font-semibold text-lg mb-2">{{ course.title }}</h3>
				<p class="text-gray-600 text-sm mb-4">{{ course.description }}</p>
				
				<!-- Course Details -->
				<div class="space-y-2 mb-4">
					<p class="text-sm">
						<span class="font-medium">{{ t('course.company') }}:</span> 
						{{ course.company }}
					</p>
					<p class="text-sm">
						<span class="font-medium">{{ t('course.location') }}:</span>
						{{ course.location }}
					</p>
					<p class="text-sm">
						<span class="font-medium">{{ t('course.ageRange') }}:</span>
						{{ course.from_age }}-{{ course.to_age }} {{ t('common.years') }}
					</p>
				</div>

				<!-- Course Prices -->
				<div class="space-y-2">
					<div 
						v-for="price in course.course_prices" 
						:key="price.id"
						class="p-2 border rounded"
					>
						<div class="flex justify-between items-center">
							<span class="font-medium">{{ price.name }}</span>
							<span class="text-primary-600">{{ price.price }}₸/{{ price.payment_period }}</span>
						</div>
						<p class="text-sm text-gray-600">{{ price.description }}</p>
					</div>
				</div>
			</div>
		</NuxtLink>
	</div>
</template>

<script setup lang="ts">
import type { Course } from '~/types/course';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const localePath = useLocalePath();

defineProps<{
	courses: Course[];
}>();

const handleImageError = (e: Event) => {
	const img = e.target as HTMLImageElement;
	img.style.display = 'none';
};
</script> 