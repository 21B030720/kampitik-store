<template>
	<div class="w-full md:w-64">
		<div class="bg-white rounded-lg shadow-lg">
			<!-- Menu Header -->
			<div class="p-4">
				<h3 class="text-lg font-medium text-gray-900">{{ t('catalog.filters') }}</h3>
			</div>

			<!-- Main Menu Items -->
			<div>
				<!-- Menu Types -->
				<div
					v-for="type in contentTypes"
					:key="type"
					class="cursor-pointer"
				>
					<div 
						class="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
						@click="selectType(type)"
					>
						<div class="flex items-center gap-3">
							<!-- Custom SVG Icons -->
							<span class="w-5 h-5">
								<svg v-if="type === ContentType.MENU" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
									<path d="M11.1429 0C11.5343 0 11.91 0.14125 12.18 0.39L16.7514 4.675C17.0029 4.9075 17.1429 5.21625 17.1429 5.53625V16.25C17.1429 16.5815 16.9923 16.8995 16.7244 17.1339C16.4565 17.3683 16.0932 17.5 15.7143 17.5H1.42857C1.04969 17.5 0.686328 17.3683 0.418419 17.1339C0.15051 16.8995 0 16.5815 0 16.25V1.25C0 0.918479 0.15051 0.600537 0.418419 0.366117C0.686328 0.131696 1.04969 0 1.42857 0L11.1429 0ZM15.7143 6.25H10.7143C10.5248 6.25 10.3432 6.18415 10.2092 6.06694C10.0753 5.94973 10 5.79076 10 5.625V1.25H1.42857V16.25H15.7143V6.25ZM5 13.75C4.81056 13.75 4.62888 13.6842 4.49492 13.5669C4.36097 13.4497 4.28571 13.2908 4.28571 13.125C4.28571 12.9592 4.36097 12.8003 4.49492 12.6831C4.62888 12.5658 4.81056 12.5 5 12.5H12.1429C12.3323 12.5 12.514 12.5658 12.6479 12.6831C12.7819 12.8003 12.8571 12.9592 12.8571 13.125C12.8571 13.2908 12.7819 13.4497 12.6479 13.5669C12.514 13.6842 12.3323 13.75 12.1429 13.75H5ZM5 10C4.81056 10 4.62888 9.93415 4.49492 9.81694C4.36097 9.69973 4.28571 9.54076 4.28571 9.375C4.28571 9.20924 4.36097 9.05027 4.49492 8.93306C4.62888 8.81585 4.81056 8.75 5 8.75H12.1429C12.3323 8.75 12.514 8.81585 12.6479 8.93306C12.7819 9.05027 12.8571 9.20924 12.8571 9.375C12.8571 9.54076 12.7819 9.69973 12.6479 9.81694C12.514 9.93415 12.3323 10 12.1429 10H5Z" />
								</svg>
								<svg v-else-if="type === ContentType.ACTIVITIES" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
									<path d="M7.2 12L10 9.9L12.75 12L11.7 8.6L14.5 6.4H11.1L10 3L8.9 6.4H5.5L8.25 8.6L7.2 12ZM2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196667 15.0217 0.000666667 14.5507 0 14V10.625C0 10.4417 0.0583333 10.2833 0.175 10.15C0.291667 10.0167 0.441667 9.93333 0.625 9.9C1.025 9.76667 1.35433 9.525 1.613 9.175C1.87167 8.825 2.00067 8.43333 2 8C1.99933 7.56667 1.87033 7.175 1.613 6.825C1.35567 6.475 1.02633 6.23333 0.625 6.1C0.441667 6.06667 0.291667 5.98333 0.175 5.85C0.0583333 5.71667 0 5.55833 0 5.375V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196666 1.45067 0.000666667 2 0H18C18.55 0 19.021 0.196 19.413 0.588C19.805 0.98 20.0007 1.45067 20 2V5.375C20 5.55833 19.9417 5.71667 19.825 5.85C19.7083 5.98333 19.5583 6.06667 19.375 6.1C18.975 6.23333 18.646 6.475 18.388 6.825C18.13 7.175 18.0007 7.56667 18 8C17.9993 8.43333 18.1287 8.825 18.388 9.175C18.6473 9.525 18.9763 9.76667 19.375 9.9C19.5583 9.93333 19.7083 10.0167 19.825 10.15C19.9417 10.2833 20 10.4417 20 10.625V14C20 14.55 19.8043 15.021 19.413 15.413C19.0217 15.805 18.5507 16.0007 18 16H2Z" />
								</svg>
								<svg v-else-if="type === ContentType.SERVICES" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M3 7C3 5.14348 3.7375 3.36301 5.05025 2.05025C6.36301 0.737498 8.14348 0 10 0C11.8565 0 13.637 0.737498 14.9497 2.05025C16.2625 3.36301 17 5.14348 17 7V8.035C18.696 8.278 20 9.737 20 11.5V11.75C19.9999 12.1836 19.913 12.6128 19.7444 13.0123C19.5759 13.4119 19.3291 13.7736 19.0186 14.0763C18.7081 14.379 18.3401 14.6164 17.9365 14.7747C17.5328 14.933 17.1015 15.0089 16.668 14.998C15.928 17.118 14.046 18.547 12.015 18.909C11.545 19.081 10.989 19 10.5 19C10.1022 19 9.72064 18.842 9.43934 18.5607C9.15804 18.2794 9 17.8978 9 17.5C9 17.1022 9.15804 16.7206 9.43934 16.4393C9.72064 16.158 10.1022 16 10.5 16H11.5C11.7348 16 11.9664 16.055 12.176 16.1608C12.3856 16.2666 12.5675 16.4201 12.707 16.609C14.003 15.992 15 14.689 15 13V7C15 5.67392 14.4732 4.40215 13.5355 3.46447C12.5979 2.52678 11.3261 2 10 2C8.67392 2 7.40215 2.52678 6.46447 3.46447C5.52678 4.40215 5 5.67392 5 7V13.25C5 13.7141 4.81563 14.1592 4.48744 14.4874C4.15925 14.8156 3.71413 15 3.25 15C2.38805 15 1.5614 14.6576 0.951903 14.0481C0.34241 13.4386 1.15409e-07 12.612 1.15409e-07 11.75V11.5C-0.000215951 10.6582 0.302959 9.84455 0.853955 9.20815C1.40495 8.57175 2.16685 8.15525 3 8.035V7Z" />
								</svg>
							</span>
							<span class="text-gray-700">{{ t(`contentTypes.${type}`) }}</span>
					</div>
						<svg
							v-if="hasSubtypes(type)"
							class="w-5 h-5"
							:class="{ 'transform rotate-90': selectedTypeModel === type }"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path d="M9 5l7 7-7 7" />
						</svg>
			</div>

					<!-- Subtypes (if selected) -->
					<div 
						v-if="selectedTypeModel === type && hasSubtypes(type)"
						class="bg-gray-50"
					>
						<div
							v-for="subtype in getSubtypes(type)"
							:key="subtype"
							class="px-12 py-3 hover:bg-gray-100 transition-colors cursor-pointer text-gray-600"
							:class="{ 'text-primary-600 font-medium': selectedSubtype === subtype }"
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
import { computed, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { ContentType, MenuSubtype, ActivitiesSubtype, ServicesSubtype } from '~/types/content-type';
import { useRoute, useRouter } from 'vue-router';
import type { LocationQueryValue } from 'vue-router';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();

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

// Update URL when filters change, but preserve existing query params
watch(() => props.selectedType, (newType) => {
	// Create a new query object with proper typing
	const query: Record<string, string | null> = {};
	
	// Copy existing query params, converting to string or null
	Object.entries(route.query).forEach(([key, value]) => {
		if (Array.isArray(value)) {
			query[key] = value[0]?.toString() || null;
		} else {
			query[key] = value?.toString() || null;
		}
	});

	// Update type
	query.type = newType;

	// Remove subtype if not needed
	if (!props.selectedSubtype) {
		query.subtype = null;
	}

	// Filter out null values
	const cleanQuery = Object.fromEntries(
		Object.entries(query).filter(([_, value]) => value !== null)
	);

	router.push({ 
		path: route.path,
		query: cleanQuery
	}).catch(() => {});
}, { immediate: false });

watch(() => props.selectedSubtype, (newSubtype) => {
	// Create a new query object with proper typing
	const query: Record<string, string | null> = {};
	
	// Copy existing query params, converting to string or null
	Object.entries(route.query).forEach(([key, value]) => {
		if (Array.isArray(value)) {
			query[key] = value[0]?.toString() || null;
		} else {
			query[key] = value?.toString() || null;
		}
	});

	// Update subtype
	if (newSubtype) {
		query.subtype = newSubtype;
	} else {
		query.subtype = null;
	}

	// Filter out null values
	const cleanQuery = Object.fromEntries(
		Object.entries(query).filter(([_, value]) => value !== null)
	);

	router.push({ 
		path: route.path,
		query: cleanQuery
	}).catch(() => {});
}, { immediate: false });

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

// Helper function to validate subtype for current type
const isValidSubtype = (type: ContentType, subtype: string | null): boolean => {
	if (!subtype) return true;
	return getSubtypes(type).includes(subtype);
};

// Initialize with URL params if they're valid
onMounted(() => {
	const queryType = route.query.type as ContentType;
	const querySubtype = route.query.subtype as string;

	// If we have valid type in URL, use it
	if (queryType && Object.values(ContentType).includes(queryType)) {
		selectedTypeModel.value = queryType;
	}

	// If we have valid subtype in URL, use it
	if (querySubtype && isValidSubtype(selectedTypeModel.value, querySubtype)) {
		emit('update:selectedSubtype', querySubtype);
	}
});
</script>

<style scoped>
.transform {
	transition: transform 0.2s ease;
}
</style>
