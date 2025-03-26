import type { Bundle } from "./bundle";
import type { Product } from "./product";

export interface ClientDetails {
    id: number;
    username: string;
    name: string;
    phone_number: string;
    email: string;
    is_email_valid: boolean;
} 

export interface ClientOrder {
  id: number;
  idempotency: string;
  client_id: number;
  client_name: string;
  client_phone_number: string;
  discount: number;
  overall_price: number;
  final_price: number;
  created_at: string;
  status: 'WAITING' | 'PARTIALLY_GIVEN' | 'TOTALLY_GIVEN' | 'CANCELLED';
}

export interface OrderItem {
  id: number;
  code: string;
  for_kid_id: number;
  for_kid_name: string;
  product: Product | null;
  bundle: Bundle | null;
  discount: number;
  overall_price: number;
  final_price: number;
  quantity: number;
  status: 'WAITING' | 'PARTIALLY_GIVEN' | 'TOTALLY_GIVEN' | 'CANCELLED';
  shop_id: number;
  shop_name: string;
  item_type: string;
  created_at: string;
}