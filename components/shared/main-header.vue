<template>
	<nav class="bg-white border-b-2 border-[#D6D6D6]">
		<div class="container mx-auto px-14">
			<div class="flex items-center justify-between h-16">
				<NuxtLink :to="localePath('/')" class="flex items-center">
					<img
						src="~/assets/images/logo.png"
						alt="Kampitik Store"
						class="h-14"
					>
				</NuxtLink>

				<div class="flex items-center space-x-6">
					<div class="flex space-x-4">
						<NuxtLink
							v-for="link in navigationLinks"
							:key="link.path"
							:to="localePath(link.path)"
							class="px-3 py-2 rounded-md hover:bg-gray-100"
							prefetch
						>
							{{ link.name }}
						</NuxtLink>
					</div>

					<a
						href="https://wa.me/YOUR_WHATSAPP_NUMBER"
						target="_blank"
						class="flex items-center px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#128C7E] transition-colors"
					>
						<img
							src="~/assets/icons/whatsapp.svg"
							alt="WhatsApp"
							class="w-5 h-5 mr-2 invert"
						>
						<span>{{ t('nav.chat') }}</span>
					</a>

					<button
						class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
					>
						{{ t('nav.signIn') }}
					</button>
				</div>
			</div>
		</div>
	</nav>
</template>

<script setup lang="ts">
	const { t } = useI18n();
	const localePath = useLocalePath();

	const navigationLinks = [
		{ name: 'nav.home', path: '/' },
		{ name: 'nav.catalog', path: '/catalog' },
		{ name: 'nav.bonusPoints', path: '/bonus-points' },
	].map((link) => ({
		...link,
		name: t(link.name),
	}));
</script>
