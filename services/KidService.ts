import { BASE_URL } from '~/BASE_URL';
import type { Kid, KidDetails } from '~/types/kid';
import { fetchWithAuth } from '~/utils/api';
import type { PaginatedResponse } from '~/types/category';

interface CreateKidData {
  name: string;
  age: number;
  details: string;
}

export const KidService = {
  async getKids(): Promise<PaginatedResponse<Kid>> {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/kids/`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching kids:', error);
      throw error;
    }
  },

  async getKidById(id: number): Promise<KidDetails> {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/kids/${id}/`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching kid details:', error);
      throw error;
    }
  },

  async createKid(data: CreateKidData): Promise<Kid> {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/kids/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating kid:', error);
      throw error;
    }
  },

  async updateKid(id: number, data: FormData): Promise<Kid> {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/kids/${id}/`, {
        method: 'PUT',
        body: data
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating kid:', error);
      throw error;
    }
  }
}; 