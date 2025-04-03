<template>
	<div>
		<Hero />
		<Shops />
		<Convinience />
		<!-- <GrowthStages /> -->
		<!-- <CompanyInfo /> -->
		<!-- <Advantages /> -->
	</div>
</template>

<script setup lang="ts">
	import Hero from '~/components/features/landing/landing-hero.vue';
	import CompanyInfo from '~/components/features/landing/landing-company-info.vue';
	import Advantages from '~/components/features/landing/landing-advantages.vue';
	import GrowthStages from '~/components/features/landing/landing-leveling.vue';
	import Shops from '~/components/features/landing/landing-shops.vue';
	import Convinience from '~/components/features/landing/landing-convinience.vue';
</script>
