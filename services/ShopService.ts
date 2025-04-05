import type { Shop } from '~/types/store';
import type { Product, ProductFilterParams } from '~/types/product';
import type { Category } from '~/types/category';
import type { CommodityGroup } from '~/types/commodity-group';
import type { Bundle } from '~/types/bundle';
import type { Event } from '~/types/event';
import type { Course } from '~/types/course';
import type { Service } from '~/types/service';
import { BASE_URL } from '~/BASE_URL';
import type { MyReview, Review } from '~/types/review';
import { fetchWithAuth } from '~/utils/api';

const API_BASE_URL = BASE_URL;


interface FilterMapping {
  [key: string]: string;
}

const FILTER_MAPPINGS: Record<string, FilterMapping> = {
  products: {
    name: 'name',
    category_name: 'category_name',
    from_age: 'from_age',
    to_age: 'to_age',
    from_price: 'from_price',
    to_price: 'to_price',
    page: 'page',
    per_page: 'per_page',
    commodity_group_category_id: 'commodity_group_category_id',
    commodity_group_id: 'commodity_group_id',
    sort: 'sort'
  },
  bundles: {
    name: 'name',
    category_name: 'category_name',
    from_age: 'from_age',
    to_age: 'to_age',
    from_price: 'from_price',
    to_price: 'to_price',
    page: 'page',
    per_page: 'per_page',
    sort: 'sort'
  },
  events: {
    name: 'title',
    category_name: 'category_name',
    from_age: 'from_age',
    to_age: 'to_age',
    page: 'page',
    per_page: 'per_page',
    sort: 'sort'
  },
  courses: {
    name: 'title',
    category_name: 'category_name',
    from_age: 'from_age',
    to_age: 'to_age',
    page: 'page',
    per_page: 'per_page',
    sort: 'sort'
  },
  services: {
    name: 'title',
    category_name: 'category_name',
    page: 'page',
    per_page: 'per_page',
    sort: 'sort'
  },
  shops: {
    page: 'page',
    per_page: 'per_page'
  }
};

const createQueryParamsOfFilter = (filters: ProductFilterParams, type: keyof typeof FILTER_MAPPINGS): URLSearchParams => {
  const queryParams = new URLSearchParams();
  const mapping = FILTER_MAPPINGS[type];

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '' && mapping[key]) {
      queryParams.set(mapping[key], value.toString());
    }
  });

  return queryParams;
};

// Different filter types for different endpoints
export interface StoreFilterParams {
	city_id?: number;
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

