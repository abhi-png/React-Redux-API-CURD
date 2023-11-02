import { configureStore } from "@reduxjs/toolkit";
import userDetails from "./apislice/userDetailsSlice";

export const store = configureStore({
    reducer: {
        user: userDetails,
    }
});