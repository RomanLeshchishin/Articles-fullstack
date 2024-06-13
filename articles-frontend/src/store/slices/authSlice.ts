import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRoleDescription, IUser, Role} from "../../models/IUser.ts";
import {loginUser, registerUser} from "../actions/authActions.ts";
import {AuthResponse} from "../../models/AuthResponse.ts";
import {decodeToken} from "../../utils/decodeToken.ts";

interface AuthUserState {
	isLoading: boolean,
	user: IUser,
	roles: IRoleDescription[],
	error: string | unknown
}

const initialState : AuthUserState = {
    isLoading: false,
    user: {} as IUser,
		roles: [{value: Role.NOAUTH, description: 'не авторизован'}],
    error: ''
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
		builder.addCase(
			registerUser.fulfilled,
			(state, action: PayloadAction<AuthResponse>) => {
				state.isLoading = false;
				state.error = '';
				localStorage.setItem('token', action.payload.token)
				localStorage.setItem('name', action.payload.name)
				state.user = decodeToken(action.payload.token);
			}
		);

		builder.addCase(
			registerUser.pending,
			(state) => {
				state.isLoading = true;
			}
		);

		builder.addCase(
			registerUser.rejected,
			(state, action) => {
				state.isLoading = false;
				state.error = action.payload
			}
		)

		builder.addCase(
			loginUser.fulfilled,
			(state, action: PayloadAction<AuthResponse>) => {
				localStorage.setItem('token', action.payload.token)
				localStorage.setItem('name', action.payload.name)
				state.user = decodeToken(action.payload.token)
				state.roles = decodeToken(action.payload.token).roles
				state.isLoading = false;
				state.error = '';
			}
		);

		builder.addCase(
			loginUser.pending,
			(state) => {
				state.isLoading = true;
			}
		);

		builder.addCase(
			loginUser.rejected,
			(state, action) => {
				state.isLoading = false;
				state.error = action.payload
			}
		)

	}
})

export default authSlice.reducer
