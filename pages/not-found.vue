<template>
	<div class="min-h-[70vh] flex items-center justify-center px-4">
		<div class="text-center">
			<h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
			<p class="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</p>
			<p class="text-gray-600 mb-8">
				The page you're looking for doesn't exist or has been moved.
			</p>
			<div class="space-x-4">
				<NuxtLink
					to="/"
					class="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
				>
					Go Home
				</NuxtLink>
				<button
					class="inline-block px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
					@click="goBack"
				>
					Go Back
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	const router = useRouter();

	const goBack = () => {
		router.back();
	};

	// Set custom meta for this page
	definePageMeta({
		layout: 'default',
		title: 'Page Not Found',
	});
</script>
