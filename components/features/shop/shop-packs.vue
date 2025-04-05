<template>
  <section v-if="bundles.length > 0" class="mb-12">
    <h2 class="text-2xl font-bold mb-6">{{ t('shop.preparedBundles') }}</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <CatalogPackCard
        v-for="bundle in bundles"
        :key="bundle.id"
        :pack="bundle"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
	import { useI18n } from 'vue-i18n';
	import type { Bundle } from '~/types/bundle';
	import CatalogPackCard from '~/components/features/catalog/catalog-pack-card.vue';

	const { t } = useI18n();
	const localePath = useLocalePath();

	defineProps<{
		bundles: Bundle[];
	}>();

	const handleImageError = (event: Event) => {
		const img = event.target as HTMLImageElement;
		img.style.display = 'none';
	};
</script>

<style scoped>
.pack-card {
  max-width: 300px; /* Set the maximum width */
  max-height: 400px; /* Set the maximum height */
  overflow: hidden; /* Hide overflow content */
}
</style>