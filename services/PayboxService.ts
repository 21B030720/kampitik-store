import { BASE_URL } from '~/BASE_URL';
import { fetchWithAuth } from '~/utils/api';

interface SavedCard {
	id: number;
	card_hash: string;
	card_month: string;
	card_year: string;
	default: boolean;
}

interface CardPaymentResponse {
	message: string;
}

export const PayboxService = {
	async getSavedCards(): Promise<SavedCard[]> {
		try {
			const response = await fetchWithAuth(`${BASE_URL}/paybox/cards/all/`);
			return await response.json();
		} catch (error) {
			console.error('Error fetching saved cards:', error);
			throw error;
		}
	},

	async payWithCard(transactionId: string, cardId: number): Promise<CardPaymentResponse> {
		try {
			const response = await fetchWithAuth(`${BASE_URL}/paybox/cards/pay-with-saved-card/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					transaction_id: transactionId,
					card_id: cardId
				}),
			});
			return await response.json();
		} catch (error) {
			console.error('Error processing card payment:', error);
			throw error;
		}
	}
}; 