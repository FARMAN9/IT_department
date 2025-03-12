import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch data from an API
export const fetchDepartmentsLabsData = createAsyncThunk(
  "DepartmentsLabsData/fetchDepartmentsLabsData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/getDepartmentsLabs"
      ); // Replace with your API endpoint
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const DepartmentsLabsSlice = createSlice({
  name: "DepartmentsLabsData",
  initialState: {
    departmentsLabs: [], // Holds the data
    loading: false, // For loading state
    error: null, // For error messages
  },
  reducers: {
    // You can define other synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartmentsLabsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartmentsLabsData.fulfilled, (state, action) => {
        state.loading = false;
        state.departmentsLabs = action.payload; // Update state with the fetched data
      })
      .addCase(fetchDepartmentsLabsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Update state with the error message
      });
  },
});

export default DepartmentsLabsSlice.reducer;
