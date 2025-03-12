<template>
	<div class="container mx-auto px-4 py-8">
		<!-- Container for injected Paybox HTML -->
		<div 
			v-if="payboxHtml"
			v-html="payboxHtml"
			class="bg-white rounded-lg shadow-lg p-6"
		></div>

		<!-- Loading state -->
		<div v-else class="flex justify-center items-center min-h-[200px]">
			<p class="text-gray-500">{{ t('loading') }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { fetchWithAuth } from '~/utils/api';
import { BASE_URL } from '~/BASE_URL';

const { t } = useI18n();
const payboxHtml = ref<string>('');

onMounted(async () => {
	try {
		const response = await fetchWithAuth(`${BASE_URL}/paybox/cards/save/`);
		const html = await response.text();
		payboxHtml.value = html;
	} catch (error) {
		console.error('Failed to fetch Paybox cards page:', error);
	}
});

// Add middleware to ensure user is authenticated
definePageMeta({
	middleware: ['auth']
});
</script>

<style>
/* You might need to add styles here to properly display the Paybox content */
</style> 