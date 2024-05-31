import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.ts";
import userReducer from "./slices/userSlice.ts";
import applicationReducer from "./slices/applicationSlice.ts";

const rootReducer = combineReducers({
	authReducer,
	userReducer,
	applicationReducer
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
