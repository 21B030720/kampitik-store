<template>
	<div class="container mx-auto px-4 py-8">
		<h1 class="text-3xl font-bold mb-4">My Bonus Points</h1>
		<p class="text-lg text-gray-600 mb-8">You have 2000 bonus points</p>

		<!-- Points Overview Cards -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
			<div class="bg-white rounded-lg shadow p-6 text-center">
				<div class="text-4xl font-bold mb-2">2000</div>
				<div class="text-gray-500">Total Bonus points</div>
			</div>
			<div class="bg-white rounded-lg shadow p-6 text-center">
				<div class="text-4xl font-bold mb-2">0</div>
				<div class="text-gray-500">Available rewards</div>
			</div>
			<div class="bg-white rounded-lg shadow p-6 text-center">
				<div class="text-4xl font-bold mb-2">140</div>
				<div class="text-gray-500">Lifetime points</div>
			</div>
		</div>

		<!-- Rewards Section -->
		<h2 class="text-2xl font-bold mb-6">Redeem your rewards</h2>
		<div class="space-y-4">
			<!-- Reward Card -->
			<div
				v-for="reward in rewards"
				:key="reward.id"
				class="bg-white rounded-lg shadow p-4 flex items-center justify-between"
			>
				<div class="flex items-center space-x-6">
					<img
						:src="reward.image"
						:alt="reward.name"
						class="w-32 h-32 object-cover rounded-lg"
					>
					<div>
						<h3 class="text-xl font-semibold mb-2">{{ reward.name }}</h3>
						<p class="text-gray-500">
							Use {{ reward.points }} points to redeem
						</p>
					</div>
				</div>
				<button
					class="px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-b from-[#2194F2] to-[#82FF8A] hover:opacity-90 transition-opacity"
				>
					Redeem
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	interface Reward {
		id: number;
		name: string;
		points: number;
		image: string;
	}

	const rewards = ref<Reward[]>([
		{
			id: 1,
			name: 'Free shipping',
			points: 500,
			image:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDMNPDmwLvoS0vTJh_awRtWOl3OMKI-lZvFQ&s',
		},
		{
			id: 2,
			name: '20% Discount',
			points: 1000,
			image:
				'https://i.pinimg.com/564x/ba/6e/bd/ba6ebd471b89f765741b20d920fd9276.jpg',
		},
		{
			id: 3,
			name: 'Free shipping',
			points: 500,
			image:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDMNPDmwLvoS0vTJh_awRtWOl3OMKI-lZvFQ&s',
		},
	]);
</script>

<style scoped>
	.bg-gradient-to-b {
		background: linear-gradient(to bottom, #2194f2, #82ff8a);
	}
</style>
