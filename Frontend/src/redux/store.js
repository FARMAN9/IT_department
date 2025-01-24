import { configureStore } from '@reduxjs/toolkit'
import MainImageSlice from '../Features/MainImages'
import VisionAndMissionSlice from '../Features/VisionAndMissionslice'
import MainDepartmentSlice from '../Features/MainDepartmentSlice'
import GallerySlice from '../Features/GallerySlice'
import HodSlice from '../Features/HodSlice'
import SyllabusSlice from '../Features/SyllabusSlice'

export const store = configureStore({
  reducer: {
    MainImagesData: MainImageSlice,
    VisionAndMissionData: VisionAndMissionSlice,
    MainDepartmentData: MainDepartmentSlice,
    GalleryData: GallerySlice,
    HodData: HodSlice
    ,SyllabusData: SyllabusSlice
  }
})