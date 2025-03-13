<template>
	<div class="w-full md:w-64">
		<div class="bg-[#2D2D2D] text-white rounded-lg overflow-hidden">
			<!-- Menu Header -->
			<div class="p-4 border-b border-gray-700">
				<h3 class="text-lg font-medium">{{ t('catalog.filters') }}</h3>
			</div>

			<!-- Main Menu Items -->
			<div class="divide-y divide-gray-700">
				<!-- Menu Types -->
				<div
					v-for="type in contentTypes"
					:key="type"
					class="cursor-pointer"
				>
					<div 
						class="p-4 hover:bg-gray-800 transition-colors flex items-center justify-between"
						@click="selectType(type)"
					>
						<span>{{ t(`contentTypes.${type}`) }}</span>
						<span v-if="hasSubtypes(type)" class="text-gray-400">
							→
						</span>
					</div>

					<!-- Subtypes (if selected) -->
					<div 
						v-if="selectedTypeModel === type && hasSubtypes(type)"
						class="bg-gray-800"
					>
						<div
							v-for="subtype in getSubtypes(type)"
							:key="subtype"
							class="px-6 py-3 hover:bg-gray-700 transition-colors cursor-pointer"
							:class="{ 'bg-gray-700': selectedSubtype === subtype }"
							@click="selectSubtype(subtype)"
						>
							{{ t(`contentSubtypes.${subtype}`) }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ContentType, MenuSubtype, ActivitiesSubtype, ServicesSubtype } from '~/types/content-type';

const { t } = useI18n();

const contentTypes = [
	ContentType.MENU,
	ContentType.ACTIVITIES,
	ContentType.SERVICES,
];

const props = defineProps<{
	selectedType: ContentType;
	selectedSubtype: string | null;
}>();

const emit = defineEmits<{
	(e: 'update:selectedType', type: ContentType): void;
	(e: 'update:selectedSubtype', subtype: string | null): void;
}>();

const selectedTypeModel = computed({
	get: () => props.selectedType,
	set: (value) => {
		emit('update:selectedType', value);
		emit('update:selectedSubtype', null); // Reset subtype when main type changes
	},
});

// Helper functions for menu structure
const hasSubtypes = (type: ContentType): boolean => {
	return getSubtypes(type).length > 0;
};

const getSubtypes = (type: ContentType): string[] => {
	switch (type) {
		case ContentType.MENU:
			return Object.values(MenuSubtype);
		case ContentType.ACTIVITIES:
			return Object.values(ActivitiesSubtype);
		case ContentType.SERVICES:
			return Object.values(ServicesSubtype);
		default:
			return [];
	}
};

const selectType = (type: ContentType) => {
	selectedTypeModel.value = type;
};

const selectSubtype = (subtype: string) => {
	emit('update:selectedSubtype', props.selectedSubtype === subtype ? null : subtype);
};
</script>
