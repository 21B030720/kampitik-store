<template>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
		<div
			v-for="course in courses"
			:key="course.id"
			class="bg-white rounded-lg shadow-lg overflow-hidden"
		>
			<img
				:src="course.image || placeholderImage"
				:alt="course.name"
				class="w-full h-48 object-cover"
				@error="handleImageError"
			>
			<div class="p-4">
				<h3 class="font-semibold text-lg mb-2">{{ course.name }}</h3>
				<p v-if="course.description" class="text-gray-600 text-sm mb-4">
					{{ course.description }}
				</p>
				<p class="text-lg font-bold">{{ course.price }}тг</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Course } from '~/types/course';

defineProps<{
	courses: Course[];
}>();

const placeholderImage = new URL('@/assets/images/placeholder-product.png', import.meta.url).href;

const handleImageError = (e: Event) => {
	const img = e.target as HTMLImageElement;
	img.src = placeholderImage;
};
</script> 