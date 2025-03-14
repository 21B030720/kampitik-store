export interface Category {
	id: number;
	name: string;
	icon: string | null;
	shop_id: number;
	shop_name: string;
}

export interface PaginatedResponse<T> {
	previous: string | null;
	next: string | null;
	count: number;
	results: T[];
	page_number: number;
	per_page: number;
	total_pages: number;
}
