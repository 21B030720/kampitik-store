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
	from_age?: number | null;
	to_age?: number | null;
	page?: number;
	per_page?: number;
}

export interface City {
	id: number;
	name: string;
}

export interface PaginatedResponse<T> {
	results: T[];
	count: number;
	next: string | null;
	previous: string | null;
}
export interface ServiceRating {
	rating: number;
	comment?: string;
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

	async getAllProducts(filters: ProductFilterParams): Promise<PaginatedResponse<Product>> {
		try {
			const queryParams = new URLSearchParams();
			
			console.log('Sending filters to API:', filters);
			
			if (filters.name) {
				queryParams.set('name', filters.name);
			}
			if (filters.category_name) {
				queryParams.set('category_name', filters.category_name);
			}
			if (filters.from_age !== null && filters.from_age !== undefined) {
				queryParams.set('from_age', filters.from_age.toString());
			}
			if (filters.to_age !== null && filters.to_age !== undefined) {
				queryParams.set('to_age', filters.to_age.toString());
			}
			if (filters.page) {
				queryParams.set('page', filters.page.toString());
			}
			if (filters.per_page) {
				queryParams.set('per_page', filters.per_page.toString());
			}

			console.log('Final query string:', queryParams.toString());

			const response = await fetch(`${API_BASE_URL}/shops/products/?${queryParams}`);
			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
			return await response.json();
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
	async getAllBundles(filters?: ProductFilterParams): Promise<PaginatedResponse<Bundle>> {
		try {
			const queryParams = new URLSearchParams();
			
			if (filters?.name) {
				queryParams.set('name', filters.name);
			}
			if (filters?.category_name) {
				queryParams.set('category_name', filters.category_name);
			}
			if (filters?.from_age !== null && filters?.from_age !== undefined) {
				queryParams.set('from_age', filters.from_age.toString());
			}
			if (filters?.to_age !== null && filters?.to_age !== undefined) {
				queryParams.set('to_age', filters.to_age.toString());
			}
			if (filters?.page) {
				queryParams.set('page', filters.page.toString());
			}
			if (filters?.per_page) {
				queryParams.set('per_page', filters.per_page.toString());
			}

			const url = `${API_BASE_URL}/shops/bundles/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
			const response = await fetch(url);
			return await response.json();
		} catch (error) {
			console.error('Error fetching bundles:', error);
			throw error;
		}
	},

	// Activities subtypes
	async getAllEvents(filters?: ProductFilterParams): Promise<PaginatedResponse<Event>> {
		try {
			const queryParams = new URLSearchParams();
			
			if (filters?.name) {
				queryParams.set('title', filters.name);
			}
			if (filters?.category_name) {
				queryParams.set('category_name', filters.category_name);
			}
			if (filters?.from_age !== null && filters?.from_age !== undefined) {
				queryParams.set('from_age', filters.from_age.toString());
			}
			if (filters?.to_age !== null && filters?.to_age !== undefined) {
				queryParams.set('to_age', filters.to_age.toString());
			}
			if (filters?.page) {
				queryParams.set('page', filters.page.toString());
			}
			if (filters?.per_page) {
				queryParams.set('per_page', filters.per_page.toString());
			}

			const url = `${API_BASE_URL}/activities/events/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
			const response = await fetch(url);
			return await response.json();
		} catch (error) {
			console.error('Error fetching events:', error);
			throw error;
		}
	},

	async getAllCourses(filters?: ProductFilterParams): Promise<PaginatedResponse<Course>> {
		try {
			const queryParams = new URLSearchParams();
			
			if (filters?.name) {
				queryParams.set('title', filters.name);
			}
			if (filters?.category_name) {
				queryParams.set('category_name', filters.category_name);
			}
			if (filters?.from_age !== null && filters?.from_age !== undefined) {
				queryParams.set('from_age', filters.from_age.toString());
			}
			if (filters?.to_age !== null && filters?.to_age !== undefined) {
				queryParams.set('to_age', filters.to_age.toString());
			}
			if (filters?.page) {
				queryParams.set('page', filters.page.toString());
			}
			if (filters?.per_page) {
				queryParams.set('per_page', filters.per_page.toString());
			}

			const url = `${API_BASE_URL}/activities/courses/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
			const response = await fetch(url);
			return await response.json();
		} catch (error) {
			console.error('Error fetching courses:', error);
			throw error;
		}
	},

	// Services subtype
	async getAllServices(filters?: ProductFilterParams): Promise<PaginatedResponse<Service>> {
		try {
		  const queryParams = new URLSearchParams();
		  
		  if (filters?.name) {
			queryParams.set('title', filters.name);
		  }
		  if (filters?.category_name) {
			queryParams.set('category_name', filters.category_name);
		  }
		  if (filters?.page) {
			queryParams.set('page', filters.page.toString());
		  }
		  if (filters?.per_page) {
			queryParams.set('per_page', filters.per_page.toString());
		  }
	
		  const url = `${API_BASE_URL}/services/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
		  const response = await fetch(url);
		  return await response.json();
		} catch (error) {
		  console.error('Error fetching services:', error);
		  throw error;
		}
	  },

	async getProductCategories(): Promise<Category[]> {
		try {
			const response = await fetch(`${API_BASE_URL}/activities/products/categories/all`);
			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching product categories:', error);
			throw error;
		}
	},

	async getBundleCategories(): Promise<Category[]> {
		try {
			const response = await fetch(`${API_BASE_URL}/shops/bundles/categories/all`);
			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching bundle categories:', error);
			throw error;
		}
	},

	async getEventCategories(): Promise<Category[]> {
		try {
			const response = await fetch(`${API_BASE_URL}/activities/events/categories/all`);
			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching event categories:', error);
			throw error;
		}
	},

	async getCourseCategories(): Promise<Category[]> {
		try {
			const response = await fetch(`${API_BASE_URL}/activities/courses/categories/all`);
			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching course categories:', error);
			throw error;
		}
	},

	async getServiceCategories(): Promise<Category[]> {
		try {
			const response = await fetch(`${API_BASE_URL}/services/categories/all`);
			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching service categories:', error);
      throw error;
    }
  },

  // Bundle details
  async getBundleById(id: number): Promise<Bundle> {
    try {
      const response = await fetch(`${API_BASE_URL}/shops/bundles/${id}/`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching bundle ${id}:`, error);
      throw error;
    }
  },

  async getBundleProducts(id: number): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/shops/bundles/${id}/products/`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching bundle products ${id}:`, error);
      throw error;
    }
  },

  // Event details
  async getEventById(id: number): Promise<Event> {
    try {
      const response = await fetch(`${API_BASE_URL}/activities/events/${id}/`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching event ${id}:`, error);
      throw error;
    }
  },

  // Course details
  async getCourseById(id: number): Promise<Course> {
    try {
      const response = await fetch(`${API_BASE_URL}/activities/courses/${id}/`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching course ${id}:`, error);
      throw error;
    }
  },

  

  async getServiceById(id: number): Promise<Service> {
    try {
      const response = await fetch(`${API_BASE_URL}/services/${id}/`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching service ${id}:`, error);
      throw error;
    }
  },

  async rateServiceProvider(serviceId: number, rating: ServiceRating): Promise<void> {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/services/${serviceId}/rate-provider/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rating),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
      console.error('Error rating service provider:', error);
      throw error;
    }
  }
};
