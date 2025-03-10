import type { Store } from '~/types/store';
import type { Product } from '~/types/product';
import type { Category } from '~/types/category';
import type { CommodityGroup } from '~/types/commodity-group';
import type { Bundle } from '~/types/bundle';
import { BASE_URL } from '~/BASE_URL';

const API_BASE_URL = BASE_URL;

interface PaginatedResponse<T> {
	previous: string | null;
	next: string | null;
	count: number;
	results: T[];
	page_number: number;
	per_page: number;
	total_pages: number;
}

export const ShopService = {
	async getShops(): Promise<Store[]> {
		try {
			const response = await fetch(`${API_BASE_URL}/shops`);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data: PaginatedResponse<Store> = await response.json();
			return data.results;
		} catch (error) {
			console.error('Error fetching shops:', error);
			throw error;
		}
	},

	async getShopById(storeId: number): Promise<Store> {
		try {
			const response = await fetch(`${API_BASE_URL}/shops/${storeId}`);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data: Store = await response.json();
			return data;
		} catch (error) {
			console.error(`Error fetching shop with id ${storeId}:`, error);
			throw error;
		}
	},

	async getShopProducts(shopId: number): Promise<Product[]> {
		try {
			const response = await fetch(
				`${API_BASE_URL}/shops/products/?shop_id=${shopId}`,
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data: PaginatedResponse<Product> = await response.json();
			return data.results;
		} catch (error) {
			console.error(`Error fetching products for shop ${shopId}:`, error);
			throw error;
		}
	},

	async getShopCategories(shopId: number): Promise<Category[]> {
		try {
			const response = await fetch(
				`${API_BASE_URL}/shops/products/categories/?shop_id=${shopId}`,
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data: PaginatedResponse<Category> = await response.json();
			return data.results;
		} catch (error) {
			console.error(`Error fetching categories for shop ${shopId}:`, error);
			throw error;
		}
	},

	async getShopCommodityGroups(shopId: number): Promise<CommodityGroup[]> {
		try {
			const response = await fetch(
				`${API_BASE_URL}/shops/commodity-groups/?shop_id=${shopId}`,
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data: PaginatedResponse<CommodityGroup> = await response.json();
			return data.results;
		} catch (error) {
			console.error(
				`Error fetching commodity groups for shop ${shopId}:`,
				error,
			);
			throw error;
		}
	},

	async getShopBundles(shopId: number): Promise<Bundle[]> {
		try {
			const response = await fetch(
				`${API_BASE_URL}/shops/bundles/?shop_id=${shopId}`,
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data: PaginatedResponse<Bundle> = await response.json();
			return data.results;
		} catch (error) {
			console.error(`Error fetching bundles for shop ${shopId}:`, error);
			throw error;
		}
	},

	async getCommodityGroupById(id: number): Promise<CommodityGroup> {
		try {
			const response = await fetch(
				`${API_BASE_URL}/shops/commodity-groups/${id}/`,
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data: CommodityGroup = await response.json();
			return data;
		} catch (error) {
			console.error(`Error fetching commodity group with id ${id}:`, error);
			throw error;
		}
	},

	async getAllProducts(): Promise<Product[]> {
		try {
			const response = await fetch(`${API_BASE_URL}/shops/products/`);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data: PaginatedResponse<Product> = await response.json();
			return data.results;
		} catch (error) {
			console.error('Error fetching products:', error);
			throw error;
		}
	},

	async getProductById(productId: number): Promise<Product> {
		try {
			const response = await fetch(
				`${API_BASE_URL}/shops/products/${productId}/`,
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data: Product = await response.json();
			return data;
		} catch (error) {
			console.error(`Error fetching product ${productId}:`, error);
			throw error;
		}
	},
};
