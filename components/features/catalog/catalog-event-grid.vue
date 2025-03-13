<template>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
		<div
			v-for="event in events"
			:key="event.id"
			class="bg-white rounded-lg shadow-lg overflow-hidden"
		>
			<img
				:src="event.image || placeholderImage"
				:alt="event.name"
				class="w-full h-48 object-cover"
				@error="handleImageError"
			>
			<div class="p-4">
				<h3 class="font-semibold text-lg mb-2">{{ event.name }}</h3>
				<p v-if="event.description" class="text-gray-600 text-sm mb-4">
					{{ event.description }}
				</p>
				<p class="text-lg font-bold">{{ event.price }}тг</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Event as ShopEvent } from '~/types/event';

defineProps<{
	events: ShopEvent[];
}>();

const placeholderImage = new URL('@/assets/images/placeholder-product.png', import.meta.url).href;

const handleImageError = (e: Event) => {
	const img = e.target as HTMLImageElement;
	img.src = placeholderImage;
};
</script> 