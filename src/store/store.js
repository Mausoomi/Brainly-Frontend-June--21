// store.js
import { configureStore } from '@reduxjs/toolkit';

import AuthSlice from './Slice/AuthSlice';
import adminSlice from './Slice/adminSlice'
import storySlice from './Slice/storySlice'
import DailyQuizSlice from "./Slice/DailyQuizSlice";
import LeaderBoardSlice from "./Slice/LeaderBoardSlice"
import WeeklySlice from "./Slice/WeeklySlice"
import DragDropSlice from './Slice/DragDropSlice';
import BrainQuestSlice from './Slice/BrainQuestSlice';
import ratingsReducer from './Slice/RatingSlice'
// 

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    Admin: adminSlice,
    Story: storySlice,
    DailyQuiz: DailyQuizSlice,
    LeaderBoard: LeaderBoardSlice,
    WeeklySlice: WeeklySlice,
    DragandDrop: DragDropSlice,
    BrainQuest: BrainQuestSlice,
    ratings: ratingsReducer,
  },
});
