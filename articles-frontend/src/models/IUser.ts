export enum Role {
	USER = "USER",
	AUTHOR = "AUTHOR",
	ADMIN = "ADMIN"
}

export interface IRoleDescription {
	value: Role,
	description: string
}

export interface IUser {
	id: number,
	name: string,
	email: string,
	roles: IRoleDescription[],
	additionalInfo?: string
}
