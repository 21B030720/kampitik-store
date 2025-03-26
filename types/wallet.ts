export interface Wallet {
	id: number;
	client_user_name: string;
	balance: string;
} 

export interface Transaction {
  id: number;
  amount: number;
  wallet: number;
  transaction_type: string;
  status: 'finished' | 'pending' | 'canceled';
  created_at: string;
}

export interface TransactionHistory {
  results: Transaction[];
  count: number;
}