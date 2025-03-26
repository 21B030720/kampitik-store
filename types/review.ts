// export interface Review {
//   id: number;
//   client_name: string;
//   rating: number;
//   review: string;
//   status: string;
//   created_at: string;
//   changed_at: string;
// }

// export interface MyReview {
//   id: number;
//   client_id: number;
//   client_name: string;
//   rating: number;
//   review: string;
//   status: string;
//   created_at: string;
//   changed_at: string;
// }

export interface BaseReview {
  id: number;
  rating: number;
  review: string;
  status: string;
  created_at: string;
  changed_at: string;
}

export interface Review extends BaseReview {
  client_name: string;
}

export interface MyReview extends BaseReview {
  client_id: number;
  client_name: string;
}