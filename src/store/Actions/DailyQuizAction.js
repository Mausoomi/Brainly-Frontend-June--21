import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helper/axiosconfig";

export const Get_Daily_Quiz_Questions = createAsyncThunk(
  "DailyQuiz/Get_Daily_Quiz_Questions",
  async (id) => {
    // console.log(id)
    try {
      const response = await axios.get(`Get_Daily_Quiz_Questions/${id}`);
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const Fetch_Daily_Quiz_Data = createAsyncThunk(
  "DailyQuiz/Fetch_Daily_Quiz_Data",
  async (formData) => {
    // console.log(formData)
    try {
      const response = await axios.post(`Fetch_Daily_Quiz_Data`, formData);
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);
