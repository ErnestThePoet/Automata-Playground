import { configureStore } from "@reduxjs/toolkit";
import { routerCurrentPageIndex } from "./router-reducers";

export const store = configureStore({
    reducer: {
        routerCurrentPageIndex
    }
});