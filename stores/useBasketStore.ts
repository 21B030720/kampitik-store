import { defineStore } from 'pinia';
import type { Product } from '~/types/product';

interface BasketItem extends Product {
	quantity: number;
	type: 'PRODUCT' | 'BUNDLE';
}

export const useBasketStore = defineStore('basket', {
	state: () => ({
		items: [] as BasketItem[],
	}),

	getters: {
		itemCount: (state) =>
			state.items.reduce((sum, item) => sum + item.quantity, 0),

		totalPrice: (state) => {
			return state.items
				.reduce(
					(total, item) => total + parseFloat(item.price) * item.quantity,
					0,
				)
				.toFixed(2);
		},

		getItemQuantity: (state) => (productId: number) => {
			const item = state.items.find((item) => item.id === productId);
			return item?.quantity || 0;
		},
	},

	actions: {
		addItem(product: Product) {
			const existingItem = this.items.find((item) => item.id === product.id);

			if (existingItem) {
				existingItem.quantity++;
			} else {
				this.items.push({ ...product, quantity: 1, type: 'PRODUCT' });
			}
		},

		removeItem(productId: number) {
			const index = this.items.findIndex((item) => item.id === productId);
			if (index > -1) {
				this.items.splice(index, 1);
			}
		},

		updateQuantity(productId: number, quantity: number) {
			const item = this.items.find((item) => item.id === productId);
			if (item) {
				item.quantity = quantity;
			}
		},

		clearBasket() {
			this.items = [];
		},
	},

	persist: true,
});
