import { configureStore } from '@reduxjs/toolkit'
import MainImageSlice from '../Features/MainImages'
import VisionAndMissionSlice from '../Features/VisionAndMissionslice'
import MainSlice from '../Features/MainAPIslice'

export const store = configureStore({
  reducer: {
    MainImagesData: MainImageSlice,
    VisionAndMissionData: VisionAndMissionSlice,
    MainData: MainSlice
  }
})