export interface Event {
    id: number;
    title: string;
    category_id: number;
    category_name: string;
    image: string | null;
    description: string;
    price: string;
    tickets_left: number;
    organizator: string;
    contacts: string;
    social_networks: string | null;
    location: string;
    two_gis_link: string;
    date_held: string;
    from_age: number;
    to_age: number;
    avg_rating: number | null;
} 