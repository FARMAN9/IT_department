import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch images
export const fetchMainData = createAsyncThunk('MainData/fetchMainData', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:4000/api/getMainImages');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Something went wrong');
  }
});

// Async thunk to upload an image
export const uploadMainImage = createAsyncThunk(
  'MainImagesData/uploadMainImage',
  async ({ file }, { rejectWithValue }) => {
    try {
      if (!file) {
        return rejectWithValue('File is required');
      }
      const formData = new FormData();
      formData.append('file', file);
      console.log('File:', file);
      const response = await axios.post('http://localhost:4000/api/uplaodMainImages', formData);
      console.log('Upload Response:', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
      console.log('Error:', error.response?.data || 'Something went wrong');
    }
  }
);


// Async thunk to update an image
export const updateMainImage = createAsyncThunk(
  'MainImagesData/updateMainImage',
  async ({ id, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.put(`http://localhost:4000/api/updateMainImage/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data; // Assuming API returns updated image object
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

// Async thunk to delete an image
export const deleteMainImage = createAsyncThunk(
  'MainImagesData/deleteMainImage',
  async ( id , { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/deleteMainImages/${id}`);
      console.log('Delete Response:', response.data);
      return response.data;
      // Assuming API returns the deleted image ID
    } catch (error) {
      console.log(error);
      return rejectWithValue(response.error || 'Something went wrong');
    }
  }
);

// Helper function to remove the image from the state
const removeImageFromState = (id) => (state) => {
  state.imageSlider = state.imageSlider.filter((image) => image._id !== id);
};

export const MainImageSlice = createSlice({
  name: 'MainImagesData',
  initialState: {
    imageSlider: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch images
      .addCase(fetchMainData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMainData.fulfilled, (state, action) => {
        state.loading = false;
        state.imageSlider = action.payload;
      })
      .addCase(fetchMainData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Upload image
      .addCase(uploadMainImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadMainImage.fulfilled, (state, action) => {
        state.loading = false;
        state.imageSlider.push(action.payload); // Add new image to state
      })
      .addCase(uploadMainImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update image
      .addCase(updateMainImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMainImage.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.imageSlider.findIndex((img) => img.id === action.payload.id);
        if (index !== -1) {
          state.imageSlider[index] = action.payload; // Update the image
        }
      })
      .addCase(updateMainImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete image
      .addCase(deleteMainImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMainImage.fulfilled, (state, action) => {
        state.loading = false;
        state.imageSlider = state.imageSlider.filter((img) => img.id !== action.payload);
      })
      .addCase(deleteMainImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default MainImageSlice.reducer;
