import {IToken} from "../models/IToken.ts";
import {jwtDecode} from "jwt-decode";
import {IUser} from "../models/IUser.ts";

export const decodeToken = (response: string) : IUser => {
	const decode:IToken = jwtDecode(response)
	return {id: decode.id, email: decode.email, roles: decode.roles, name: localStorage.getItem('name') || ''};
}
