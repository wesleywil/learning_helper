import { Topic } from "@/utils/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface TopicState {
  topics: Topic[];
  topic: Topic;
  status: string;
  error: string;
}

const initialState: TopicState = {
  topics: [],
  topic: {} as Topic,
  status: "idle",
  error: "",
};

export const fetchTopics = createAsyncThunk("topics/fetchTopics", async () => {
  const res = await fetch("http://localhost:3000/api/topics");
  if (!res.ok) {
    throw new Error("Failed to fetch topics");
  }
  const topics: Topic[] = await res.json();
  return topics;
});

export const createTopic = createAsyncThunk(
  "topics/createTopic",
  async (data: Topic) => {
    const res = await fetch("http://localhost:3000/api/topics", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.json();
  }
);

export const topicSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.status = "fetching";
      })
      .addCase(fetchTopics.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.topics = payload;
      })
      .addCase(fetchTopics.rejected, (state, { payload }) => {
        state.error = String(payload);
        state.status = "error";
      })
      .addCase(createTopic.pending, (state) => {
        state.status = "trying to create new topic";
      })
      .addCase(createTopic.fulfilled, (state, { payload }) => {
        state.status = "topic created successfully";
        state.topics = payload;
      })
      .addCase(createTopic.rejected, (state, { payload }) => {
        state.error = String(payload);
        state.status = "error while trying to create a topic";
      });
  },
});

export const {} = topicSlice.actions;

export default topicSlice.reducer;
