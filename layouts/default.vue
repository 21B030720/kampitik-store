<script setup>
	// Import the navigation component explicitly since auto-imports is disabled
	import Header from '~/components/shared/main-header.vue';
	import ChatButton from '~/components/features/chat/chat-button.vue';
	import ChatWindow from '~/components/features/chat/chat-window.vue';

	const route = useRoute();
	const { t, te } = useI18n();

	const head = useLocaleHead({
		addDirAttribute: true,
		identifierAttribute: 'id',
		addSeoAttributes: true,
	});

	// Add error handling for title
	const title = computed(() => {
		if (!route.meta?.title) return 'Kampitik Store';
		return te(route.meta.title) ? t(route.meta.title) : 'Kampitik Store';
	});

	const isChatOpen = ref(false);

	const toggleChat = () => {
		isChatOpen.value = !isChatOpen.value;
	};
</script>

<template>
	<div>
		<Header />
		<Html :lang="head?.htmlAttrs?.lang" :dir="head?.htmlAttrs?.dir">
			<Head>
				<Title>{{ title }}</Title>

				<template v-for="link in head?.link" :key="link.id">
					<Link
						:id="link.id"
						:rel="link.rel"
						:href="link.href"
						:hreflang="link.hreflang"
					/>
				</template>

				<template v-for="meta in head?.meta" :key="meta.id">
					<Meta
						:id="meta.id"
						:property="meta.property"
						:content="meta.content"
					/>
				</template>
			</Head>

			<Body>
				<slot />
				<ChatButton @click="toggleChat" />
				<ChatWindow 
					v-if="isChatOpen" 
					@close="isChatOpen = false" 
				/>
			</Body>
		</Html>
	</div>
</template>
