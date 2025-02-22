<template>
	<div>
		<Hero />
		<CompanyInfo />
		<Advantages />
		<Footer />
	</div>
</template>

<script setup lang="ts">
	import Hero from '~/components/features/landing/landing-hero.vue';
	import CompanyInfo from '~/components/features/landing/landing-company-info.vue';
	import Advantages from '~/components/features/landing/landing-advantages.vue';
	import Footer from '~/components/shared/main-footer.vue';
</script>
