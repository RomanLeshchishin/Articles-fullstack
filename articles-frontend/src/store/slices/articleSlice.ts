import {IArticle} from "../../models/IArticle.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createArticle} from "../actions/articleActions.ts";

interface ArticleState {
	isLoading: boolean,
	articles: IArticle[],
	status: number,
	error: string | unknown
}

const initialState : ArticleState = {
	isLoading: false,
	articles: [],
	status: 0,
	error: ''
}

const articleSlice = createSlice({
	name: 'article',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			createArticle.fulfilled,
			(state, action: PayloadAction<number>) => {
				state.status = action.payload;
			}
		)
	}
})

export default articleSlice.reducer
