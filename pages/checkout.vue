<template>
	<div class="container mx-auto px-4 py-8">
		<h1 class="text-2xl font-bold mb-6">{{ t('checkout.title') }}</h1>

		<div class="grid md:grid-cols-2 gap-8">
			<!-- Order Summary -->
			<div class="bg-white rounded-lg shadow p-6">
				<h2 class="text-lg font-semibold mb-4">
					{{ t('checkout.orderSummary') }}
				</h2>
				<div class="space-y-4">
					<div
						v-for="item in basketStore.items"
						:key="item.id"
						class="flex items-center gap-4 py-4 border-b last:border-0"
					>
						<img
							:src="item.image || placeholderImage"
							:alt="item.name"
							class="w-16 h-16 rounded-lg object-cover"
							@error="handleImageError"
						>
						<div class="flex-grow">
							<h3 class="font-semibold">{{ item.name }}</h3>
							<div class="flex items-center gap-4 mt-2">
								<p class="text-sm text-gray-600">
									{{ item.quantity }} × {{ item.price }}тг
								</p>
								<ProductKidSelector
									:product-id="item.id"
									:initial-kid-id="item.kid_id"
									@update="(kidId) => updateKidForProduct(item.id, kidId)"
								/>
							</div>
						</div>
						<div class="text-right">
							<p class="font-semibold">
								{{ (parseFloat(item.price) * item.quantity).toFixed(2) }}тг
							</p>
						</div>
					</div>

					<div class="pt-4 border-t">
						<div class="flex justify-between text-lg font-semibold">
							<span>{{ t('checkout.total') }}</span>
							<span>{{ basketStore.totalPrice }}тг</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Submit Order / Login Section -->
			<div class="bg-white rounded-lg shadow p-6">
				<template v-if="authStore.isAuthenticated">
					<h2 class="text-lg font-semibold mb-4">
						{{ t('checkout.orderConfirmation') }}
					</h2>
					<button
						class="w-full bg-[#128C7E] text-white py-3 rounded-lg hover:bg-[#0E7265] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						:disabled="isSubmitting || basketStore.items.length === 0"
						@click="submitOrder"
					>
						{{ isSubmitting ? t('common.processing') : t('checkout.placeOrder') }}
					</button>
					<div 
						v-if="error" 
						class="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm"
					>
						{{ error }}
					</div>
				</template>

				<template v-else>
					<div class="text-center">
						<div class="text-gray-600 mb-4">
							{{ t('checkout.pleaseLoginFirst') }}
						</div>
						<NuxtLink
							:to="localePath('/login')"
							class="block w-full bg-[#128C7E] text-white py-3 rounded-lg hover:bg-[#0E7265] transition-colors text-center"
						>
							{{ t('auth.login') }}
						</NuxtLink>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed } from 'vue';
	import { useI18n } from 'vue-i18n';
	import { useBasketStore } from '~/stores/useBasketStore';
	import { useAuthStore } from '~/stores/useAuthStore';
	import { BASE_URL } from '~/BASE_URL';
	import ProductKidSelector from '~/components/features/checkout/product-kid-selector.vue';

	const { t } = useI18n();
	const router = useRouter();
	const localePath = useLocalePath();
	const basketStore = useBasketStore();
	const authStore = useAuthStore();

	const isSubmitting = ref(false);
	const error = ref<string | null>(null);

	const placeholderImage = new URL(
		'@/assets/images/placeholder-product.png',
		import.meta.url,
	).href;

	interface OrderItem {
		product_id: number | null;
		bundle_id: number | null;
		for_kid_id: number | null;
		discount: string;
		quantity: string;
		item_type: 'PRODUCT' | 'BUNDLE';
	}

	const updateKidForProduct = (productId: number, kidId: number | null) => {
		basketStore.updateKidForProduct(productId, kidId);
	};

	const submitOrder = async () => {
		if (basketStore.items.length === 0) return;
		
		isSubmitting.value = true;
		error.value = null;
		
		try {
			const orderItems: OrderItem[] = basketStore.items.map(item => ({
				product_id: item.type === 'PRODUCT' ? item.id : null,
				bundle_id: item.type === 'BUNDLE' ? item.id : null,
				for_kid_id: item.kid_id || null,
				discount: "0",
				quantity: item.quantity.toString(),
				item_type: item.type === 'PRODUCT' ? 'PRODUCT' : 'BUNDLE'
			}));

			const orderData = {
				order_items: orderItems,
				discount: "0"
			};

			const response = await fetch(`${BASE_URL}/client-orders/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${useAuthStore().accessToken}`
				},
				body: JSON.stringify(orderData)
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => null);
				throw new Error(errorData?.detail || `HTTP error! status: ${response.status}`);
			}

			// Clear basket after successful order
			basketStore.clearBasket();
			
			// Redirect to success page
			await router.push(localePath('/purchase-confirmation'));
		} catch (err) {
			console.error('Failed to submit order:', err);
			error.value = err instanceof Error ? err.message : t('checkout.orderError');
		} finally {
			isSubmitting.value = false;
		}
	};

	const handleImageError = (event: Event) => {
		const img = event.target as HTMLImageElement;
		img.src = placeholderImage;
	};
</script>
