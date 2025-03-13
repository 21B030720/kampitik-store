export interface Event {
    id: number;
    name: string;
    description: string | null;
    image: string | null;
    price: string;
    shop_id: number;
    shop_name: string;
    // Add any other fields that come from the API
    start_date?: string;
    end_date?: string;
    location?: string;
} 