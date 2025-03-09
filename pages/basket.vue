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
								@click="decreaseQuantity(item.id, item.quantity)"
							>
								-
							</button>
							<span class="w-8 text-center">{{ item.quantity }}</span>
							<button
								class="p-2 hover:bg-gray-100 rounded-full"
								@click="increaseQuantity(item.id, item.quantity)"
							>
								+
							</button>
						</div>
						<button
							class="p-2 text-red-500 hover:bg-red-50 rounded-full"
							@click="removeItem(item.id)"
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
				<button
					class="w-full mt-6 bg-[#128C7E] text-white py-3 rounded-lg hover:bg-[#0E7265] transition-colors"
					@click="goToCheckout"
				>
					{{ t('basket.checkout') }}
				</button>
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
	import { useRouter } from 'vue-router';

	const { t } = useI18n();
	const localePath = useLocalePath();
	const basketStore = useBasketStore();
	const router = useRouter();

	const placeholderImage = new URL(
		'@/assets/images/placeholder-product.png',
		import.meta.url,
	).href;

	const increaseQuantity = (productId: number, currentQuantity: number) => {
		basketStore.updateQuantity(productId, currentQuantity + 1);
	};

	const decreaseQuantity = (productId: number, currentQuantity: number) => {
		if (currentQuantity > 1) {
			basketStore.updateQuantity(productId, currentQuantity - 1);
		}
	};

	const removeItem = (productId: number) => {
		basketStore.removeItem(productId);
	};

	const goToCheckout = () => {
		router.push(localePath('/checkout'));
	};

	const handleImageError = (event: Event) => {
		const img = event.target as HTMLImageElement;
		img.src = placeholderImage;
	};
</script>
