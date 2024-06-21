import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helper/axiosconfig";

// ACTIONS : api calls

// --------------------------------------------------------------------------------- Admin Image Upload --------

export const imageUpload = createAsyncThunk(
  "Admin/imageUpload",
  async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    const response = await axios.post(`update-image`, formData);
    // console.log(response);
    return response.data.filename;
  }
);

// ---------------------------------------------------------------------------------------------------- Fantasy -----------------

export const createFantasy = createAsyncThunk(
  "Admin/createFantasy",
  async (formData) => {
    // console.log(formData);
    const response = await axios.post(`fantasy`, formData);
    // console.log(response);
    return response.data.data;
  }
);

export const DeleteFanstay = createAsyncThunk(
  "Admin/DeleteFanstay",
  async (id) => {
    const response = await axios.post(`fantasy/delete/${id}`);
    // console.log(response);
    return response.data.data;
  }
);

export const UpdateFantasy = createAsyncThunk(
  "Admin/UpdateFantasy",
  async ({ formData, id }) => {
    // console.log(formData);
    // console.log(id);
    const response = await axios.post(`fantasy/${id}`, formData);
    // console.log(response);
    return response.data.data;
  }
);

// ---------------------------------------------------------------------------------------------------- Adventure -----------

export const createAdventure = createAsyncThunk(
  "Admin/createAdventure",
  async (formData) => {
    // console.log(formData);
    const response = await axios.post(`adventure`, formData);
    // console.log(response);
    return response.data.data;
  }
);

export const DeleteAdventure = createAsyncThunk(
  "Admin/DeleteAdventure",
  async (id) => {
    const response = await axios.post(`adventure/delete/${id}`);
    // console.log(response);
    return response.data.data;
  }
);

export const UpdateAdventure = createAsyncThunk(
  "Admin/UpdateAdventure",
  async ({ formData, id }) => {
    // console.log(formData);
    // console.log(id);
    const response = await axios.post(`adventure/${id}`, formData);
    // console.log(response);
    return response.data.data;
  }
);

// ------------------------------------------------------------------------------------------------------ Mystery -----------------------

export const createMystery = createAsyncThunk(
  "Admin/createMystery",
  async (formData) => {
    // console.log(formData);
    const response = await axios.post(`mystery`, formData);
    // console.log(response);
    return response.data.data;
  }
);

export const DeleteMystery = createAsyncThunk(
  "Admin/DeleteMystery",
  async (id) => {
    const response = await axios.post(`mystery/delete/${id}`);
    // console.log(response);
    return response.data.data;
  }
);

export const UpdateMystery = createAsyncThunk(
  "Admin/UpdateMystery",
  async ({ formData, id }) => {
    // console.log(formData);
    // console.log(id);
    const response = await axios.post(`mystery/${id}`, formData);
    // console.log(response);
    return response.data.data;
  }
);

// --------------------------------------------------------------------------------------------------------------------------

export const createScienceFiction = createAsyncThunk(
  "Admin/createScienceFiction",
  async (formData) => {
    // console.log(formData);
    const response = await axios.post(`sciencefiction`, formData);
    // console.log(response);
    return response.data.data;
  }
);

export const DeleteScienceFiction = createAsyncThunk(
  "Admin/DeleteScienceFiction",
  async (id) => {
    const response = await axios.post(`sciencefiction/delete/${id}`);
    // console.log(response);
    return response.data.data;
  }
);

export const UpdateScienceFiction = createAsyncThunk(
  "Admin/UpdateScienceFiction",
  async ({ formData, id }) => {
    // console.log(formData);
    // console.log(id);
    const response = await axios.post(`sciencefiction/${id}`, formData);
    // console.log(response);
    return response.data.data;
  }
);

// -----------------------------------------------------------------------------------------------

export const createHistoryFiction = createAsyncThunk(
  "Admin/createHistoryFiction",
  async (formData) => {
    // console.log(formData);
    const response = await axios.post(`historyfiction`, formData);
    // console.log(response);
    return response.data.data;
  }
);

export const DeleteHistoryFiction = createAsyncThunk(
  "Admin/DeleteHistoryFiction",
  async (id) => {
    const response = await axios.post(`historyfiction/delete/${id}`);
    // console.log(response);
    return response.data.data;
  }
);

export const UpdateHistoryFiction = createAsyncThunk(
  "Admin/UpdateHistoryFiction",
  async ({ formData, id }) => {
    // console.log(formData);
    // console.log(id);
    const response = await axios.post(`historyfiction/${id}`, formData);
    // console.log(response);
    return response.data.data;
  }
);

// ------------------------------------------------------------------------------------------------

export const createSportification = createAsyncThunk(
  "Admin/createSportification",
  async (formData) => {
    // console.log(formData);
    const response = await axios.post(`sportfiction`, formData);
    // console.log(response);
    return response.data.data;
  }
);

export const DeleteSportification = createAsyncThunk(
  "Admin/DeleteSportification",
  async (id) => {
    const response = await axios.post(`sportfiction/delete/${id}`);
    // console.log(response);
    return response.data.data;
  }
);

export const UpdateSportification = createAsyncThunk(
  "Admin/UpdateSportification",
  async ({ formData, id }) => {
    // console.log(formData);
    // console.log(id);
    const response = await axios.post(`sportfiction/${id}`, formData);
    // console.log(response);
    return response.data.data;
  }
);

export const Get_All_Student_list = createAsyncThunk(
  "Admin/Get_All_Student_list",
  async () => {
    // console.log(formData);
    // console.log(id);
    const response = await axios.get(`Get_All_Student_list`);
    console.log(response);
    return response;
  }
);
