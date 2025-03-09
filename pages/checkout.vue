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
							class="w-16 h-16 object-cover rounded-lg"
							@error="handleImageError"
						>
						<div class="flex-grow">
							<h3 class="font-semibold">{{ item.name }}</h3>
							<p class="text-sm text-gray-600">
								{{ item.quantity }} × {{ item.price }}тг
							</p>
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

			<!-- Customer Information -->
			<div class="bg-white rounded-lg shadow p-6">
				<h2 class="text-lg font-semibold mb-4">
					{{ t('checkout.customerInfo') }}
				</h2>
				<form @submit.prevent="submitOrder" class="space-y-4">
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">
							{{ t('checkout.name') }}
						</label>
						<input
							v-model="customerInfo.name"
							type="text"
							required
							class="w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500"
						>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">
							{{ t('checkout.phone') }}
						</label>
						<input
							v-model="customerInfo.phone"
							type="tel"
							required
							class="w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500"
						>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">
							{{ t('checkout.address') }}
						</label>
						<textarea
							v-model="customerInfo.address"
							required
							rows="3"
							class="w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500"
						/>
					</div>

					<button
						type="submit"
						class="w-full bg-[#128C7E] text-white py-3 rounded-lg hover:bg-[#0E7265] transition-colors"
						:disabled="isSubmitting"
					>
						{{ t('checkout.placeOrder') }}
					</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { useI18n } from 'vue-i18n';
	import { useBasketStore } from '~/stores/useBasketStore';
	import { usePurchaseStore } from '~/stores/usePurchaseStore';

	const { t } = useI18n();
	const router = useRouter();
	const localePath = useLocalePath();
	const basketStore = useBasketStore();
	const purchaseStore = usePurchaseStore();

	const placeholderImage = new URL(
		'@/assets/images/placeholder-product.png',
		import.meta.url,
	).href;

	const customerInfo = ref({
		name: '',
		phone: '',
		address: '',
	});

	const isSubmitting = ref(false);

	const submitOrder = async () => {
		if (basketStore.items.length === 0) return;

		isSubmitting.value = true;

		try {
			const purchase = {
				items: basketStore.items.map((item) => ({
					product: item,
					quantity: item.quantity,
				})),
				totalAmount: basketStore.totalPrice,
				customerName: customerInfo.value.name,
				phoneNumber: customerInfo.value.phone,
				address: customerInfo.value.address,
				createdAt: new Date(),
			};

			purchaseStore.createPurchase(purchase);
			basketStore.clearBasket();

			// Redirect to purchase confirmation page
			await router.push(localePath('/purchase-confirmation'));
		} catch (error) {
			console.error('Failed to submit order:', error);
			// Handle error
		} finally {
			isSubmitting.value = false;
		}
	};

	const handleImageError = (event: Event) => {
		const img = event.target as HTMLImageElement;
		img.src = placeholderImage;
	};
</script>
