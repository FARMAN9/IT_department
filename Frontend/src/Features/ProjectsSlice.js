// redux/slices/mainSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async Thunks for fetching data
export const fetchProjects = createAsyncThunk(
  'main/fetchProjects',
  async () => {
    const response = await fetch('http://localhost:4000/api/GetProjects');
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    return response.json();
  }
);



const projectsSlice = createSlice({
  name: 'main',
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.loading = false;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
     
  },
});

export default projectsSlice.reducer;