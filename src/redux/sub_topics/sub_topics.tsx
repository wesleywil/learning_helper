import { SubTopic } from "@/utils/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface SubTopicState {
  subtopics: SubTopic[];
  subtopic: SubTopic;
  status: string;
  error: string;
}

const initialState: SubTopicState = {
  subtopics: [],
  subtopic: {} as SubTopic,
  status: "idle",
  error: "",
};

export const createSubTopic = createAsyncThunk(
  "subTopics/createSubTopic",
  async (data: SubTopic) => {
    const res = await fetch("http://localhost:3000/api/sub_topics", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.json();
  }
);

export const subTopicSlice = createSlice({
  name: "subTopics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSubTopic.pending, (state) => {
        state.status = "trying to create new sub-topic";
      })
      .addCase(createSubTopic.fulfilled, (state, { payload }) => {
        state.status = "sub-topic created successfully";
      })
      .addCase(createSubTopic.rejected, (state, { payload }) => {
        state.error = String(payload);
        state.status = "error while trying to create a sub-topic";
      });
  },
});

export const {} = subTopicSlice.actions;

export default subTopicSlice.reducer;
