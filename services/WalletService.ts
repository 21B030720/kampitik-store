import { BASE_URL } from '~/BASE_URL';
import type { Wallet, Transaction, TransactionHistory } from '~/types/wallet';
import { fetchWithAuth } from '~/utils/api';

interface TopUpResponse {
	id: string;
}

interface InitPaymentResponse {
	message: string;
}

const API_BASE_URL = BASE_URL;

export const WalletService = {
	async getMyWallet(): Promise<Wallet> {
		try {
			const response = await fetchWithAuth(`${API_BASE_URL}/wallets/my/`);
			return await response.json();
		} catch (error) {
			console.error('Error fetching wallet:', error);
			throw error;
		}
	},

	async replenishBalance(amount: number): Promise<TopUpResponse> {
		try {
			const response = await fetchWithAuth(`${API_BASE_URL}/wallets/top-up/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ amount }),
			});
			return await response.json();
		} catch (error) {
			console.error('Error replenishing balance:', error);
			throw error;
		}
	},

	async initPayment(transactionId: string): Promise<InitPaymentResponse> {
		try {
			const response = await fetchWithAuth(`${API_BASE_URL}/paybox/payment/init-payment/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ transaction_id: transactionId }),
			});
			return await response.json();
		} catch (error) {
			console.error('Error initializing payment:', error);
			throw error;
		}
	},
	
	async getTransactionHistory(): Promise<TransactionHistory> {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/wallets/transactions-history/`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      throw error;
    }
  }
}; 