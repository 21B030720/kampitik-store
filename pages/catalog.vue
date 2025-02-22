<template>
	<div class="container mx-auto px-4 py-8">
		<h1 class="text-3xl font-bold mb-6">{{ t('catalog.title') }}</h1>
		<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
			<!-- Product grid will go here -->
			<div
				v-for="product in products"
				:key="product.id"
				class="bg-white rounded-lg shadow p-4"
			>
				<NuxtLink :to="localePath(`/products/${product.id}`)" prefetch>
					<div class="aspect-square bg-gray-200 mb-4"/>
					<h2 class="text-lg font-semibold">{{ product.name }}</h2>
					<p class="text-gray-600">${{ product.price.toFixed(2) }}</p>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	const { t } = useI18n();
	const localePath = useLocalePath();

	// Example data - moved outside of setup to ensure consistent SSR
	const productData = [
		{ id: 1, name: 'Product 1', price: 99.99 },
		{ id: 2, name: 'Product 2', price: 149.99 },
		// ... more products
	];

	const products = ref(productData);

	// // Define page meta
	// definePageMeta({
	//   layout: 'default'
	// })
</script>
