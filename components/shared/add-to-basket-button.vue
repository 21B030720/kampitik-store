<template>
	<div class="flex items-center gap-2" @click.prevent.stop>
		<template v-if="quantity > 0">
			<button
				class="p-2 bg-[#128C7E] text-white rounded-l-lg hover:bg-[#0E7265] transition-colors"
				@click.prevent.stop="decreaseQuantity"
			>
				-
			</button>
			<span class="w-8 text-center">{{ quantity }}</span>
			<button
				class="p-2 bg-[#128C7E] text-white rounded-r-lg hover:bg-[#0E7265] transition-colors"
				@click.prevent.stop="increaseQuantity"
			>
				+
			</button>
		</template>
		<button
			v-else
			class="w-full bg-[#128C7E] text-white py-3 px-6 rounded-lg hover:bg-[#0E7265] transition-colors flex items-center justify-center gap-2"
			@click.prevent.stop="addToBasket"
		>
			<img
				src="~/assets/icons/basket.svg"
				alt="Add to basket"
				class="w-6 h-6 invert"
			>
			<span>{{ t('product.addToBasket') }}</span>
		</button>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import { useI18n } from 'vue-i18n';
	import { useBasketStore } from '~/stores/useBasketStore';
	import type { Product } from '~/types/product';

	const props = defineProps<{
		product: Product;
	}>();

	const { t } = useI18n();
	const basketStore = useBasketStore();

	const quantity = computed(() =>
		basketStore.getItemQuantity(props.product.id),
	);

	const addToBasket = () => {
		basketStore.addItem(props.product);
	};

	const increaseQuantity = () => {
		basketStore.updateQuantity(props.product.id, quantity.value + 1);
	};

	const decreaseQuantity = () => {
		if (quantity.value > 1) {
			basketStore.updateQuantity(props.product.id, quantity.value - 1);
		} else {
			basketStore.removeItem(props.product.id);
		}
	};
</script>
