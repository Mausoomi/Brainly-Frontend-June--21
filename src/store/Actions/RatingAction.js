import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helper/axiosconfig";

export const submitRatings = createAsyncThunk(
  "ratings/submit",
  async (ratingsData) => {
    try {
      const response = await axios.post("submit-ratings", ratingsData);
      
      return response.data; 
    } catch (error) {
       console.log(error.response.data.message);
       return error.response.data.message;
    }
  }
);