<template>
	<section class="container mx-auto px-14 py-8">
		<h1 class="text-4xl font-bold text-center mt-12">
			All for parent and child
		</h1>
		<div class="grid grid-cols-2 gap-4">
			<!-- First Row - Shop & Test -->
			<div class="bg-[#E8EDF5] p-6 rounded-3xl flex flex-col items-center">
				<div class="w-16 h-16 mb-4">
					<img src="~/assets/icons/shop.svg" alt="Shop" class="w-full h-full" >
				</div>
				<p class="text-lg text-center">
					A lot of shops where you can collect
					<span class="text-primary">packs</span>
				</p>
			</div>

			<div class="bg-[#E8EDF5] p-6 rounded-3xl flex flex-col items-center">
				<div class="w-16 h-16 mb-4">
					<img src="~/assets/icons/tube.svg" alt="Test" class="w-full h-full" >
				</div>
				<p class="text-lg text-center">
					<span class="text-primary">Test</span> packs if you want to give the
					child
					<span class="text-primary">choose</span>
				</p>
			</div>

			<!-- Second Row - Managers -->
			<div class="bg-[#E8EDF5] p-6 rounded-3xl col-span-2">
				<div class="flex justify-between items-center">
					<div class="flex items-center gap-4">
						<div class="w-16 h-16 flex-shrink-0">
							<img
								src="~/assets/icons/manager.svg"
								alt="Manager"
								class="w-full h-full"
							>
						</div>
						<p class="text-lg">
							<span class="text-primary">Ask</span> anything and anytime from
							our
							<span class="text-primary">Managers</span>
						</p>
					</div>
					<div class="flex flex-col gap-2 mx-8">
						<span>Allergy</span>
						<span>Growth</span>
						<span>Diseases</span>
						<span>Diet</span>
					</div>
					<div class="flex -space-x-2">
						<div
							v-for="i in 4"
							:key="i"
							class="w-10 h-10 rounded-full bg-gray-200"
						/>
					</div>
				</div>
			</div>

			<!-- Third Row - Gifts & Tickets -->
			<div class="bg-[#E8EDF5] p-6 rounded-3xl flex flex-col items-center">
				<div class="w-16 h-16 mb-4">
					<img src="~/assets/icons/gift.svg" alt="Gift" class="w-full h-full" >
				</div>
				<p class="text-lg text-center">Take a lot of gifts from us</p>
			</div>

			<div class="bg-[#E8EDF5] p-6 rounded-3xl flex flex-col items-center">
				<div class="w-16 h-16 mb-4">
					<img
						src="~/assets/icons/ticket.svg"
						alt="Ticket"
						class="w-full h-full"
					>
				</div>
				<p class="text-lg text-center">
					Tickets and other things when stay longer with us
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
