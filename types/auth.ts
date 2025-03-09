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

export interface User {
	id: number;
	name: string;
	email: string;
	phone: string;
	username: string;
}
