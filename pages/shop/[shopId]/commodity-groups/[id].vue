<template>
	<div class="container mx-auto px-4 py-8">
		<div v-if="commodityGroup" class="bg-white rounded-lg shadow-lg p-6">
			<!-- Header -->
			<div class="flex items-start gap-6 mb-8">
				<img
					v-if="commodityGroup.image"
					:src="commodityGroup.image"
					:alt="commodityGroup.name"
					class="w-32 h-32 rounded-lg object-cover"
					@error="handleImageError"
				>
				<div>
					<h1 class="text-3xl font-bold mb-2">{{ commodityGroup.name }}</h1>
					<p v-if="commodityGroup.description" class="text-gray-600 mb-4">
						{{ commodityGroup.description }}
					</p>
					<div class="flex items-center gap-2">
						<span class="text-sm text-gray-500">{{
							commodityGroup.category_name
						}}</span>
						<span class="text-sm text-gray-500">•</span>
						<span class="text-sm text-gray-500">{{
							commodityGroup.shop_name
						}}</span>
					</div>
				</div>
			</div>

			<!-- Products in this commodity group will be added here -->
		</div>

		<!-- Loading state -->
		<div v-else class="flex justify-center items-center min-h-[200px]">
			<p class="text-gray-500">{{ t('loading') }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import { ShopService } from '~/services/ShopService';
	import type { CommodityGroup } from '~/types/commodity-group';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
	const route = useRoute();
	const commodityGroupId = parseInt(route.params.id as string);

	const commodityGroup = ref<CommodityGroup | null>(null);

	onMounted(async () => {
		try {
			commodityGroup.value =
				await ShopService.getCommodityGroupById(commodityGroupId);
		} catch (error) {
			console.error('Failed to fetch commodity group:', error);
			// You might want to show an error message or redirect
		}
	});

	const handleImageError = (event: Event) => {
		const img = event.target as HTMLImageElement;
		img.style.display = 'none';
	};
</script>
