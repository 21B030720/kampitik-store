<template>
	<section class="container mx-auto px-14 py-8">
		<h2 class="text-4xl font-bold mb-8 text-center">Our advantages</h2>

		<div class="grid grid-cols-3 gap-4 mb-4">
			<!-- First Row -->
			<!-- Installment Plan -->
			<div class="bg-[#E8EDF5] p-6 rounded-3xl flex flex-col items-center">
				<div class="w-16 h-16 mb-4">
					<img
						src="~/assets/icons/bank_card.svg"
						alt="Installment"
						class="w-full h-full"
					>
				</div>
				<h3 class="text-lg font-bold mb-2">Installment plan</h3>
			</div>

			<!-- Delivery -->
			<div class="bg-[#E8EDF5] p-6 rounded-3xl flex flex-col items-center">
				<div class="w-16 h-16 mb-4">
					<img
						src="~/assets/icons/delivery.svg"
						alt="Delivery"
						class="w-full h-full"
					>
				</div>
				<h3 class="text-lg font-bold mb-2">
					Deliver to any place of Kazakhstan
				</h3>
				<p class="text-sm text-center">
					We have three delivery plans: free delivery within Almaty, self
					delivery, delivery by mail, delivery by company
				</p>
			</div>

			<!-- Save Time -->
			<div class="bg-[#E8EDF5] p-6 rounded-3xl flex flex-col items-center">
				<div class="w-16 h-16 mb-4">
					<img
						src="~/assets/icons/clock.svg"
						alt="Clock"
						class="w-full h-full"
					>
				</div>
				<h3 class="text-lg font-bold mb-2">Save your time</h3>
				<p class="text-sm text-center">We do all to save your time</p>
			</div>
		</div>

		<!-- Second Row -->
		<div class="grid grid-cols-2 gap-4">
			<!-- Trusted Producers -->
			<div class="bg-[#E8EDF5] p-6 rounded-3xl flex flex-col items-center">
				<div class="w-16 h-16 mb-4">
					<img
						src="~/assets/icons/factory.svg"
						alt="Factory"
						class="w-full h-full"
					>
				</div>
				<h3 class="text-lg font-bold mb-2">Trusted producers</h3>
				<p class="text-sm text-center">
					Help to choose best variants from manufacturs
				</p>
			</div>

			<!-- One Child One Product -->
			<div class="bg-[#E8EDF5] p-6 rounded-3xl flex flex-col items-center">
				<div class="w-16 h-16 mb-4">
					<!-- <img src="~/assets/icons/child.svg" alt="Child" class="w-full h-full"> -->
				</div>
				<h3 class="text-lg font-bold mb-2">One child - one product</h3>
				<p class="text-sm text-center">
					Recommend based on your child's specifics, and help to collect all
					needs in one pack
				</p>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts"></script>

<style scoped>
	.text-primary {
		color: #3490dc;
	}
</style>
