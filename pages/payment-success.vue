<template>
	<div class="container mx-auto px-4 py-8">
		<div class="max-w-md mx-auto">
			<div class="bg-white rounded-lg shadow-lg p-6 text-center">
				<div class="mb-6">
					<div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<span class="text-green-500 text-2xl">✓</span>
					</div>
					<h1 class="text-2xl font-bold text-gray-900 mb-2">
						{{ t('payment.success') }}
					</h1>
					<p class="text-gray-600">
						{{ t('payment.successMessage') }}
					</p>
				</div>

				<NuxtLink
					:to="localePath('/cabinet')"
					class="inline-block bg-[#128C7E] text-white px-6 py-3 rounded-lg hover:bg-[#0E7265] transition-colors"
				>
					{{ t('back.toCabinet') }}
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const localePath = useLocalePath();
</script> 