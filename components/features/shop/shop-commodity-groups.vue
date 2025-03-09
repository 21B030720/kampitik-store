<template>
	<div class="mb-12">
		<h2 class="text-2xl font-bold mb-6">{{ t('shop.commodityGroups') }}</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<NuxtLink
				v-for="group in commodityGroups"
				:key="group.id"
				:to="localePath(`/commodity-groups/${group.id}`)"
				class="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
			>
				<div class="flex items-start gap-4">
					<img
						v-if="group.image"
						:src="group.image"
						:alt="group.name"
						class="w-16 h-16 rounded-lg object-cover"
						@error="handleImageError"
					>
					<div>
						<h3 class="font-semibold text-lg">{{ group.name }}</h3>
						<p v-if="group.description" class="text-gray-600 text-sm">
							{{ group.description }}
						</p>
						<p class="text-sm text-gray-500 mt-1">
							{{ group.category_name }}
						</p>
					</div>
				</div>
			</NuxtLink>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { CommodityGroup } from '~/types/commodity-group';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
	const localePath = useLocalePath();

	defineProps<{
		commodityGroups: CommodityGroup[];
	}>();

	const handleImageError = (event: Event) => {
		const img = event.target as HTMLImageElement;
		img.style.display = 'none';
	};
</script>
