import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async Thunks for fetching data
export const fetchMainData = createAsyncThunk(
  'main/fetchMainData',
  async () => {
    const response = await fetch('http://localhost:4000/api/missions');
    if (!response.ok) {
      throw new Error('Failed to fetch missions');
    }
    return response.json();
  }
);



export const MainSlice = createSlice({
  name: 'MainData',
  initialState: {
    value: [],
    loading: false,
    error: null,
  },
  reducers: {

   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMainData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMainData.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload; // Update state with the fetched data
      })
      .addCase(fetchMainData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Update state with the error message
      });
  },
});



export default MainSlice.reducer