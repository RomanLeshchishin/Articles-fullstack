import {IFile} from "../../models/IFile.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {saveFiles} from "../actions/fileActions.ts";

interface FileState {
	files: IFile[],
	isLoading: boolean,
	error: string | unknown
}

const initialState: FileState = {
	files: [],
	isLoading: false,
	error: ''
}

const fileSlice = createSlice({
	name: 'file',
	initialState,
	reducers:{},
	extraReducers: (builder) => {
		builder.addCase(
			saveFiles.fulfilled,
			(state, action: PayloadAction<IFile[]>) => {
				state.files = action.payload
				state.isLoading = false
			}
		)
	}
})

export default fileSlice.reducer
