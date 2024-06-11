import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {IArticle, IArticleWithId} from "../../models/IArticle.ts";

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

export const getCheckedArticles = createAsyncThunk(
	'article/getCheckedArticles',
	async (option: string, thunkApi) => {
		try {
			const response = await axios.get<IArticleWithId[]>(`http://localhost:5000/article/checked/${option}`)
			return response.data
		}
		catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	}
)
