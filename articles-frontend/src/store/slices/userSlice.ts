import {IUser} from "../../models/IUser.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addUserRole, delUserRole, editUserInfo, getUserByEmail, getUserInfo, getUsers} from "../actions/userActions.ts";
import {IUserInfo} from "../../models/IUserInfo.ts";

interface UserState {
	isLoading: boolean,
	users: IUser[],
	currentUser: IUser,
	currentUserInfo: IUserInfo,
	error: string | unknown,
	id: string
}

const initialState : UserState = {
	isLoading: false,
	users: [],
	currentUser: {} as IUser,
	currentUserInfo: {} as IUserInfo,
	error: '',
	id: ''
}

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			getUsers.fulfilled,
			(state, action: PayloadAction<IUser[]>) => {
				state.isLoading = false;
				state.error = '';
				state.users = action.payload;
			}
		);

		builder.addCase(
			getUsers.pending,
			(state) => {
				state.isLoading = true;
			}
		);

		builder.addCase(
			getUsers.rejected,
			(state, action) => {
				state.isLoading = false;
				state.error = action.payload
			}
		);

		builder.addCase(
			getUserByEmail.fulfilled,
			(state, action) => {
				state.currentUser = action.payload
			}
		);

		builder.addCase(
			addUserRole.fulfilled,
			(state, action) => {
				state.id = action.payload
			}
		);

		builder.addCase(
			delUserRole.fulfilled,
			(state, action) => {
				state.id = action.payload
			}
		)

		builder.addCase(
			getUserInfo.fulfilled,
			(state, action) => {
				state.currentUserInfo = action.payload
			}
		);

		builder.addCase(
			editUserInfo.fulfilled,
			(state, action) => {
				state.currentUserInfo = action.payload
			}
		);
	}
})

export default userSlice.reducer
