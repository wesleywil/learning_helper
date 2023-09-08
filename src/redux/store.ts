import { configureStore } from "@reduxjs/toolkit";
import topicReducer from "./topics/topics";
import utilReducer from "./utils/utils";
import sectionReducer from "./sections/sections";
import subTopicReducer from "./sub_topics/sub_topics";

export const store = configureStore({
    reducer:{
        utils:utilReducer,
        topics:topicReducer,
        subTopics:subTopicReducer,
        sections:sectionReducer,
    }
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;