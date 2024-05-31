import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {IApplication} from "../../models/IApplication.ts";

export const getApplications = createAsyncThunk(
	'app/getApplications',
	async (_, thunkApi) => {
		try {
			const response = await axios.get<IApplication[]>('http://localhost:5000/application')
			return response.data
		}
		catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	}
)
