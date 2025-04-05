import { defineStore } from 'pinia';
import type { User, LoginCredentials, SignupCredentials, AuthResponse } from '~/types/auth';
import { AuthService } from '~/services/AuthService';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: null as User | null,
		accessToken: null as string | null,
		refreshToken: null as string | null,
		isAuthenticated: false,
	}),

	actions: {
		async login(credentials: LoginCredentials) {
			try {
				const response = await AuthService.login(credentials);
				this.setAuthData(response);
			} catch (error) {
				console.error('Login error:', error);
				throw error;
			}
		},

		async signup(credentials: SignupCredentials) {
			try {
				await AuthService.signup(credentials);
				// No need to set auth data here
			} catch (error) {
				console.error('Signup error:', error);
				throw error;
			}
		},

		setAuthData(response: AuthResponse) {
			this.user = {
				id: response.user_id,
				username: response.username,
				client_id: response.client_id
			};
			this.accessToken = response.access_token;
			this.refreshToken = response.refresh_token;
			this.isAuthenticated = true;
		},

		logout() {
			this.user = null;
			this.accessToken = null;
			this.refreshToken = null;
			this.isAuthenticated = false;
		},
	},

	persist: true,
});