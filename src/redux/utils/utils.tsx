import { createSlice } from "@reduxjs/toolkit";

export interface UtilState {
  hide_sub_topics_container: boolean;
  hide_topic_form: boolean;
  hide_sub_topic_form: boolean;
}

const initialState: UtilState = {
  hide_sub_topics_container: true,
  hide_topic_form: true,
  hide_sub_topic_form: true,
};

export const utilSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    handleHideSubTopicsContainer: (state) => {
      state.hide_sub_topics_container = !state.hide_sub_topics_container;
    },
    handleHideTopicForm: (state) => {
      state.hide_topic_form = !state.hide_topic_form;
    },
    handleHideSubTopicForm: (state) => {
      state.hide_sub_topic_form = !state.hide_sub_topic_form;
    },
  },
});

export const {
  handleHideSubTopicsContainer,
  handleHideTopicForm,
  handleHideSubTopicForm,
} = utilSlice.actions;

export default utilSlice.reducer;
