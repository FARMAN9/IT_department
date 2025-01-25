import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch data from an API
export const fetchAcademicCoordinatorsData = createAsyncThunk('AcademicCoordinatorsData/fetchAcademicCoordinatorsData', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:4000/api/getAcademicCoordinators');
    console.log('data',response.data.data);
    return response.data.data;

  } catch (error) {
    return rejectWithValue(error.response?.data || 'Something went wrong');
  }
});


export const AcademicCoordinatorSlice = createSlice({
  name: 'AcademicCoordinatorData',
  initialState: {
    AcademicCoordinator: [], // Holds the data
    loading: false, // For loading state
    error: null, // For error messages
  },
  reducers: {
    // You can define other synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcademicCoordinatorsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAcademicCoordinatorsData.fulfilled, (state, action) => {
        state.loading = false;
        state.AcademicCoordinator = action.payload; // Update state with the fetched data
      })
      .addCase(fetchAcademicCoordinatorsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Update state with the error message
      });
  },
});

export default AcademicCoordinatorSlice.reducer;