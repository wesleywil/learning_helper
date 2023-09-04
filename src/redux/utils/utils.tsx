import { createSlice } from "@reduxjs/toolkit";

export interface UtilState {
  hide_sub_topics_container: boolean;
}

const initialState: UtilState = {
  hide_sub_topics_container: true,
};

export const utilSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    handleHideSubTopicsContainer: (state) => {
      state.hide_sub_topics_container = !state.hide_sub_topics_container;
    },
  },
});

export const { handleHideSubTopicsContainer } = utilSlice.actions;

export default utilSlice.reducer;
