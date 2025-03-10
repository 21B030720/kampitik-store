import { BASE_URL } from '~/BASE_URL';
import type { LoginCredentials, SignupCredentials, AuthResponse } from '~/types/auth';

const API_BASE_URL = BASE_URL;

export const AuthService = {
	async login(credentials: LoginCredentials): Promise<AuthResponse> {
		try {
			const response = await fetch(`${API_BASE_URL}/users/client/sign-in/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username_or_email: credentials.usernameOrEmail,
					password: credentials.password,
				}),
			});

			if (!response.ok) {
				throw new Error('Login failed');
			}

			return await response.json();
		} catch (error) {
			console.error('Login error:', error);
			throw error;
		}
	},

	async signup(credentials: SignupCredentials): Promise<AuthResponse> {
		try {
			const response = await fetch(`${API_BASE_URL}/users/client/sign-up/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: credentials.username,
					password: credentials.password,
					phone_number: credentials.phone,
					name: credentials.name,
					email: credentials.email,
				}),
			});

			if (!response.ok) {
				throw new Error('Signup failed');
			}

			return await response.json();
		} catch (error) {
			console.error('Signup error:', error);
			throw error;
		}
	},
};
