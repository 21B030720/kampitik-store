<template>
	<div class="container mx-auto px-4 py-8">
		<h1 class="text-2xl font-bold mb-6">{{ t('basket.title') }}</h1>

		<div v-if="basketStore.items.length > 0" class="grid gap-8">
			<!-- Basket Items -->
			<div class="bg-white rounded-lg shadow p-6">
				<div class="space-y-4">
					<div
						v-for="item in basketStore.items"
						:key="item.id"
						class="flex items-center gap-4 py-4 border-b last:border-0"
					>
						<img
							:src="item.image || placeholderImage"
							:alt="item.name"
							class="w-20 h-20 object-cover rounded-lg"
							@error="handleImageError"
						>
						<div class="flex-grow">
							<h3 class="font-semibold">{{ item.name }}</h3>
							<p class="text-sm text-gray-600">{{ item.shop_name }}</p>
							<p class="text-sm text-gray-500">
								{{ item.price }}тг/{{ item.measure }}
							</p>
						</div>
						<div class="flex items-center gap-2">
							<button
								class="p-2 hover:bg-gray-100 rounded-full"
								@click="decreaseQuantity(item)"
							>
								-
							</button>
							<span class="w-8 text-center">{{ item.quantity }}</span>
							<button
								class="p-2 hover:bg-gray-100 rounded-full"
								@click="increaseQuantity(item)"
							>
								+
							</button>
						</div>
						<button
							class="p-2 text-red-500 hover:bg-red-50 rounded-full"
							@click="removeItem(item)"
						>
							×
						</button>
					</div>
				</div>
			</div>

			<!-- Order Summary -->
			<div class="bg-white rounded-lg shadow p-6">
				<h2 class="text-lg font-semibold mb-4">
					{{ t('basket.orderSummary') }}
				</h2>
				<div class="space-y-2">
					<div class="flex justify-between">
						<span>{{ t('basket.subtotal') }}</span>
						<span>{{ basketStore.totalPrice }}тг</span>
					</div>
					<div class="flex justify-between font-semibold text-lg pt-2 border-t">
						<span>{{ t('basket.total') }}</span>
						<span>{{ basketStore.totalPrice }}тг</span>
					</div>
				</div>
				<NuxtLink
					:to="localePath('/checkout')"
					class="w-full mt-6 bg-[#128C7E] text-white py-3 rounded-lg hover:bg-[#0E7265] transition-colors text-center block"
				>
					{{ t('basket.checkout') }}
				</NuxtLink>
			</div>
		</div>

		<!-- Empty State -->
		<div v-else class="text-center py-12 bg-white rounded-lg shadow">
			<p class="text-gray-500 mb-4">{{ t('basket.empty') }}</p>
			<NuxtLink
				:to="localePath('/catalog')"
				class="text-primary-600 hover:text-primary-700"
			>
				{{ t('basket.continueShopping') }}
			</NuxtLink>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useI18n } from 'vue-i18n';
	import { useBasketStore } from '~/stores/useBasketStore';
	import type { BasketItem } from '~/types/basket';

	const { t } = useI18n();
	const localePath = useLocalePath();
	const basketStore = useBasketStore();

	const placeholderImage = new URL(
		'@/assets/images/placeholder-product.png',
		import.meta.url,
	).href;

	const increaseQuantity = (item: BasketItem) => {
		basketStore.updateQuantity(item.id, item.quantity + 1, item.type);
	};

	const decreaseQuantity = (item: BasketItem) => {
		if (item.quantity > 1) {
			basketStore.updateQuantity(item.id, item.quantity - 1, item.type);
		}
	};

	const removeItem = (item: BasketItem) => {
		basketStore.removeItem(item.id, item.type);
	};

	const handleImageError = (event: Event) => {
		const img = event.target as HTMLImageElement;
		img.src = placeholderImage;
	};
</script>
