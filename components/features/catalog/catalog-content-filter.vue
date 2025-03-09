<template>
	<div class="flex gap-4 mb-8">
		<button
			v-for="type in contentTypes"
			:key="type"
			class="px-6 py-3 rounded-lg text-sm font-medium transition-colors"
			:class="[
				selectedType === type
					? 'bg-primary-600 text-white'
					: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
			]"
			@click="$emit('update:selectedType', type)"
		>
			{{ t(`contentTypes.${type}`) }}
		</button>
	</div>
</template>

<script setup lang="ts">
	import { ContentType } from '~/types/content-type';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();

	const contentTypes = [
		ContentType.MENU,
		ContentType.ACTIVITIES,
		ContentType.SERVICES,
	];

	defineProps<{
		selectedType: ContentType;
	}>();

	defineEmits<{
		(e: 'update:selectedType', type: ContentType): void;
	}>();
</script>