	async getShops(filters?: StoreFilterParams): Promise<Shop[]> {
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

			const data: PaginatedResponse<Shop> = await response.json();
			return data.results;
		} catch (error) {
			console.error('Error fetching stores:', error);
			throw error;
		}
	},

	async getShopById(storeId: number): Promise<Shop> {
		try {
			const response = await fetch(`${API_BASE_URL}/shops/${storeId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
			const data: Shop = await response.json();
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

	async getCommodityGroupById(groupId: number): Promise<CommodityGroup> {
		try {
			const response = await fetch(`${API_BASE_URL}/shops/commodity-groups/${groupId}/`);
			return await response.json();
		} catch (error) {
			console.error('Error fetching commodity group:', error);
			throw error;
		}
	},

	async getCommodityGroupProducts(groupId: number): Promise<PaginatedResponse<Product>> {
		try {
			const response = await fetch(`${API_BASE_URL}/shops/commodity-groups/${groupId}/products/`);
			return await response.json();
		} catch (error) {
			console.error('Error fetching commodity group products:', error);
			throw error;
		}
	},

	async getAllProducts(filters: ProductFilterParams): Promise<PaginatedResponse<Product>> {
		try {
		  const queryParams = createQueryParamsOfFilter(filters, 'products');

			const response = await fetch(`${API_BASE_URL}/shops/products/?${queryParams}`);
			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
			return await response.json();
		} catch (error) {
			console.error('Error fetching products:', error);
			throw error;
		}
	},
	
	async getAllShops(filters: ProductFilterParams): Promise<PaginatedResponse<Shop>> {
		try {
		  const queryParams = createQueryParamsOfFilter(filters, 'shops');

			const response = await fetch(`${API_BASE_URL}/shops/?${queryParams}`);
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
	async getAllBundles(filters: ProductFilterParams): Promise<PaginatedResponse<Bundle>> {
		try {
		  const queryParams = createQueryParamsOfFilter(filters, 'bundles');

			const url = `${API_BASE_URL}/shops/bundles/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
			const response = await fetch(url);
			return await response.json();
		} catch (error) {
			console.error('Error fetching bundles:', error);
			throw error;
		}
	},

	// Activities subtypes
	async getAllEvents(filters: ProductFilterParams): Promise<PaginatedResponse<Event>> {
		try {
		  const queryParams = createQueryParamsOfFilter(filters, 'events');

			const url = `${API_BASE_URL}/activities/events/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
			const response = await fetch(url);
			return await response.json();
		} catch (error) {
			console.error('Error fetching events:', error);
			throw error;
		}
	},

	async getAllCourses(filters: ProductFilterParams): Promise<PaginatedResponse<Course>> {
		try {
			const queryParams = createQueryParamsOfFilter(filters, 'courses');

			const url = `${API_BASE_URL}/activities/courses/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
			const response = await fetch(url);
			return await response.json();
		} catch (error) {
			console.error('Error fetching courses:', error);
			throw error;
		}
	},

	// Services subtype
	async getAllServices(filters: ProductFilterParams): Promise<PaginatedResponse<Service>> {
		try {
		  const queryParams = createQueryParamsOfFilter(filters, 'courses');
	
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
			const response = await fetch(`${API_BASE_URL}/shops/products/categories`);
			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
			const data = await response.json();
			return data.results;
		} catch (error) {
			console.error('Error fetching product categories:', error);
			throw error;
		}
	},

	async getBundleCategories(): Promise<Category[]> {
		try {
			const response = await fetch(`${API_BASE_URL}/shops/bundles/categories`);
			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
			const data = await response.json();
			return data.results;
		} catch (error) {
			console.error('Error fetching bundle categories:', error);
			throw error;
		}
	},

	async getEventCategories(): Promise<Category[]> {
		try {
			const response = await fetch(`${API_BASE_URL}/activities/events/categories`);
			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
			const data = await response.json();
			return data.results;
		} catch (error) {
			console.error('Error fetching event categories:', error);
			throw error;
		}
	},

	async getCourseCategories(): Promise<Category[]> {
		try {
			const response = await fetch(`${API_BASE_URL}/activities/courses/categories`);
			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
			const data = await response.json();
			return data.results;
		} catch (error) {
			console.error('Error fetching course categories:', error);
			throw error;
		}
	},

	async getServiceCategories(): Promise<Category[]> {
		try {
			const response = await fetch(`${API_BASE_URL}/services/categories`);
			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
			const data = await response.json();
			return data.results;
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
  },

  async getShopCommodityGroupCategories(shopId: number): Promise<PaginatedResponse<Category>> {
    try {
      const response = await fetch(`${API_BASE_URL}/shops/commodity-groups/categories/?shop_id=${shopId}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching commodity group categories:', error);
      throw error;
    }
  },

  async getCommodityGroupCategoryById(categoryId: number): Promise<Category> {
    try {
      const response = await fetch(`${API_BASE_URL}/shops/commodity-groups/categories/${categoryId}/`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching commodity group category:', error);
      throw error;
    }
  },

  async getCommodityGroupsByCategory(shopId: number, categoryId: number): Promise<PaginatedResponse<CommodityGroup>> {
    try {
      const response = await fetch(`${API_BASE_URL}/shops/commodity-groups/?shop_id=${shopId}&category_id=${categoryId}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching commodity groups by category:', error);
      throw error;
    }
  },
  
  async getProductReviews(productId: number): Promise<Review[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/shops/products/${productId}/product-reviews`);
      if (!response.ok) 
      throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching product reviews ${productId}:`, error);
      throw error;
    }
  },
  
  async getBundleReviews(bundleId: number): Promise<Review[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/shops/bundles/${bundleId}/bundle-reviews`);
      if (!response.ok) 
      throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching bundle reviews ${bundleId}:`, error);
      throw error;
    }
  },
  
  async getCourseReviews(courseId: number): Promise<Review[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/activities/courses/${courseId}/courses-reviews`);
      if (!response.ok) 
      throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching course reviews ${courseId}:`, error);
      throw error;
    }
  },
  
  async getEventReviews(eventId: number): Promise<Review[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/activities/events/${eventId}/event-reviews`);
      if (!response.ok) 
      throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching event reviews ${eventId}:`, error);
      throw error;
    }
  },
  
  async getServiceReviews(serviceId: number): Promise<Review[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/services/${serviceId}/provider-reviews`);
      if (!response.ok) 
      throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching service reviews ${serviceId}:`, error);
      throw error;
    }
  },
  
  async submitProductReview(productId: number, rating: number, review: string): Promise<void> {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/shops/products/${productId}/rate-product/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating, review }),
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
      console.error('Error submitting product review:', error);
      throw error;
    }
  },
  
  async submitBundleReview(bundleId: number, rating: number, review: string): Promise<void> {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/shops/bundles/${bundleId}/rate-bundle/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating, review }),
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
      console.error('Error submitting bundle review:', error);
      throw error;
    }
  },
  
  async submitCourseReview(courseId: number, rating: number, review: string): Promise<void> {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/activities/courses/${courseId}/rate-course/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating, review }),
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
      console.error('Error submitting course review:', error);
      throw error;
    }
  },
  
  async SubmitEventReview(eventId: number, rating: number, review: string): Promise<void> {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/activities/events/${eventId}/rate-event/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating, review }),
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
      console.error('Error submitting event review:', error);
      throw error;
    }
  },
  
  async submitServiceReview(serviceId: number, rating: number, review: string): Promise<void> {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/services/${serviceId}/rate-provider/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating, review }),
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
      console.error('Error submitting service review:', error);
      throw error;
    }
  },
  
  async getMyProductReview(productId: number): Promise<MyReview | null> {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/shops/products/${productId}/my-review/`);
      return await response.json();
    } catch (error) {
      // Return null if no review exists or there's an error
      return null;
    }
  },
  
  async getMyBundleReview(bundleId: number): Promise<MyReview | null> {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/shops/bundles/${bundleId}/my-review/`);
      return await response.json();
    } catch (error) {
      // Return null if no review exists or there's an error
      return null;
    }
  },
  
  async getMyCourseReview(courseId: number): Promise<MyReview | null> {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/activities/courses/${courseId}/my-review/`);
      return await response.json();
    } catch (error) {
      // Return null if no review exists or there's an error
      return null;
    }
  },
  
  async getMyEventReview(eventId: number): Promise<MyReview | null> {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/activities/events/${eventId}/my-review/`);
      return await response.json();
    } catch (error) {
      // Return null if no review exists or there's an error
      return null;
    }
  },
  
  async getMyServiceReview(serviceId: number): Promise<MyReview | null> {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/services/${serviceId}/my-review/`);
      return await response.json();
    } catch (error) {
      // Return null if no review exists or there's an error
      return null;
    }
  },
  
  async getCommodityGroupCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/shops/commodity-groups/categories/`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching commodity group categories:', error);
      throw error;
    }
  },
  
  async getCommodityGroups(categoryId: number): Promise<CommodityGroup[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/shops/commodity-groups/?category_id=${categoryId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching commodity groups:', error);
      throw error;
    }
  },
};
