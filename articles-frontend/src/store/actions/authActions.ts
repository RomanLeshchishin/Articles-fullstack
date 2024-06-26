import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {AuthData, AuthResponse} from "../../models/AuthResponse.ts";

export const registerUser = createAsyncThunk(
	'auth/register',
	async (userData: AuthData, thunkApi) => {
		try {
			const response = await axios.post<AuthResponse>('http://localhost:5000/auth/register', {
				name: userData.name,
				email: userData.email,
				password: userData.password
			})
			return response.data
		} catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	}
)

export const loginUser = createAsyncThunk(
	'auth/login',
	async (userData: AuthData, thunkApi) => {
		try {
			const response = await axios.post<AuthResponse>('http://localhost:5000/auth/login', {
				email: userData.email,
				password: userData.password
			})
			return response.data
		} catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	}
)
