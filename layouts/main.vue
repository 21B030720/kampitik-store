<script setup>
	import Default from '~/layouts/default.vue';
	import MainHeader from '~/components/layout/MainHeader.vue';
</script>

<template>
	<Default>
		<MainHeader />

		<slot />
	</Default>
</template>
