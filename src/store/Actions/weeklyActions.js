import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helper/axiosconfig";

export const Fetch_weeklyperformance = createAsyncThunk(
  "weekly/Create_Weekly_Quiz",
  async (formData) => {
    // console.log(formData);
    try {
      const response = await axios.post(
        `Fetch_WeeklyPerformace_Data`,
        formData
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const Get_Weekly_Quiz_By_StudentID = createAsyncThunk(
  "weekly/Get_Weekly_Quiz_By_StudentID",
  async (data) => {
    // console.log(data);
    try {
      const response = await axios.post(
        `Get_Weekly_Performance_of_Student/${data.id}`
      );
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);
