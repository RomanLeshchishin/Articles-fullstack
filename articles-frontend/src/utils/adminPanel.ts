import {Role} from "../models/IUser.ts";

export const getRoleColor = (role: string) => {
	switch (role){
		case Role.USER:
			return 'green'
		case Role.AUTHOR:
			return 'geekblue'
		case Role.ADMIN:
			return 'red'
	}
}
