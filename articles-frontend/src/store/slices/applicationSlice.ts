import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getApplications} from "../actions/applicationActions.ts";
import {IApplication} from "../../models/IApplication.ts";

interface ApplicationState {
	isLoading: boolean,
	applications: IApplication[],
	error: string | unknown
}

const initialState : ApplicationState = {
	isLoading: false,
	applications: [],
	error: '',
}

const applicationSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			getApplications.fulfilled,
			(state, action: PayloadAction<IApplication[]>) => {
				state.isLoading = false;
				state.error = '';
				state.applications = action.payload;
			}
		);

		builder.addCase(
			getApplications.pending,
			(state) => {
				state.isLoading = true;
			}
		);

		builder.addCase(
			getApplications.rejected,
			(state, action) => {
				state.isLoading = false;
				state.error = action.payload
			}
		)
	}
})

export default applicationSlice.reducer
