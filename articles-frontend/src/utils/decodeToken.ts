import {AuthResponse} from "../models/AuthResponse.ts";
import {IToken} from "../models/IToken.ts";
import {jwtDecode} from "jwt-decode";
import {IUser} from "../models/IUser.ts";

export const decodeToken = (response: AuthResponse) : IUser => {
	const decode:IToken = jwtDecode(response.token)
	return {id: decode.id, email: decode.email, roles: decode.roles, name: response.name}
}
