<template>
	<section class="mb-12">
		<h2 class="text-2xl font-bold mb-6">{{ t('shop.preparedBundles') }}</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<div
				v-for="bundle in bundles"
				:key="bundle.id"
				class="bg-white rounded-lg shadow p-4"
			>
				<div class="flex items-start gap-4">
					<img
						v-if="bundle.image"
						:src="bundle.image"
						:alt="bundle.name"
						class="w-24 h-24 rounded-lg object-cover"
						@error="handleImageError"
					>
					<div class="flex-1">
						<div class="flex justify-between items-start mb-2">
							<div>
								<h3 class="text-lg font-semibold">{{ bundle.name }}</h3>
								<p class="text-gray-600 text-sm">{{ bundle.price }}тг.</p>
							</div>
							<button
								class="p-2 hover:bg-gray-100 rounded-full transition-colors"
								@click="$emit('add-to-basket', bundle)"
							>
								<img
									src="~/assets/icons/basket.svg"
									alt="Add to basket"
									class="w-6 h-6"
								>
							</button>
						</div>
						<p v-if="bundle.description" class="text-sm text-gray-600 mb-2">
							{{ bundle.description }}
						</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Empty state -->
		<div v-if="bundles.length === 0" class="text-center text-gray-500 py-8">
			{{ t('shop.noBundles') }}
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { Bundle } from '~/types/bundle';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();

	defineProps<{
		bundles: Bundle[];
	}>();

	defineEmits<{
		(e: 'add-to-basket', bundle: Bundle): void;
	}>();

	const handleImageError = (event: Event) => {
		const img = event.target as HTMLImageElement;
		img.style.display = 'none';
	};
</script>
