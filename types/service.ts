export interface Service {
    id: number;
    name: string;
    description: string | null;
    image: string | null;
    price: string;
    shop_id: number;
    shop_name: string;
    // Add any other fields that come from the API
    duration?: string;
    category?: string;
} 