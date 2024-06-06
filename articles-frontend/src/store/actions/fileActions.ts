import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {IFile} from "../../models/IFile.ts";

export const saveFiles = createAsyncThunk(
	'file/save',
	async (fileData: FormData, thunkApi) => {
		try {
			const response = await axios.post<IFile[]>('http://localhost:5000/file', fileData)
			return response.data
		}
		catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	}
)
