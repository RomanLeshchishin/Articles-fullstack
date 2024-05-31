import {Role} from "../roles/roles.model";

export interface IUserTable {
	no: string,
	name: string,
	email: string,
	roles: Role[],
	application?: string
}
