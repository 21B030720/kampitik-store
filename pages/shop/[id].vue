<template>
	<div class="container mx-auto px-4 py-8">
		<div class="bg-white rounded-lg shadow p-6">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div>
					<div class="aspect-video bg-gray-200 rounded-lg"/>
				</div>
				<div>
					<h1 class="text-3xl font-bold mb-4">Shop Name</h1>
					<p class="text-gray-600 mb-4">Shop description goes here...</p>

					<div class="mb-6">
						<h2 class="text-xl font-semibold mb-2">Contact Information</h2>
						<p>Address: 123 Store Street</p>
						<p>Phone: (123) 456-7890</p>
						<p>Email: shop@example.com</p>
					</div>

					<div>
						<h2 class="text-xl font-semibold mb-2">Working Hours</h2>
						<p>Monday - Friday: 9:00 AM - 6:00 PM</p>
						<p>Saturday: 10:00 AM - 4:00 PM</p>
						<p>Sunday: Closed</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	// const route = useRoute();
	// const shopId = route.params.id
	// Fetch shop details using shopId
</script>
