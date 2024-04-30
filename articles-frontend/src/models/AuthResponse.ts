export type AuthData = {
	name?: string,
	email: string,
	password: string
}

export type AuthResponse = {
	token: string,
	name: string
}
