<template>
	<div class="container mx-auto px-4 py-8">
		<div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 text-center">
			<div class="text-red-500 mb-4">
				<svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</div>
			<h1 class="text-2xl font-bold mb-4">{{ t('payment.failure.title') }}</h1>
			<p class="text-gray-600 mb-6">{{ t('payment.failure.message') }}</p>
			<div class="space-y-4">
				<NuxtLink
					:to="localePath('/balance-replenishment')"
					class="inline-block bg-[#128C7E] text-white px-6 py-2 rounded-lg hover:bg-[#0E7265] transition-colors"
				>
					{{ t('payment.tryAgain') }}
				</NuxtLink>
				<br>
				<NuxtLink
					:to="localePath('/cabinet')"
					class="inline-block text-gray-600 hover:text-gray-900"
				>
					{{ t('back.toCabinet') }}
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

// Store all query parameters for future use
const params = route.query;

definePageMeta({
	middleware: ['auth']
});
</script> 