import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Get_Daily_Quiz_Questions } from "../Actions/DailyQuizAction";

let initialState = {
  loading: false,
  Current_DailyQuiz_Question: [],
  WrongQuestions: [],
};

const DailyQuizSlice = createSlice({
  name: "DailyQuiz",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Get_Daily_Quiz_Questions.pending, (state) => {
        state.loading = true;
      })
      .addCase(Get_Daily_Quiz_Questions.fulfilled, (state, action) => {
        // console.log(action.payload)
        if (action.payload) {
          state.Current_DailyQuiz_Question = action.payload;
          // console.log(action.payload)
        } else {
          toast.error(action.payload, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
          return state; // Return current state if payload is invalid
        }
      })
      .addCase(Get_Daily_Quiz_Questions.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default DailyQuizSlice.reducer;
