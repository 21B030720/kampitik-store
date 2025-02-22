<template>
	<div class="w-full md:w-64 flex-shrink-0">
		<div class="bg-white rounded-lg shadow p-4">
			<h2 class="text-xl font-bold mb-4">{{ t('catalog.filters') }}</h2>

			<!-- Price Range -->
			<div class="mb-6">
				<h3 class="font-semibold mb-2">{{ t('catalog.priceRange') }}</h3>
				<div class="space-y-2">
					<input
						v-model="localPriceRange"
						type="range"
						min="0"
						max="1000"
						class="w-full"
						@change="updateFilters"
					>
					<div class="flex justify-between text-sm text-gray-600">
						<span>${{ localPriceRange }}</span>
						<span>$1000</span>
					</div>
				</div>
			</div>

			<!-- Categories -->
			<div class="mb-6">
				<h3 class="font-semibold mb-2">{{ t('catalog.categories') }}</h3>
				<div class="space-y-2">
					<label
						v-for="category in categories"
						:key="category.id"
						class="flex items-center"
					>
						<input
							v-model="localSelectedCategories"
							type="checkbox"
							:value="category.id"
							class="mr-2"
							@change="updateFilters"
						>
						{{ t(`categories.${category.key}`) }}
					</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, watch } from 'vue';
	import type { Category } from '~/types/category';

	const { t } = useI18n();

	const props = defineProps<{
		categories: Category[];
		priceRange: number;
		selectedCategories: number[];
	}>();

	const emit = defineEmits<{
		(e: 'update:priceRange', value: number): void;
		(e: 'update:selectedCategories', value: number[]): void;
	}>();

	// Local state for v-model sync
	const localPriceRange = ref(props.priceRange);
	const localSelectedCategories = ref<number[]>([...props.selectedCategories]);

	// Watch for prop changes
	watch(
		() => props.priceRange,
		(newValue) => {
			localPriceRange.value = newValue;
		},
	);

	watch(
		() => props.selectedCategories,
		(newValue) => {
			localSelectedCategories.value = [...newValue];
		},
	);

	// Update parent component
	const updateFilters = () => {
		emit('update:priceRange', localPriceRange.value);
		emit('update:selectedCategories', localSelectedCategories.value);
	};
</script>
