import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {IUser} from "../../models/IUser.ts";
import {IUserInfo} from "../../models/IUserInfo.ts";

export const getUsers = createAsyncThunk(
	'users/getUsers',
	async (_, thunkApi) => {
		try {
			const response = await axios.get<IUser[]>('http://localhost:5000/users')
			return response.data
		}
		catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	}
)

export const getUserByEmail = createAsyncThunk(
	'users/getUserByEmail',
	async (email: string, thunkApi) => {
		try {
			const response = await axios.get<IUser>(`http://localhost:5000/users/${email}`)
			return response.data
		}
		catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	}
)

export const addUserRole = createAsyncThunk(
	'users/addUserRole',
	async (options: {id: string, value: string}, thunkApi) => {
		try {
			const response = await axios.put('http://localhost:5000/users', options, {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				}
			})
			return response.data
		}
		catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	}
)

export const delUserRole = createAsyncThunk(
	'users/delUserRole',
	async (id: string, thunkApi) => {
		try {
			const response = await axios.put('http://localhost:5000/users/del', {id: id}, {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			})
			return response.data
		}
		catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	}
)

export const getUserInfo = createAsyncThunk(
	'users/userInfo',
	async (id: number, thunkAPI) => {
		try {
			const response = await axios.get(`http://localhost:5000/users-inf/${id}`, {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			})
			return response.data
		}
		catch (e) {
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const editUserInfo = createAsyncThunk(
	'users/editUserInfo',
	async (userInfo: IUserInfo, thunkAPI) => {
		try {
			const response = await axios.put('http://localhost:5000/users-inf', userInfo, {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			})
			return response.data
		}
		catch (e) {
			return thunkAPI.rejectWithValue(e)
		}
	}
)
