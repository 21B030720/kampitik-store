export interface Bundle {
	id: number;
	name: string;
	price: string;
	description: string | null;
	image: string | null;
	shop_id: number;
	shop_name: string;
	// Add any other fields that come from the API
}
