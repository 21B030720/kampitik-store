<script setup>
	const localePath = useLocalePath();
</script>

<!-- TODO: update links in MainHeader in the future -->
<template>
	<header class="text-black shadow-md">
		<div class="container mx-auto flex items-center justify-between p-4">
			<NuxtLink :to="localePath('/')" class="text-2xl font-bold">
				My Logo
			</NuxtLink>

			<nav class="space-x-4">
				<NuxtLink :to="localePath('/')"> Home </NuxtLink>
				<NuxtLink :to="localePath('/')"> About </NuxtLink>
				<NuxtLink :to="localePath('/')"> Services </NuxtLink>
				<NuxtLink :to="localePath('/')"> Contact </NuxtLink>
			</nav>
		</div>
	</header>
</template>
