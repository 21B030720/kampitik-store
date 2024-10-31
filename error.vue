<script setup>
	const err = useError();
</script>

<template>
	<h1 class="text-red-600">Global error page</h1>

	<p>{{ err }}</p>
</template>
