export interface Store {
	id: number;
	image: string | null;
	name: string;
	address: string;
	blocked: boolean;
	open_from: string | null;
	open_until: string | null;
	rating: number;
	latitude: number | null;
	longitude: number | null;
	contacts: string | null;
	city_id: number;
	city_name: string;
	two_gis_link: string | null;
}
