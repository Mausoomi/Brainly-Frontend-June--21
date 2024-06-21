import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helper/axiosconfig";

// ACTIONS : api calls

// --------------------------------------------------------------------------------- Fanatsy

export const fetchAllFantary = createAsyncThunk(
  "Fantary/fetchAllFantary",
  async () => {
    const response = await axios.get(`fantasy`);
    // console.log(response)
    return response.data;
  }
);

export const fetchFantasyDataByID = createAsyncThunk(
  "Fantary/fetchFantasyDataByID",
  async (id) => {
    const response = await axios.get(`fantasy/${id}`);
    // console.log(response);
    return response.data;
  }
);

export const fetchCompletedFantasy = createAsyncThunk(
  "Fantary/fetchCompletedFantasy",
  async () => {
    try {
      const response = await axios.get(`fantasy/filter/fetchCompletedFantasy`);
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const fetchInProgressFantasy = createAsyncThunk(
  "Fantary/fetchInProgressFantasy",
  async () => {
    try {
      const response = await axios.get(`fantasy/filter/fetchInProgressFantasy`);
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const fetchNewFantasy = createAsyncThunk(
  "Fantary/fetchNewFantasy",
  async () => {
    try {
      const response = await axios.get(`fantasy/filter/fetchNewFantasy`);
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

// --------------------------------------------------------------------------------- History

export const fetchAllHistory = createAsyncThunk(
  "Fantary/fetchAllHistory",
  async () => {
    const response = await axios.get(`historyfiction`);
    return response.data;
  }
);

export const fetchHistoryDataByID = createAsyncThunk(
  "Fantary/fetchHistoryDataByID",
  async (id) => {
    const response = await axios.get(`historyfiction/${id}`);
    // console.log(response)
    return response.data;
  }
);

export const fetchCompletedHistoryfiction = createAsyncThunk(
  "Fantary/fetchCompletedHistoryfiction",
  async () => {
    try {
      const response = await axios.get(
        `historyfiction/filter/fetchCompletedHistoryfiction`
      );
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const fetchInProgressHistoryfiction = createAsyncThunk(
  "Fantary/fetchInProgressHistoryfiction",
  async () => {
    try {
      const response = await axios.get(
        `historyfiction/filter/fetchInProgressHistoryfiction`
      );
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const fetchNewHistoryfiction = createAsyncThunk(
  "Fantary/fetchNewHistoryfiction",
  async () => {
    try {
      const response = await axios.get(
        `historyfiction/filter/fetchNewHistoryfiction`
      );
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

// --------------------------------------------------------------------------------- Sport

export const fetchAllSport = createAsyncThunk(
  "Fantary/fetchAllSport",
  async () => {
    const response = await axios.get(`sportfiction`);
    return response.data;
  }
);

export const fetchSportDataByID = createAsyncThunk(
  "Fantary/fetchSportDataByID",
  async (id) => {
    const response = await axios.get(`sportfiction/${id}`);
    // console.log(response)
    return response.data;
  }
);

export const fetchCompletedSportfiction = createAsyncThunk(
  "Fantary/fetchCompletedSportfiction",
  async () => {
    try {
      const response = await axios.get(
        `sportfiction/filter/fetchCompletedSportfiction`
      );
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const fetchInProgressSportfiction = createAsyncThunk(
  "Fantary/fetchInProgressSportfiction",
  async () => {
    try {
      const response = await axios.get(
        `sportfiction/filter/fetchInProgressSportfiction`
      );
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const fetchNewSportfiction = createAsyncThunk(
  "Fantary/fetchNewSportfiction",
  async () => {
    try {
      const response = await axios.get(
        `sportfiction/filter/fetchNewSportfiction`
      );
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

// --------------------------------------------------------------------------------- Mystery

export const fetchAllmystery = createAsyncThunk(
  "Fantary/fetchAllmystery",
  async () => {
    const response = await axios.get(`mystery`);
    return response.data;
  }
);

export const fetchMysteryDataByID = createAsyncThunk(
  "Fantary/fetchMysteryDataByID",
  async (id) => {
    const response = await axios.get(`mystery/${id}`);
    // console.log(response)
    return response.data;
  }
);

export const fetchCompletedMystery = createAsyncThunk(
  "Fantary/fetchCompletedMystery",
  async () => {
    try {
      const response = await axios.get(`mystery/filter/fetchCompletedMystery`);
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const fetchInProgressMystery = createAsyncThunk(
  "Fantary/fetchInProgressMystery",
  async () => {
    try {
      // console.log("axios await");
      const response = await axios.get(`mystery/filter/fetchInProgressMystery`);
      // console.log(response);
      return response;
    } catch (error) {
      // console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const fetchNewMystery = createAsyncThunk(
  "Fantary/fetchNewMystery",
  async () => {
    try {
      const response = await axios.get(`mystery/filter/fetchNewMystery`);
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

// --------------------------------------------------------------------------------- Adventure-------------------------------------------------------------------------------

export const fetchAllAdventure = createAsyncThunk(
  "Fantary/fetchAllAdventure",
  async () => {
    const response = await axios.get(`adventure`);
    return response.data;
  }
);

export const fetchAdventureDataByID = createAsyncThunk(
  "Fantary/fetchAdventureDataByID",
  async (id) => {
    const response = await axios.get(`adventure/${id}`);
    // console.log(response)
    return response.data;
  }
);

export const fetchCompletedAdventure = createAsyncThunk(
  "Fantary/fetchCompletedAdventure",
  async () => {
    try {
      const response = await axios.get(
        `adventure/filter/fetchCompletedAdventure`
      );
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const fetchInProgressAdventure = createAsyncThunk(
  "Fantary/fetchInProgressAdventure",
  async () => {
    try {
      const response = await axios.get(
        `adventure/filter/fetchInProgressAdventure`
      );
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const fetchNewAdventure = createAsyncThunk(
  "Fantary/fetchNewAdventure",
  async () => {
    try {
      const response = await axios.get(`adventure/filter/fetchNewAdventure`);
      // console.log(response)
      return response;
    } catch (error) {
      // error.response.data.message;
      return error.response.data.message;
    }
  }
);

// --------------------------------------------------------------------------------- Science

export const fetchAllscience = createAsyncThunk(
  "Fantary/fetchAllscience",
  async () => {
    const response = await axios.get(`sciencefiction`);
    return response.data;
  }
);

export const fetchScienceDataByID = createAsyncThunk(
  "Fantary/fetchScienceDataByID",
  async (id) => {
    const response = await axios.get(`sciencefiction/${id}`);
    // console.log(response)
    return response.data;
  }
);

export const fetchCompletedScience = createAsyncThunk(
  "Fantary/fetchCompletedscience",
  async () => {
    try {
      const response = await axios.get(
        `sciencefiction/filter/fetchCompletedSciencefiction`
      );
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const fetchInProgressscience = createAsyncThunk(
  "Fantary/fetchInProgressscience",
  async () => {
    try {
      const response = await axios.get(
        `sciencefiction/filter/fetchInProgressSciencefiction`
      );
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const fetchNewscience = createAsyncThunk(
  "Fantary/fetchNewscience",
  async () => {
    try {
      const response = await axios.get(
        `sciencefiction/filter/fetchNewSciencefiction`
      );
      // console.log(response)
      return response;
    } catch (error) {
      // console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const Create_whole_copy = createAsyncThunk(
  "Fantary/Create_whole_copy",
  async (CopyData) => {
    console.log("----------Fetched Copy at action  ------", CopyData);
    try {
      const response = await axios.post(`Create_whole_copy`, CopyData);
      // console.log(response);
      return response;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

// Get_whole_copy
export const Get_whole_copy = createAsyncThunk(
  "Fantary/Get_whole_copy",
  async (GetData) => {
    // console.log(GetData);
    try {
      const response = await axios.post(`Get_whole_copy`, GetData);
      // console.log(response);
      return response;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const SciencefetchData = createAsyncThunk(
  "data/SciencefetchData",
  async () => {
    try {
      console.log("----------Fetched Science");
      const response = await axios.get("/sciencefiction");
      // console.log(response.data)
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// emptyFakeData

export const emptyFakeData = createAsyncThunk(
  "data/emptyFakeData",
  async () => {
    try {
      console.log("----------Fetched emptyFakeData");
      return null;
    } catch (error) {
      throw error;
    }
  }
);

export const FantasyfetchData = createAsyncThunk(
  "data/FantasyfetchData",
  async () => {
    try {
      const response = await axios.get("fantasy");
      //   console.log(response.data)
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const MysteryfetchData = createAsyncThunk(
  "data/MysteryfetchData",
  async () => {
    try {
      const response = await axios.get("/mystery");
      // console.log(response.data)
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const HistoryfetchData = createAsyncThunk(
  "data/HistoryfetchData",
  async () => {
    try {
      const response = await axios.get("historyfiction");
      // console.log(response.data)
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const AdventurefetchData = createAsyncThunk(
  "data/AdventurefetchData",
  async () => {
    try {
      const response = await axios.get("adventure");
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const SportfetchData = createAsyncThunk(
  "data/SportfetchData",
  async () => {
    try {
      const response = await axios.get("/sportfiction");
      // console.log(response.data)
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const Get_Copied_Data = createAsyncThunk(
  "data/Get_Copied_Data",
  async (formData) => {
    try {
      const response = await axios.post("Get_Copied_Data", formData);
      // console.log(response)
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
