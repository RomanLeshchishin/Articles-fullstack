import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {IApplicationWithFileId} from "../../models/IApplication.ts";

export const getApplications = createAsyncThunk(
	'app/getApplications',
	async (_, thunkApi) => {
		try {
			const response = await axios.get<IApplicationWithFileId[]>('http://localhost:5000/application')
			return response.data
		}
		catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	}
)

export const createApplication = createAsyncThunk(
	'app/createApplication',
	async (application: IApplicationWithFileId, thunkApi) => {
		try {
			const response = await axios.post<number>('http://localhost:5000/application', application)
			return response.status
		}
		catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	}
)
