import {IArticleWithId} from "../../models/IArticle.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createArticle, getArticlesById, getCheckedArticles} from "../actions/articleActions.ts";

interface ArticleState {
	isLoading: boolean,
	currentArticle: IArticleWithId | undefined,
	articles: IArticleWithId[],
	myArticles: IArticleWithId[],
	status: number,
	error: string | unknown
}

const initialState : ArticleState = {
	isLoading: false,
	currentArticle: {} as IArticleWithId,
	articles: [],
	myArticles: [],
	status: 0,
	error: ''
}

const articleSlice = createSlice({
	name: 'article',
	initialState,
	reducers: {
		getCurrentArticle: (state, action: PayloadAction<number>) => {
			state.currentArticle = state.articles.find((article) => article.id === action.payload)
				|| state.myArticles.find((article) => article.id === action.payload)
		}
	},
	extraReducers: (builder) => {
		builder.addCase(
			createArticle.fulfilled,
			(state, action: PayloadAction<number>) => {
				state.status = action.payload;
			}
		);

		builder.addCase(
			getCheckedArticles.fulfilled,
			(state, action: PayloadAction<IArticleWithId[]>) => {
				state.isLoading = false;
				state.error = '';
				state.articles = action.payload;
			}
		);

		builder.addCase(
			getCheckedArticles.pending,
			(state) => {
				state.isLoading = true;
			}
		);

		builder.addCase(
			getCheckedArticles.rejected,
			(state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			}
		);

		builder.addCase(
			getArticlesById.fulfilled,
			(state, action: PayloadAction<IArticleWithId[]>) => {
				state.isLoading = false;
				state.error = '';
				state.myArticles = action.payload;
			}
		);

		builder.addCase(
			getArticlesById.pending,
			(state) => {
				state.isLoading = true;
			}
		);

		builder.addCase(
			getArticlesById.rejected,
			(state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			}
		)
	}
})

export const { getCurrentArticle } = articleSlice.actions

export default articleSlice.reducer
