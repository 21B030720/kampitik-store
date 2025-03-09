import { defineStore } from 'pinia';
import type { Product } from '~/types/product';

interface PurchaseItem {
	product: Product;
	quantity: number;
}

interface Purchase {
	items: PurchaseItem[];
	totalAmount: string;
	customerName: string;
	phoneNumber: string;
	address: string;
	createdAt: Date;
}

export const usePurchaseStore = defineStore('purchase', {
	state: () => ({
		purchases: [] as Purchase[],
		currentPurchase: null as Purchase | null,
	}),

	actions: {
		createPurchase(purchase: Purchase) {
			this.purchases.push(purchase);
			this.currentPurchase = purchase;
		},

		clearCurrentPurchase() {
			this.currentPurchase = null;
		},
	},

	persist: true,
});
