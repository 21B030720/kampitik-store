export interface Review {
  id: number;
  client_name: string;
  rating: number;
  review: string;
  status: string;
  created_at: string;
  changed_at: string;
}

export interface MyReview {
  id: number;
  client_id: number;
  client_name: string;
  rating: number;
  review: string;
  status: string;
  created_at: string;
  changed_at: string;
}