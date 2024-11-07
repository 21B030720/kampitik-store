<template>
	<section class="py-10 px-1 flex justify-center">
		<div
			class="bg-blue text-center rounded-3xl shadow-lg overflow-hidden p-8 md:p-12 lg:p-16 w-full max-w-6xl"
		>
			<div
				class="container mx-auto flex flex-col md:flex-row items-center text-left space-y-6 md:space-y-0"
			>
				<!-- Text Content -->
				<div class="md:w-1/2 flex flex-col items-start space-y-4">
					<!-- Main Title -->
					<h1 class="text-4xl md:text-5xl font-bold text-white mb-2">
						Nutritious Foods for Your Little One
					</h1>

					<!-- Subtitle -->
					<p class="text-lg md:text-xl text-white mb-4">
						Our organic baby foods are made with love and care to support
						healthy growth.
					</p>

					<!-- Call to Action Button -->
					<a
						href="/shop"
						class="bg-peach text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-orange-600 transition-colors"
					>
						Shop Now
					</a>
				</div>

				<!-- Right-Side Image -->
				<div class="md:w-1/2 flex justify-center md:justify-end">
					<img
						src="@/assets/images/hero.png"
						alt="Baby food"
						class="max-w-full h-auto rounded-lg shadow-md"
					>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		name: 'Hero',
	};
</script>

<style scoped>
	/* Custom colors for the theme */
	.bg-blue {
		background-color: #87ceeb;
	}

	.bg-peach {
		background-color: #ffdab9;
	}
</style>
