import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.ts";

export default configureStore({
    reducer: {
        auth: authReducer
    }
});
