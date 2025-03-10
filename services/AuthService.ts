import { BASE_URL } from '~/BASE_URL';
import type { LoginCredentials, SignupCredentials, User } from '~/types/auth';

const API_BASE_URL = BASE_URL;

export const AuthService = {
	async login(credentials: LoginCredentials) {
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

			const data = await response.json();
			return data.user as User;
		} catch (error) {
			console.error('Login error:', error);
			throw error;
		}
	},

	async signup(credentials: SignupCredentials) {
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

			const data = await response.json();
			return data.user as User;
		} catch (error) {
			console.error('Signup error:', error);
			throw error;
		}
	},
};
