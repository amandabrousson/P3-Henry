import { configureStore } from "@reduxjs/toolkit";
import turnosSlice from "./reducer"

const store = configureStore({
    reducer: turnosSlice.reducer
});
export default store;