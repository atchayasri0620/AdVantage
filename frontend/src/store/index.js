import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import campaignReducer from "./slices/campaignSlice";
import analyticsReducer from "./slices/analyticsSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        campaigns: campaignReducer,
        analytics: analyticsReducer,
    },
});

export default store;