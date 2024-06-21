import { createSlice } from "@reduxjs/toolkit";
import { Get_All_Student_list, imageUpload } from "../Actions/adminActions";
import { toast } from "react-toastify";

let intialState = {
  loading: false,
  allStudentData: [],
};

const AdminSlice = createSlice({
  name: "Admin",
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(imageUpload.pending, (state) => {
        state.loading = true;
      })
      .addCase(imageUpload.fulfilled, (state, action) => {
        // state.AllFantary = action.payload
        state.loading = false;
      })
      .addCase(imageUpload.rejected, (state) => {
        state.loading = false;
      })
      .addCase(Get_All_Student_list.pending, (state) => {
        state.loading = true;
      })
      .addCase(Get_All_Student_list.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          state.allStudentData = action.payload.data.All_Student_list;
          state.loading = false;
        } else {
          toast.error(action.payload, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
          });
        }
      })
      .addCase(Get_All_Student_list.rejected, (state) => {
        state.loading = false;
      });
  },
});

// export const { } = FantarySlice.actions;
export default AdminSlice.reducer;
