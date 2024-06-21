import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helper/axiosconfig";

// ACTIONS : api calls

// --------------------------------------------------------------------------------- auth  --------

export const SignUp_user = createAsyncThunk("auth/Signup", async (formData) => {
  try {
    const response = await axios.post(`Signup`, formData);
    // console.log(response);
    return response.data;
  } catch (error) {
    // console.log(error.response.data.message);
    return error.response.data.message;
  }
});

export const async_loaduser = createAsyncThunk(
  "auth/async_loaduser",
  async () => {
    const response = await axios.post(`me`);
    // console.log(response);
    return response.data.user;
  }
);

export const async_removeuser = createAsyncThunk(
  "auth/async_removeuser",
  async () => {
    const response = await axios.get(`signout`);
    // console.log(response)
    return response;
  }
);

export const Signin_user = createAsyncThunk(
  "auth/Signin_user",
  async (formData) => {
    try {
      const response = await axios.post(`Signin_user`, formData);
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const Find_Email = createAsyncThunk("auth/Find_Email", async (Email) => {
  try {
    // console.log(Email)
    const response = await axios.post(`FindUsername`, Email);
    // console.log(response);
    return response.data;
  } catch (error) {
    // console.log(error.response.data.message);
    return error.response.data.message;
  }
});

export const MatchOTP = createAsyncThunk("auth/MatchOTP", async (data) => {
  try {
    // console.log(data)
    const response = await axios.post(`MatchOTP`, data);
    // console.log(response);
    return response.data;
  } catch (error) {
    // console.log(error.response.data.message);
    return error.response.data.message;
  }
});

export const Reset_Password = createAsyncThunk(
  "auth/Reset_Password",
  async (data) => {
    try {
      const response = await axios.post(`Reset_Password`, data);
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

// Get_Count_Student;
export const Get_Count_Student = createAsyncThunk(
  "auth/Get_Count_Student",
  async (StudentID) => {
    try {
      const response = await axios.get(`Get_Count_Student/${StudentID}`);
      console.log(response);
      return response;
    } catch (error) {
      // console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const EditProfile_Student = createAsyncThunk(
  "auth/EditProfile_Student",
  async (formData) => {
    try {
      console.log(formData);
      // console.log(StudentID);
      const response = await axios.post(
        `Edit_Profile/${formData.StudentID}`,
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

// Edit_Profile_Password
export const Edit_Profile_Password = createAsyncThunk(
  "auth/Edit_Profile_Password",
  async (formData) => {
    try {
      console.log(formData);
      const response = await axios.post(
        `Edit_Profile_Password/${formData.StudentID}`,
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

//
export const SyncAlluser_Data_ScienceData = createAsyncThunk(
  "auth/SyncAlluser_Data_ScienceData",
  async () => {
    try {
      const response = await axios.get(`SyncAlluser_Data_ScienceData`);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const SyncAlluser_Data_FantasyData = createAsyncThunk(
  "auth/SyncAlluser_Data_FantasyData",
  async () => {
    try {
      const response = await axios.get(`SyncAlluser_Data_FantasyData`);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const SyncAlluser_Data_MysteryData = createAsyncThunk(
  "auth/SyncAlluser_Data_MysteryData",
  async () => {
    try {
      const response = await axios.get(`SyncAlluser_Data_MysteryData`);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const SyncAlluser_Data_HistoryData = createAsyncThunk(
  "auth/SyncAlluser_Data_HistoryData",
  async () => {
    try {
      const response = await axios.get(`SyncAlluser_Data_HistoryData`);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const SyncAlluser_Data_AdventureData = createAsyncThunk(
  "auth/SyncAlluser_Data_AdventureData",
  async () => {
    try {
      const response = await axios.get(`SyncAlluser_Data_AdventureData`);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);
export const SyncAlluser_Data_SportData = createAsyncThunk(
  "auth/SyncAlluser_Data_SportData",
  async () => {
    try {
      const response = await axios.get(`SyncAlluser_Data_SportData`);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const Fetch_Partner_With_Us_Data = createAsyncThunk(
  "auth/Fetch_Partner_With_Us_Data",
  async (formData) => {
    try {
      console.log(formData);
      const response = await axios.post(`Fetch_Partner_With_Us_Data`, formData);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

// Activcate_BuyPlan;
export const Activate_BuyPlan = createAsyncThunk(
  "auth/Activcate_BuyPlan",
  async (formData) => {
    try {
      console.log(formData);
      const response = await axios.post(`Activate_BuyPlan`, formData);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const GetSessionDetails = createAsyncThunk(
  "auth/GetSessionDetails",
  async (sessionID) => {
    try {
      console.log(sessionID);
      const response = await axios.get(`session/${sessionID}`);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const Cancel_Current_Plan = createAsyncThunk(
  "auth/Cancel_Current_Plan",
  async (formData) => {
    try {
      console.log(formData);
      const response = await axios.post(`Cancel_Current_Plan`, formData);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);
