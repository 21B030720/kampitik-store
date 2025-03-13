<template>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
		<div
			v-for="pack in packs"
			:key="pack.id"
			class="bg-white rounded-lg shadow-lg overflow-hidden"
		>
			<img
				:src="pack.image || placeholderImage"
				:alt="pack.name"
				class="w-full h-48 object-cover"
				@error="handleImageError"
			>
			<div class="p-4">
				<h3 class="font-semibold text-lg mb-2">{{ pack.name }}</h3>
				<p v-if="pack.description" class="text-gray-600 text-sm mb-4">
					{{ pack.description }}
				</p>
				<p class="text-lg font-bold">{{ pack.price }}тг</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Bundle } from '~/types/bundle';

defineProps<{
	packs: Bundle[];
}>();

const placeholderImage = new URL('@/assets/images/placeholder-product.png', import.meta.url).href;

const handleImageError = (e: Event) => {
	const img = e.target as HTMLImageElement;
	img.src = placeholderImage;
};
</script> 