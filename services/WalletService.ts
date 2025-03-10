import { BASE_URL } from '~/BASE_URL';
import type { Wallet } from '~/types/wallet';
import { fetchWithAuth } from '~/utils/api';

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
	}
}; 