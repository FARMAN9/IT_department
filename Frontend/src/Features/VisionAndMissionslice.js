// redux/slices/mainSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async Thunks for fetching data
export const fetchMissions = createAsyncThunk(
  'main/fetchMissions',
  async () => {
    const response = await fetch('http://localhost:4000/api/missions');
    if (!response.ok) {
      throw new Error('Failed to fetch missions');
    }
    return response.json();
  }
);

export const fetchVisions = createAsyncThunk(
  'main/fetchVisions',
  async () => {
    const response = await fetch('http://localhost:4000/api/visions');
    if (!response.ok) {
      throw new Error('Failed to fetch visions');
    }
    return response.json();
  }
);

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    missions: [],
    visions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.missions = action.payload;
        state.loading = false;
      })
      .addCase(fetchMissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchVisions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVisions.fulfilled, (state, action) => {
        state.visions = action.payload;
        state.loading = false;
      })
      .addCase(fetchVisions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default mainSlice.reducer;
