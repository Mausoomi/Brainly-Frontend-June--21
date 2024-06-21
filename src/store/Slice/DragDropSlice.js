// Update_Drag_Drop_Copy;

import { createSlice } from "@reduxjs/toolkit";
// import { imageUpload } from "../Actions/adminActions";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helper/axiosconfig";

// ACTIONS : api calls

// --------------------------------------------------------------------------------- auth  --------

export const Update_Drag_Drop_Copy = createAsyncThunk(
  "DragDrop/Update_Drag_Drop_Copy",
  async (formData) => {
    try {
      const response = await axios.post(`Update_Drag_Drop_Copy`, formData);
      console.log(response);
      return response.data;
    } catch (error) {
      // console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
);

// emptyLatestData

export const emptyLatestData = createAsyncThunk(
  "DragDrop/emptyLatestData",
  async () => {
    try {
      return null;
    } catch (error) {}
  }
);
let intialState = {
  data: null,
  loading: false,
};

const DragDropSlice = createSlice({
  name: "DragDrop",
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Update_Drag_Drop_Copy.pending, (state) => {
        state.loading = true;
      })
      .addCase(Update_Drag_Drop_Copy.fulfilled, (state, action) => {
        // state.AllFantary = action.payload
        console.log(action.payload);
        state.data = action.payload.matchedWordexplore;
        state.loading = false;
      })
      .addCase(Update_Drag_Drop_Copy.rejected, (state) => {
        state.loading = false;
      })
      // emptyLatestData
      .addCase(emptyLatestData.pending, (state) => {
        state.loading = true;
      })
      .addCase(emptyLatestData.fulfilled, (state, action) => {
        // state.AllFantary = action.payload
        console.log(action.payload);
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(emptyLatestData.rejected, (state) => {
        state.loading = false;
      });
  },
});

// export const { } = FantarySlice.actions;
export default DragDropSlice.reducer;

// // Update_Drag_Drop_Copy;

// import { createSlice } from "@reduxjs/toolkit";
// // import { imageUpload } from "../Actions/adminActions";

// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../helper/axiosconfig";

// // ACTIONS : api calls

// // --------------------------------------------------------------------------------- auth  --------

// export const Update_Drag_Drop_Copy = createAsyncThunk(
//   "DragDrop/Update_Drag_Drop_Copy",
//   async (formData) => {
//     try {
//       const response = await axios.post(`Update_Drag_Drop_Copy`, formData);
//       console.log(response);
//       return response.data;
//     } catch (error) {
//       // console.log(error.response.data.message);
//       return error.response.data.message;
//     }
//   }
// );

// let intialState = {
//   data:[],
//   loading: false,
// };

// const DragDropSlice = createSlice({
//   name: "DragDrop",
//   initialState: intialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(Update_Drag_Drop_Copy.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(Update_Drag_Drop_Copy.fulfilled, (state, action) => {
//         // state.AllFantary = action.payload
//         console.log(action.payload)
//         console.log(action.payload);
//         state.data = action?.payload?.matchedWordexplore;
//         state.loading = false;
//       })
//       .addCase(Update_Drag_Drop_Copy.rejected, (state) => {
//         state.loading = false;
//       });
//   },
// });

// // export const { } = FantarySlice.actions;
// export default DragDropSlice.reducer;
