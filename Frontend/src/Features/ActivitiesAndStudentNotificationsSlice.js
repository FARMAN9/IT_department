import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch data from an API
export const fetchActivitiesAndStudentNotificationsData = createAsyncThunk('ActivitiesAndStudentNotificationsData/fetchActivitiesAndStudentNotificationsData', async (_, { rejectWithValue }) => {
  try {
      const response = await axios.get('http://localhost:4000/api/getActivitiesAndStudentsNotifications');
      
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Something went wrong');
  }
});

export const ActivitiesAndStudentNotificationsSlice = createSlice({
  name: 'ActivitiesAndStudentNotificationsData',
  initialState: {
    ActivitiesAndStudentNotifications: [], // Holds the data
    loading: false, // For loading state
    error: null, // For error messages
  },
  reducers: {
    // You can define other synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivitiesAndStudentNotificationsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivitiesAndStudentNotificationsData.fulfilled, (state, action) => {
        state.loading = false;
        state.ActivitiesAndStudentNotifications = action.payload; // Update state with the fetched data
      })
      .addCase(fetchActivitiesAndStudentNotificationsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Update state with the error message
      });
  },
});

export default ActivitiesAndStudentNotificationsSlice.reducer;