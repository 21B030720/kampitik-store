<template>
	<div class="mb-8">
		<h2 class="text-2xl font-bold mb-4">{{ t('shop.categories') }}</h2>
		<div class="flex flex-wrap gap-3">
			<button
				v-for="category in categories"
				:key="category.id"
				class="px-4 py-2 rounded-full text-sm transition-colors"
				:class="[
					selectedCategory === category.id
						? 'bg-primary-600 text-white'
						: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
				]"
				@click="selectCategory(category.id)"
			>
				{{ category.name }}
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { Category } from '~/types/category';

	const { t } = useI18n();

	const props = defineProps<{
		categories: Category[];
		selectedCategory: number | null;
	}>();

	const emit = defineEmits<{
		(e: 'update:selectedCategory', id: number | null): void;
	}>();

	const selectCategory = (categoryId: number) => {
		emit(
			'update:selectedCategory',
			props.selectedCategory === categoryId ? null : categoryId,
		);
	};
</script>
