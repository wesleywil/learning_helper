import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubTopic } from "@/utils/interfaces";
import { SubTopicsCodStatus } from "@/utils/status";

export interface SubTopicState {
  subtopics: SubTopic[];
  selectedsubtopics: SubTopic[];
  subtopic: SubTopic;
  status: SubTopicsCodStatus;
  error: string;
}

const initialState: SubTopicState = {
  subtopics: [],
  selectedsubtopics: [],
  subtopic: {} as SubTopic,
  status: SubTopicsCodStatus.IDLE,
  error: "",
};

export const fetchSubTopics = createAsyncThunk(
  "subTopics/fetchSubTopics",
  async () => {
    const res = await fetch(`http://localhost:3000/api/sub_topics`);
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
  reducers: {
    selectSubTopics: (state, action: PayloadAction<number>) => {
      const selectedSubTopics = state.subtopics.filter(
        (item) => item.topicId === action.payload
      );
      state.selectedsubtopics = selectedSubTopics;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubTopics.pending, (state) => {
        state.status = SubTopicsCodStatus.FETCHING;
      })
      .addCase(fetchSubTopics.fulfilled, (state, { payload }) => {
        state.subtopics = payload;
        state.status = SubTopicsCodStatus.FETCHED;
      })
      .addCase(fetchSubTopics.rejected, (state, { payload }) => {
        state.error = String(payload);
        state.status = SubTopicsCodStatus.ERROR;
      })
      .addCase(createSubTopic.pending, (state) => {
        state.status = SubTopicsCodStatus.CREATING;
      })
      .addCase(createSubTopic.fulfilled, (state) => {
        state.status = SubTopicsCodStatus.CREATED;
      })
      .addCase(createSubTopic.rejected, (state, { payload }) => {
        state.error = String(payload);
        state.status = SubTopicsCodStatus.ERROR;
      })
      .addCase(updateSubTopic.pending, (state) => {
        state.status = SubTopicsCodStatus.UPDATING;
      })
      .addCase(updateSubTopic.fulfilled, (state) => {
        state.status = SubTopicsCodStatus.UPDATED;
      })
      .addCase(updateSubTopic.rejected, (state, { payload }) => {
        state.error = String(payload);
        state.status = SubTopicsCodStatus.ERROR;
      })
      .addCase(deleteSubTopic.pending, (state) => {
        state.status = SubTopicsCodStatus.DELETING;
      })
      .addCase(deleteSubTopic.fulfilled, (state) => {
        state.status = SubTopicsCodStatus.DELETED;
      })
      .addCase(deleteSubTopic.rejected, (state, { payload }) => {
        state.error = String(payload);
        state.status = SubTopicsCodStatus.ERROR;
      });
  },
});

export const { selectSubTopics } = subTopicSlice.actions;

export default subTopicSlice.reducer;
