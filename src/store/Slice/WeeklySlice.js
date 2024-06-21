import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  Fetch_weeklyperformance,
  Get_Weekly_Quiz_By_StudentID,
} from "../Actions/weeklyActions";

let initialState = {
  loading: false,
  Questions: [],
  Questions_of_Student: [],
};

const WeeklySlice = createSlice({
  name: "WeeklySlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Fetch_weeklyperformance.pending, (state) => {
        state.loading = true;
      })
      .addCase(Fetch_weeklyperformance.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          // console.log(action.payload);
          state.Questions = action.payload.data;
          state.loading = false;
        } else {
          toast.error(action.payload, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        }
      })
      .addCase(Fetch_weeklyperformance.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Get_Weekly_Quiz_By_StudentID.pending, (state) => {
        state.loading = true;
      })
      .addCase(Get_Weekly_Quiz_By_StudentID.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          // console.log(action.payload);
          state.Questions_of_Student = action.payload.data.weeklyQuiz;
          state.loading = false;
        } else {
          toast.error(action.payload, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        }
      })
      .addCase(Get_Weekly_Quiz_By_StudentID.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default WeeklySlice.reducer;
