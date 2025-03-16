export interface ServiceProvider {
  id: number;
  full_name: string;
  profile_photo: string | null;
  phone_number: string;
  email: string;
  social_networks: string;
  resume: string | null;
  is_active: boolean;
  avg_rating: number | null;
  rating_from_user: number | null;
  rating_count: number;
}

export interface Service {
  id: number;
  title: string;
  category_id: number;
  category_name: string;
  service_provider: ServiceProvider;
  service_type?: string;
  details?: string;
  address?: string;
  price: string;
  payment_period?: string;
}

export interface ServiceRating {
  rating: number;
  comment?: string;
} 