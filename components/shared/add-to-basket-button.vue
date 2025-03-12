<template>
	<div class="flex items-center h-12" @click.prevent.stop>
		<template v-if="quantity > 0">
			<!-- Delete Button (only shown when quantity > 1) -->
			<button
				v-if="quantity > 1"
				class="h-full px-3 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors text-xl font-medium mr-2"
				@click.prevent.stop="removeItem"
			>
				×
			</button>
			<!-- Quantity Controls -->
			<button
				class="h-full px-4 border-2 border-[#128C7E] text-[#128C7E] rounded-l-lg hover:bg-[#128C7E] hover:text-white transition-colors text-xl font-medium"
				@click.prevent.stop="decreaseQuantity"
			>
				-
			</button>
			<div class="flex flex-col items-center border-y-2 border-[#128C7E] bg-white">
				<span class="h-6 min-w-[48px] px-auto flex items-center justify-center text-xl text-[#128C7E]">
					{{ quantity }}
				</span>
				<span class="text-xs text-gray-600 pb-1">
					{{ totalPrice }}тг
				</span>
			</div>
			<button
				class="h-full px-4 border-2 border-[#128C7E] text-[#128C7E] rounded-r-lg hover:bg-[#128C7E] hover:text-white transition-colors text-xl font-medium"
				@click.prevent.stop="increaseQuantity"
			>
				+
			</button>
		</template>
		<button
			v-else
			class="group h-full aspect-square rounded-lg border-2 border-[#128C7E] text-[#128C7E] hover:bg-[#128C7E] transition-colors flex items-center justify-center relative"
			@click.prevent.stop="addToBasket"
		>
			<!-- Basket Icon (shown by default) -->
			<img
				src="~/assets/icons/basket.svg"
				alt="Add to basket"
				class="w-7 h-7 transition-opacity group-hover:opacity-0 absolute"
			>
			<!-- Plus Icon (shown on hover) -->
			<span class="group-hover:text-white text-3xl font-medium opacity-0 group-hover:opacity-100 transition-opacity absolute">
				+
			</span>
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

	const totalPrice = computed(() => {
		return (parseFloat(props.product.price) * quantity.value).toFixed(0);
	});

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

	const removeItem = () => {
		basketStore.removeItem(props.product.id);
	};
</script>

<style scoped>
button:hover img {
	filter: invert(1);
}
</style>
