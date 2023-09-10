import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Topic } from "@/utils/interfaces";
import { TopicCodStatus } from "@/utils/status";

export interface TopicState {
  topics: Topic[];
  topic: Topic;
  status: TopicCodStatus;
  error: string;
}

const initialState: TopicState = {
  topics: [],
  topic: {} as Topic,
  status: TopicCodStatus.IDLE,
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
  reducers: {
    selectTopic: (state, action: PayloadAction<number>) => {
      const selectedTopic = state.topics.find(
        (item) => item.id === action.payload
      );
      state.topic = selectedTopic !== undefined ? selectedTopic : ({} as Topic);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.status = TopicCodStatus.FETCHING;
      })
      .addCase(fetchTopics.fulfilled, (state, { payload }) => {
        state.status = TopicCodStatus.FETCHED;
        state.topics = payload;
      })
      .addCase(fetchTopics.rejected, (state, { payload }) => {
        state.error = String(payload);
        state.status = TopicCodStatus.ERROR;
      })
      .addCase(createTopic.pending, (state) => {
        state.status = TopicCodStatus.CREATING;
      })
      .addCase(createTopic.fulfilled, (state, { payload }) => {
        state.status = TopicCodStatus.CREATED;
        state.topics = payload;
      })
      .addCase(createTopic.rejected, (state, { payload }) => {
        state.error = String(payload);
        state.status = TopicCodStatus.ERROR;
      });
  },
});

export const { selectTopic } = topicSlice.actions;

export default topicSlice.reducer;
