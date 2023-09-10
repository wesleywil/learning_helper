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

export const fetchSubTopics = createAsyncThunk(
  "subTopics/fetchSubTopics",
  async (id: number) => {
    const res = await fetch(
      `http://localhost:3000/api/topics/${id}/sub_topics`
    );
    return res.json();
  }
);

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

export const updateSubTopic = createAsyncThunk(
  "subTopics/updateSubTopic",
  async (data: { description: string; finished: boolean; id: number }) => {
    const res = await fetch(`http://localhost:3000/api/sub_topics/${data.id}`, {
      method: "PUT",
      body: JSON.stringify({
        description: data.description,
        finished: data.finished,
      }),
    });
    return res.json();
  }
);

export const deleteSubTopic = createAsyncThunk(
  "subTopics/deleteSubToppic",
  async (id: number) => {
    const res = await fetch(`http://localhost:3000/api/sub_topics/${id}`, {
      method: "DELETE",
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
      .addCase(fetchSubTopics.pending, (state) => {
        state.status = "trying to fetch sub-topics";
      })
      .addCase(fetchSubTopics.fulfilled, (state, { payload }) => {
        state.subtopics = payload;
        state.status = "sub-topics fetched";
      })
      .addCase(fetchSubTopics.rejected, (state, { payload }) => {
        state.error = String(payload);
        state.status = "error while trying to fetch sub-topics";
      })
      .addCase(createSubTopic.pending, (state) => {
        state.status = "trying to create new sub-topic";
      })
      .addCase(createSubTopic.fulfilled, (state, { payload }) => {
        state.status = "sub-topic created successfully";
      })
      .addCase(createSubTopic.rejected, (state, { payload }) => {
        state.error = String(payload);
        state.status = "error while trying to create a sub-topic";
      })
      .addCase(updateSubTopic.pending, (state) => {
        state.status = "trying to update sub-topic";
      })
      .addCase(updateSubTopic.fulfilled, (state, { payload }) => {
        state.status = "sub-topic updated successfully";
      })
      .addCase(updateSubTopic.rejected, (state, { payload }) => {
        state.error = String(payload);
        state.status = "error while trying to update a sub-topic";
      })
      .addCase(deleteSubTopic.pending, (state) => {
        state.status = "trying to delete sub-topic";
      })
      .addCase(deleteSubTopic.fulfilled, (state, { payload }) => {
        state.status = "sub-topic deleted successfully";
      })
      .addCase(deleteSubTopic.rejected, (state, { payload }) => {
        state.error = String(payload);
        state.status = "error while trying to delete a sub-topic";
      });
  },
});

export const {} = subTopicSlice.actions;

export default subTopicSlice.reducer;
