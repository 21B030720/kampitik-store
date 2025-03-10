export interface LoginCredentials {
	usernameOrEmail: string;
	password: string;
}

export interface SignupCredentials {
	username: string;
	password: string;
	phone: string;
	name: string;
	email: string;
}

export interface AuthResponse {
	refresh_token: string;
	access_token: string;
	client_id: number;
	user_id: number;
	username: string;
}

export interface User {
	id: number;           // user_id
	client_id: number;    // client_id
	username: string;
}
