import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helper/axiosconfig";

// --------------------------------------------------------------------------------- auth  --------

export const Update_Copy_brainQuest = createAsyncThunk(
  "DragDrop/Update_Copy_brainQuest",
  async (Data) => {
    try {
      const response = await axios.post(`Update_Copy_brainQuest`, Data);
      console.log(response);
      return response?.data;
    } catch (error) {
      // console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

// Get_Copy_brainQuest;
export const Get_Copy_brainQuest = createAsyncThunk(
  "DragDrop/Get_Copy_brainQuest",
  async (Data) => {
    try {
      const response = await axios.post(`Get_Copy_brainQuest`, Data);
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

let intialState = {
  data: null,
  loading: false,
};

const BrainQuestSlice = createSlice({
  name: "BrainQuest",
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Update_Copy_brainQuest.pending, (state) => {
        state.loading = true;
      })
      .addCase(Update_Copy_brainQuest.fulfilled, (state, action) => {
        // state.AllFantary = action.payload
        // console.log(action.payload);
        state.data = action.payload.matchedBarinQuest;
        state.loading = false;
      })
      .addCase(Update_Copy_brainQuest.rejected, (state) => {
        state.loading = false;
      })

      .addCase(Get_Copy_brainQuest.pending, (state) => {
        state.loading = true;
      })
      .addCase(Get_Copy_brainQuest.fulfilled, (state, action) => {
        // state.AllFantary = action.payload
        console.log(action.payload);
        state.data = action.payload.matchedBarinQuest;
        state.loading = false;
      })
      .addCase(Get_Copy_brainQuest.rejected, (state) => {
        state.loading = false;
      });
  },
});

// export const { } = FantarySlice.actions;
export default BrainQuestSlice.reducer;
