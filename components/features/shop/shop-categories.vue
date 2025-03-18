<template>
	<div class="mb-8 relative">
		<button 
			class="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
			@click.stop="togglePopup"
		>
			<span class="font-medium">{{ t('shop.categories') }}</span>
			<span class="text-gray-500">
				{{ selectedCategory ? getCategoryName(selectedCategory) : t('shop.allCategories') }}
			</span>
			<svg 
				class="w-5 h-5 transition-transform"
				:class="{ 'rotate-180': isOpen }"
				fill="none" 
				stroke="currentColor" 
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</button>

		<!-- Popup -->
		<Transition
			enter-active-class="transition ease-out duration-200"
			enter-from-class="opacity-0 translate-y-1"
			enter-to-class="opacity-100 translate-y-0"
			leave-active-class="transition ease-in duration-150"
			leave-from-class="opacity-100 translate-y-0"
			leave-to-class="opacity-0 translate-y-1"
		>
			<div 
				v-if="isOpen"
				class="absolute z-50 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 max-h-96 overflow-y-auto"
				@click.stop
			>
				<!-- All categories option -->
				<button
					class="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
					:class="{ 'bg-gray-50': !selectedCategory }"
					@click="selectCategory(null)"
				>
					{{ t('shop.allCategories') }}
				</button>

				<!-- Category options -->
				<button
					v-for="category in categories"
					:key="category.id"
					class="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
					:class="{ 'bg-gray-50': selectedCategory === category.id }"
					@click="selectCategory(category.id)"
				>
					{{ category.name }}
				</button>
			</div>
		</Transition>

		<!-- Backdrop -->
		<div 
			v-if="isOpen"
			class="fixed inset-0 z-40 bg-black bg-opacity-25"
			@click="closePopup"
		></div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Category } from '~/types/category';
import { ShopService } from '~/services/ShopService';

const { t } = useI18n();

const props = defineProps<{
	selectedCategory: number | null;
}>();

const emit = defineEmits<{
	(e: 'update:selectedCategory', id: number | null): void;
}>();

const categories = ref<Category[]>([]);
const isOpen = ref(false);

// Fetch categories on mount
onMounted(async () => {
	try {
		categories.value = await ShopService.getProductCategories();
		console.log('Fetched categories:', categories.value); // Debug log
	} catch (error) {
		console.error('Failed to fetch categories:', error);
	}
});

const togglePopup = () => {
	isOpen.value = !isOpen.value;
};

const closePopup = () => {
	isOpen.value = false;
};

const selectCategory = (categoryId: number | null) => {
	emit('update:selectedCategory', categoryId);
	closePopup();
};

const getCategoryName = (categoryId: number): string => {
	const category = categories.value.find(c => c.id === categoryId);
	return category?.name || '';
};

// Close popup when clicking outside
const handleClickOutside = (event: MouseEvent) => {
	const target = event.target as HTMLElement;
	if (!target.closest('.relative')) {
		closePopup();
	}
};

onMounted(() => {
	document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
	document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* Add smooth scrollbar for the popup */
.overflow-y-auto {
	scrollbar-width: thin;
	scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
	width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
	background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
	background-color: rgba(156, 163, 175, 0.5);
	border-radius: 3px;
}
</style>
