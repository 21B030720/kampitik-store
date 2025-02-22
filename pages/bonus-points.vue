<template>
	<div class="container mx-auto px-4 py-8">
		<h1 class="text-3xl font-bold mb-6">Your Bonus Points</h1>
		<div class="bg-white rounded-lg shadow p-6">
			<div class="mb-6">
				<h2 class="text-2xl font-semibold">Current Balance</h2>
				<p class="text-4xl font-bold text-primary">0 points</p>
			</div>

			<div class="mb-6">
				<h2 class="text-xl font-semibold mb-4">Points History</h2>
				<div class="space-y-4">
					<!-- Points history will go here -->
				</div>
			</div>

			<div>
				<h2 class="text-xl font-semibold mb-4">How to Earn Points</h2>
				<ul class="list-disc list-inside space-y-2">
					<li>Make a purchase</li>
					<li>Write a review</li>
					<li>Refer a friend</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	// Add your component logic here
</script>
