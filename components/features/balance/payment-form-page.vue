<template>
	<div class="fixed inset-0 z-50 bg-white">
		<div class="container mx-auto px-4 py-8">
			<button 
				class="mb-4 text-gray-600 hover:text-gray-900 flex items-center gap-2"
				@click="$emit('close')"
			>
				← {{ t('back.toReplenishment') }}
			</button>
			<iframe
				ref="iframeRef"
				class="w-full max-w-md mx-auto min-h-[400px]"
				:srcdoc="props.html"
				frameborder="0"
			></iframe>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
	html: string;
}>();

const iframeRef = ref<HTMLIFrameElement | null>(null);

onMounted(() => {
	// Wait for iframe to load
	if (iframeRef.value) {
		iframeRef.value.onload = () => {
			// Get the iframe document
			const iframeDoc = iframeRef.value?.contentDocument;
			if (!iframeDoc) return;

			// Find and re-execute the script in the iframe context
			const scriptContent = props.html.match(/src="([^"]+)"/)?.[1];
			if (scriptContent) {
				const script = iframeDoc.createElement('script');
				script.src = scriptContent;
				iframeDoc.body.appendChild(script);
			}
		};
	}
});

defineEmits<{
	(e: 'close'): void;
}>();
</script>