import { defineStore } from 'pinia';
import type { Product } from '~/types/product';
import type { Bundle } from '~/types/bundle';
import type { BasketItem } from '~/types/basket';

export type BasketItemType = 'PRODUCT' | 'BUNDLE';


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

		getItemQuantity: (state) => (itemId: number, type: BasketItemType) => {
			const item = state.items.find(
				(item) => item.id === itemId && item.type === type
			);
			return item?.quantity || 0;
		},
	},

	actions: {
		addItem(item: Omit<BasketItem, 'quantity'>) {
			const existingItem = this.items.find(
				(i) => i.id === item.id && i.type === item.type
			);
			if (existingItem) {
				existingItem.quantity++;
			} else {
				this.items.push({ ...item, quantity: 1, kid_id: null });
			}
		},

		removeItem(itemId: number, type: BasketItemType) {
			const index = this.items.findIndex(
				(item) => item.id === itemId && item.type === type
			);
			if (index > -1) {
				this.items.splice(index, 1);
			}
		},

		updateQuantity(itemId: number, quantity: number, type: BasketItemType) {
			const item = this.items.find(
				(item) => item.id === itemId && item.type === type
			);
			if (item) {
				item.quantity = quantity;
			}
		},

		updateKidForProduct(productId: number, kidId: number | null) {
			const item = this.items.find(item => item.id === productId);
			if (item) {
				item.kid_id = kidId;
			}
		},

		clearBasket() {
			this.items = [];
		},
	},

	persist: true,
});
