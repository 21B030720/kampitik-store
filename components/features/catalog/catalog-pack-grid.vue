<template>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
		<NuxtLink
			v-for="pack in packs"
			:key="pack.id"
			:to="`/bundles/${pack.id}`"
			class="block"
		>
			<div
				class="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
			>
				<img
					v-if="pack.image"
					:src="pack.image"
					:alt="pack.name"
					class="w-full h-48 object-cover"
					@error="handleImageError"
				>
				<div class="p-4">
					<h3 class="font-semibold text-lg mb-2">{{ pack.name }}</h3>
					<p v-if="pack.description" class="text-gray-600 text-sm mb-4">
						{{ pack.description }}
					</p>
					<div class="flex justify-between items-center">
						<p class="text-lg font-bold">{{ pack.price }}₸</p>
						<p v-if="pack.discount !== '0.00'" class="text-green-600">
							-{{ pack.discount }}₸
						</p>
					</div>
				</div>
			</div>
		</NuxtLink>
	</div>
</template>

<script setup lang="ts">
import type { Bundle } from '~/types/bundle';

defineProps<{
	packs: Bundle[];
}>();

const handleImageError = (e: Event) => {
	const img = e.target as HTMLImageElement;
	img.style.display = 'none';
};
</script>

<style scoped>
.hover\:shadow-xl:hover {
	box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.transition-shadow {
	transition-property: box-shadow;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 300ms;
}
</style> 