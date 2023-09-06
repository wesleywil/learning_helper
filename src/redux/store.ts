import { configureStore } from "@reduxjs/toolkit";
import topicReducer from "./topics/topics";
import utilReducer from "./utils/utils";

export const store = configureStore({
    reducer:{
        utils:utilReducer,
        topics:topicReducer,
    }
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;