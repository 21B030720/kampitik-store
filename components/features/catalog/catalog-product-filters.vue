<template>
	<div class="w-full md:w-64 space-y-6">
		<div>
			<h3 class="text-lg font-semibold mb-4">{{ t('catalog.filters') }}</h3>

			<div class="space-y-4">
				<label
					v-for="type in contentTypes"
					:key="type"
					class="flex items-center gap-2"
				>
					<input
						type="radio"
						:value="type"
						v-model="selectedTypeModel"
						class="text-primary-600 focus:ring-primary-500"
					>
					<span>{{ t(`contentTypes.${type}`) }}</span>
				</label>
			</div>
		</div>
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

	const props = defineProps<{
		selectedType: ContentType;
	}>();

	const emit = defineEmits<{
		(e: 'update:selectedType', type: ContentType): void;
	}>();

	const selectedTypeModel = computed({
		get: () => props.selectedType,
		set: (value) => emit('update:selectedType', value),
	});
</script>
