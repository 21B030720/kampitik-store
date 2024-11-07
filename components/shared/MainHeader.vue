<template>
	<header class="text-black shadow-md">
		<div class="container mx-auto flex items-center justify-between p-4">
			<div class="text-2xl font-bold">
				<a href="/">MyLogo</a>
			</div>

			<nav class="space-x-4">
				<a href="/" class="hover:text-gray-200">Home</a>
				<a href="/about" class="hover:text-gray-200">About</a>
				<a href="/services" class="hover:text-gray-200">Services</a>
				<a href="/contact" class="hover:text-gray-200">Contact</a>
			</nav>
		</div>
	</header>
</template>

<script>
	export default {
		name: 'MainHeader',
	};
</script>

<style scoped>
	/* Optional custom styles */
	.bg-blue {
		background-color: #87ceeb;
	}
</style>
