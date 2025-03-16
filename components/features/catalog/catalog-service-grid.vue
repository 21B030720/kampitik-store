<template>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		<NuxtLink
			v-for="service in services"
			:key="service.id"
			:to="localePath(`/services/${service.id}`)"
			class="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
		>
			<img
                :src="service.service_provider.profile_photo || placeholderImage"
                :alt="service.title"
                class="w-full h-48 object-cover"
                @error="handleImageError"
            >
			<div class="p-4">
				<h3 class="font-semibold text-lg mb-2">{{ service.title }}</h3>
				<p v-if="service.details" class="text-gray-600 text-sm mb-4">
					{{ service.details }}
				</p>
				
				<!-- Service Details -->
				<div class="space-y-2 mb-4">
					<p class="text-sm">
						<span class="font-medium">{{ t('service.provider') }}:</span>
						{{ service.service_provider.full_name }}
					</p>
					<p v-if="service.service_type" class="text-sm">
						<span class="font-medium">{{ t('service.type') }}:</span>
						{{ service.service_type }}
					</p>
					<p v-if="service.address" class="text-sm">
						<span class="font-medium">{{ t('service.location') }}:</span>
						{{ service.address }}
					</p>
					<div class="flex items-center gap-2">
						<span class="text-sm font-medium">{{ t('service.rating') }}:</span>
						<div class="flex items-center">
							<span class="text-yellow-400">★</span>
							<span class="text-sm ml-1">
								{{ service.service_provider.avg_rating || t('service.noRating') }}
							</span>
							<span class="text-sm text-gray-500 ml-1">
								({{ service.service_provider.rating_count }})
							</span>
						</div>
					</div>
				</div>

				<div class="flex justify-between items-center">
					<p class="text-lg font-bold">{{ service.price }}₸</p>
					<p v-if="service.payment_period" class="text-sm text-gray-600">
						/{{ service.payment_period }}
					</p>
				</div>
			</div>
		</NuxtLink>
	</div>
</template>

<script setup lang="ts">
import type { Service } from '~/types/service';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const localePath = useLocalePath();

defineProps<{
	services: Service[];
}>();

const placeholderImage = new URL('@/assets/images/placeholder-product.png', import.meta.url).href;

const handleImageError = (e: Event) => {
    const img = e.target as HTMLImageElement;
    img.src = placeholderImage;
};
</script> 