interface CoursePrice {
  id: number;
  name: string;
  description: string;
  price: string;
  payment_period: string;
}

export interface Course {
  id: number;
  title: string;
  category_id: number;
  category_name: string;
  image: string | null;
  description: string;
  company: string;
  contacts: string;
  social_networks: string | null;
  location: string;
  two_gis_link: string;
  from_age: number;
  to_age: number;
  course_prices: CoursePrice[];
  avg_rating: number | null;
} 