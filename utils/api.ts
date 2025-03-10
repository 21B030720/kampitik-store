import { useAuthStore } from '~/stores/useAuthStore';

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
	const authStore = useAuthStore();
	
	if (!authStore.accessToken) {
		throw new Error('No authentication token');
	}

	const headers = {
		...options.headers,
		'Authorization': `Bearer ${authStore.accessToken}`,
	};

	const response = await fetch(url, {
		...options,
		headers,
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return response;
}; 