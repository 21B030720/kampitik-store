import { defineStore } from 'pinia';
import type { User, LoginCredentials, SignupCredentials } from '~/types/auth';
import { AuthService } from '~/services/AuthService';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: null as User | null,
		isAuthenticated: false,
	}),

	actions: {
		async login(credentials: LoginCredentials) {
			try {
				const user = await AuthService.login(credentials);
				this.user = user;
				this.isAuthenticated = true;
			} catch (error) {
				console.error('Login error:', error);
				throw error;
			}
		},

		async signup(credentials: SignupCredentials) {
			try {
				const user = await AuthService.signup(credentials);
				this.user = user;
				this.isAuthenticated = true;
			} catch (error) {
				console.error('Signup error:', error);
				throw error;
			}
		},

		logout() {
			this.user = null;
			this.isAuthenticated = false;
		},
	},

	persist: true,
});
