import type { Store } from '~/types/store';
import type { Product } from '~/types/product';
import type { Category } from '~/types/category';
import type { CommodityGroup } from '~/types/commodity-group';
import type { Bundle } from '~/types/bundle';
import type { Event } from '~/types/event';
import type { Course } from '~/types/course';
import type { Service } from '~/types/service';
import { BASE_URL } from '~/BASE_URL';

const API_BASE_URL = BASE_URL;

// Different filter types for different endpoints
export interface StoreFilterParams {
	city_id?: number;
}

export interface ProductFilterParams {
	name?: string;
	category_name?: string;
}

export interface City {
	id: number;
	name: string;
}

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
	async getCities(): Promise<City[]> {
		try {
			const response = await fetch(`${API_BASE_URL}/shops/city/all`);
			
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			console.error('Error fetching cities:', error);
			throw error;
		}
	},

	async getShops(filters?: StoreFilterParams): Promise<Store[]> {
		try {
			const params = new URLSearchParams();
			if (filters?.city_id) {
				params.append('city_id', filters.city_id.toString());
			}

			const url = `${API_BASE_URL}/shops${params.toString() ? `?${params.toString()}` : ''}`;
			const response = await fetch(url);
			
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data: PaginatedResponse<Store> = await response.json();
			return data.results;
		} catch (error) {
			console.error('Error fetching stores:', error);
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

	async getAllProducts(filters?: ProductFilterParams): Promise<Product[]> {
		try {
			const params = new URLSearchParams();
			if (filters?.name) params.append('name', filters.name);
			if (filters?.category_name) params.append('category_name', filters.category_name);

			const url = `${API_BASE_URL}/shops/products/${params.toString() ? `?${params.toString()}` : ''}`;
			const response = await fetch(url);
			
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

	// Menu subtypes
	async getAllPacks(filters?: ProductFilterParams): Promise<Bundle[]> {
		try {
			const params = new URLSearchParams();
			if (filters?.name) params.append('name', filters.name);
			if (filters?.category_name) params.append('category_name', filters.category_name);

			const url = `${API_BASE_URL}/shops/packs/${params.toString() ? `?${params.toString()}` : ''}`;
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data: PaginatedResponse<Bundle> = await response.json();
			return data.results;
		} catch (error) {
			console.error('Error fetching packs:', error);
			throw error;
		}
	},

	// Activities subtypes
	async getAllEvents(filters?: ProductFilterParams): Promise<Event[]> {
		try {
			const params = new URLSearchParams();
			if (filters?.name) params.append('name', filters.name);
			if (filters?.category_name) params.append('category_name', filters.category_name);

			const url = `${API_BASE_URL}/shops/events/${params.toString() ? `?${params.toString()}` : ''}`;
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data: PaginatedResponse<Event> = await response.json();
			return data.results;
		} catch (error) {
			console.error('Error fetching events:', error);
			throw error;
		}
	},

	async getAllCourses(filters?: ProductFilterParams): Promise<Course[]> {
		try {
			const params = new URLSearchParams();
			if (filters?.name) params.append('name', filters.name);
			if (filters?.category_name) params.append('category_name', filters.category_name);

			const url = `${API_BASE_URL}/shops/courses/${params.toString() ? `?${params.toString()}` : ''}`;
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data: PaginatedResponse<Course> = await response.json();
			return data.results;
		} catch (error) {
			console.error('Error fetching courses:', error);
			throw error;
		}
	},

	// Services subtype
	async getAllServices(filters?: ProductFilterParams): Promise<Service[]> {
		try {
			const params = new URLSearchParams();
			if (filters?.name) params.append('name', filters.name);
			if (filters?.category_name) params.append('category_name', filters.category_name);

			const url = `${API_BASE_URL}/shops/services/${params.toString() ? `?${params.toString()}` : ''}`;
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data: PaginatedResponse<Service> = await response.json();
			return data.results;
		} catch (error) {
			console.error('Error fetching services:', error);
			throw error;
		}
	},
};
