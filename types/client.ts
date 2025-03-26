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