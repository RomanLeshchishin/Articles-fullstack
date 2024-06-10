import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createApplication, getApplications} from "../actions/applicationActions.ts";
import {IApplicationWithFileId} from "../../models/IApplication.ts";

interface ApplicationState {
	isLoading: boolean,
	applications: IApplicationWithFileId[],
	status: number,
	error: string | unknown
}

const initialState : ApplicationState = {
	isLoading: false,
	applications: [],
	status: 0,
	error: ''
}

const applicationSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			getApplications.fulfilled,
			(state, action: PayloadAction<IApplicationWithFileId[]>) => {
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
		);

		builder.addCase(
			createApplication.fulfilled,
			(state, action: PayloadAction<number>) => {
				state.status = action.payload;
			}
		)
	}
})

export default applicationSlice.reducer
