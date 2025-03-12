<template>
	<div class="container mx-auto px-4 py-8">
		<div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 text-center">
			<div class="text-green-500 mb-4">
				<svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
			</div>
			<h1 class="text-2xl font-bold mb-4">{{ t('payment.success.title') }}</h1>
			<p class="text-gray-600 mb-6">{{ t('payment.success.message') }}</p>
			<NuxtLink
				:to="localePath('/cabinet')"
				class="inline-block bg-[#128C7E] text-white px-6 py-2 rounded-lg hover:bg-[#0E7265] transition-colors"
			>
				{{ t('back.toCabinet') }}
			</NuxtLink>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const localePath = useLocalePath();

definePageMeta({
	middleware: ['auth']
});
</script> 