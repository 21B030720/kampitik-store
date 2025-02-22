<template>
	<div class="container mx-auto px-4 py-8">
		<div class="bg-white rounded-lg shadow p-6">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div>
					<div class="aspect-square bg-gray-200 rounded-lg"/>
					<div class="grid grid-cols-4 gap-2 mt-4">
						<div
							v-for="i in 4"
							:key="i"
							class="aspect-square bg-gray-100 rounded"
						/>
					</div>
				</div>

				<div>
					<h1 class="text-3xl font-bold mb-2">Product Name</h1>
					<p class="text-2xl font-semibold text-primary mb-4">$99.99</p>

					<div class="mb-6">
						<h2 class="text-xl font-semibold mb-2">Description</h2>
						<p class="text-gray-600">Product description goes here...</p>
					</div>

					<div class="mb-6">
						<h2 class="text-xl font-semibold mb-2">Specifications</h2>
						<ul class="list-disc list-inside space-y-2">
							<li>Specification 1</li>
							<li>Specification 2</li>
							<li>Specification 3</li>
						</ul>
					</div>

					<button
						class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
					>
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	// const route = useRoute()
	// const productId = route.params.id
	// Fetch product details using productId
</script>
