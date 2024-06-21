import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helper/axiosconfig";

export const Create_Questions = createAsyncThunk(
  "weekly/Create_Questions",
  async ({
    StudentId,
    QuestionsId,
    question,
    options,
    answer,
    submitedanswer,
    tag,
    difficultyLevel,
    pathname,
    StoryTitle,
  }) => {
    try {
      const formData = {
        StudentId,
        QuestionsId,
        question,
        options,
        answer,
        submitedanswer,
        tag,
        difficultyLevel,
        pathname,
        StoryTitle,
      };

      // console.log(formData);

      const response = await axios.post(`question`, formData);
      // console.log(response);

      return response.data; // Assuming response contains data field
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);
export const Create_Progress = createAsyncThunk(
  "weekly/Create_Progress",
  async ({
    StudentId,
    QuestionsId,
    repetitionLevel,
    repetitionInterval,
    nextReviewDate,
    lastRevieweDate,
    submitedanswer,
    answer,
  }) => {
    try {
      const formData = {
        StudentId,
        QuestionsId,
        repetitionLevel,
        repetitionInterval,
        nextReviewDate,
        lastRevieweDate,
        submitedanswer,
        answer,
      };

      // console.log(formData);

      const response = await axios.post(`progress/CreateProgress`, formData);
      // console.log(response);

      return response.data; // Assuming response contains data field
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

export const Update_Questions = createAsyncThunk(
  "weekly/Update_Questions",
  async (QuestionData_Update) => {
    try {
      // console.log(QuestionData_Update)
      const response = await axios.post(
        `Update_Questions`,
        QuestionData_Update
      );
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

// export const Update_Drag_Drop = createAsyncThunk(
//   "weekly/Update_Drag_Drop",
//   async (data) => {
//     try {
//       console.log(data)
//       const response = await axios.post(`Update_Drag_Drop`, data);
//       return response;

//     } catch (error) {
//       console.log(error.response.data.message);
//       return error.response.data.message;
//     }
//   }
// );
