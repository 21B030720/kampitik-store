import { BASE_URL } from '~/BASE_URL';
import type { ClientDetails, ClientOrder } from '~/types/client';
import { fetchWithAuth } from '~/utils/api';

const API_BASE_URL = BASE_URL;

export const ClientService = {
	async getClientDetails(clientId: number): Promise<ClientDetails> {
		try {
			const response = await fetchWithAuth(`${API_BASE_URL}/users/client/${clientId}/`);
			return await response.json();
		} catch (error) {
			console.error('Error fetching client details:', error);
			throw error;
		}
	},
	
	async getClientOrders(): Promise<{ results: ClientOrder[] }> {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/client-orders/`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching client orders:', error);
      throw error;
    }
  },
  
  async getClientOrderDetails(orderId: string): Promise<ClientOrder> {
      try {
        const response = await fetchWithAuth(`${API_BASE_URL}/client-orders/${orderId}`);
        return await response.json();
      } catch (error) {
        console.error('Error fetching client order details:', error);
        throw error;
      }
    }
}; 