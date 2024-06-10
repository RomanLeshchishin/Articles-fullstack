import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {IArticle} from "../../models/IArticle.ts";

export const createArticle = createAsyncThunk(
	'article/createArticle',
	async (article: IArticle, thunkApi) => {
		try {
			const response = await axios.post<number>('http://localhost:5000/article', article)
			return response.status
		}
		catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	}
)
