export interface Bundle {
	id: number;
	name: string;
	shop_id: number;
	shop_name: string;
	discount: string;
	price: string;
	image?: string | null;
	description?: string | null;
	category_id?: number;
	category_name?: string;
	// Add any other fields that come from the API
}
