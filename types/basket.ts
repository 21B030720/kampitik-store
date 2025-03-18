export interface BasketItem {
  id: number;
  name: string;
  price: string;
  image: string | null;
  quantity: number;
  type: 'PRODUCT' | 'BUNDLE';
  kid_id?: number | null;
} 