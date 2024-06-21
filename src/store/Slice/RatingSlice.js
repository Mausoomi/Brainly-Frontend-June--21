import { createSlice } from "@reduxjs/toolkit";
import { submitRatings } from "../Actions/RatingAction";

const ratingsSlice = createSlice({
  name: "ratings",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitRatings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitRatings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(submitRatings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default ratingsSlice.reducer;
