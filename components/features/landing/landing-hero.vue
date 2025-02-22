<template>
	<section class="container mx-auto px-14 py-8">
		<div class="flex gap-8">
			<!-- Left Side - Bento UI -->
			<div class="flex-1">
				<div class="bg-[#E8EDF5] rounded-3xl p-8">
					<h1 class="text-4xl font-bold mb-4">
						<span class="text-primary">Best</span> profitable market in
						Kazakhstan
					</h1>

					<p class="text-xl mb-6">
						Need <span class="text-primary">something</span> for your child?
					</p>

					<!-- Search Bar -->
					<div class="flex gap-3 mb-8">
						<input
							type="text"
							placeholder="Search products..."
							class="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
						>
						<button
							class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
						>
							{{ t('search.catalog') }}
						</button>
					</div>

					<!-- Category Icons -->
					<div class="flex gap-8">
						<div
							v-for="category in categories"
							:key="category.name"
							class="text-center"
						>
							<div
								class="w-16 h-16 rounded-full bg-white shadow-md mb-2 mx-auto flex items-center justify-center overflow-hidden"
							>
								<img
									:src="category.icon"
									:alt="category.name"
									class="w-full h-full object-cover"
								>
							</div>
							<p class="text-sm">{{ t(category.name) }}</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Right Side -->
			<div class="flex-1 flex flex-col gap-4">
				<!-- Top Image Section -->
				<div class="flex-1 bg-[#E8EDF5] rounded-3xl px-8 flex items-center">
					<div class="flex flex-col gap-4 w-full">
						<div class="flex items-center justify-between">
							<h2 class="text-2xl font-bold">Need some consultation?</h2>
							<!-- Consultant Images -->
							<div class="flex -space-x-4">
								<div
									v-for="i in 4"
									:key="i"
									class="w-12 h-12 rounded-full border-2 border-white overflow-hidden"
								>
									<img
										:src="`/images/consultants/consultant-${i}.jpg`"
										:alt="`Consultant ${i}`"
										class="w-full h-full object-cover"
									>
								</div>
							</div>
						</div>

						<button
							class="px-6 py-3 text-white rounded-lg bg-gradient-to-b from-[#2194F2] to-[#82FF8A] hover:opacity-90 transition-opacity w-fit text-2xl"
						>
							Contact us
						</button>
					</div>
				</div>

				<!-- Bottom Section - Placeholder -->
				<div class="flex-1 bg-[#E8EDF5] rounded-3xl">
					<!-- We'll add this content next -->
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	const { t } = useI18n();

	const categories = [
		{ name: 'categories.sport', icon: '/images/categories/sport.jpg' },
		{ name: 'categories.food', icon: '/images/categories/food.jpg' },
		{ name: 'categories.service', icon: '/images/categories/service.jpg' },
		{ name: 'categories.vitamins', icon: '/images/categories/vitamins.jpg' },
		{
			name: 'categories.activities',
			icon: '/images/categories/activities.jpg',
		},
	];
</script>

<style scoped>
	.text-primary {
		color: #3490dc;
	}
	.bg-primary {
		background-color: #3490dc;
	}
	.hover\:bg-primary-dark:hover {
		background-color: #2779bd;
	}
	.focus\:ring-primary:focus {
		--tw-ring-color: #3490dc;
	}

	/* Optional: Add hover effect to consultant images */
	.rounded-full:hover {
		transform: translateY(-2px);
		transition: transform 0.2s ease-in-out;
	}
</style>
