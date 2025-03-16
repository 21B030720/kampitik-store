interface NutritionCharacteristics {
	nutritional_value: number;
	fats: number;
	proteins: number;
	carbohydrates: number;
}

export interface Product {
	id: number;
	name: string;
	image: string | null;
	description: string;
	rating: number | null;
	category_id: number;
	category_name: string;
	nutrition_characteristics: NutritionCharacteristics;
	from_age: number;
	to_age: number;
	price: string;
	measure: string;
	shop_id: number;
	shop_name: string;
	commodity_group: number | null;
}

export interface ProductFilterParams {
	name?: string;
	category_name?: string;
	from_age?: number | null;
	to_age?: number | null;
	page?: number;
	per_page?: number;
}
