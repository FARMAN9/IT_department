import { configureStore } from '@reduxjs/toolkit'
import MainImageSlice from '../Features/MainImages'
import VisionAndMissionSlice from '../Features/VisionAndMissionslice'
import MainDepartmentSlice from '../Features/MainDepartmentSlice'
import GallerySlice from '../Features/GallerySlice'
import HodSlice from '../Features/HodSlice'
import SyllabusSlice from '../Features/SyllabusSlice'
import AcademicCoordinatorSlice from '../Features/AcademicCoordinatorSlice'
import TimeTableSlice from '../Features/TimeTabelSlice'
import DepartmentActivitesCalenderSlice from '../Features/DepartmentActivitesCalendarslice'
import StudentsSlice from '../Features/studentsSlice'

export const store = configureStore({
  reducer: {
    MainImagesData: MainImageSlice,
    VisionAndMissionData: VisionAndMissionSlice,
    MainDepartmentData: MainDepartmentSlice,
    GalleryData: GallerySlice,
    HodData: HodSlice
    , SyllabusData: SyllabusSlice,
    AcademicCoordinatorData: AcademicCoordinatorSlice,
    TimeTableData: TimeTableSlice,
    DepartmentActivitesCalenderData: DepartmentActivitesCalenderSlice,
    StudentsData: StudentsSlice
  }
})