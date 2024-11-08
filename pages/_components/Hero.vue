<script setup>
	const localePath = useLocalePath();
</script>

<template>
	<section class="flex justify-center px-1 py-10">
		<div
			class="w-full max-w-6xl overflow-hidden rounded-3xl bg-sky-400 p-8 text-center shadow-lg md:p-12 lg:p-16"
		>
			<div
				class="container mx-auto flex flex-col items-center space-y-6 text-left md:flex-row md:space-y-0"
			>
				<!-- Text Content -->
				<div class="flex flex-col items-start space-y-4 md:w-1/2">
					<!-- Main Title -->
					<h1 class="mb-2 text-4xl font-bold text-white md:text-5xl">
						Nutritious Foods for Your Little One
					</h1>

					<!-- Subtitle -->
					<p class="mb-4 text-lg text-white md:text-xl">
						Our organic baby foods are made with love and care to support
						healthy growth.
					</p>

					<!-- Call to Action Button -->
					<NuxtLink
						:to="localePath('/')"
						class="rounded-full bg-orange-300 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-orange-400"
					>
						Shop Now
					</NuxtLink>
				</div>

				<!-- Right-Side Image -->
				<div class="flex justify-center md:w-1/2 md:justify-end">
					<img
						src="@/assets/images/hero.png"
						alt="Baby food"
						class="rounded-lg shadow-md"
					/>
				</div>
			</div>
		</div>
	</section>
</template>
