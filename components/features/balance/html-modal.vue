<template>
	<div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
		<div class="flex items-center justify-center min-h-screen p-4">
			<div class="fixed inset-0 bg-black/50" @click="$emit('close')"></div>
			<div class="relative bg-white rounded-lg max-w-2xl w-full p-6">
				<div v-html="html"></div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	show: boolean;
	html: string;
}>();

defineEmits<{
	(e: 'close'): void;
}>();
</script> 