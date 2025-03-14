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
import PhdScholarsSlice from '../Features/PhdscholarsSlice'
import StaffsSlice from '../Features/StaffsSlice'
import CurrentTopPlacementsSlice from '../Features/TopplacementSlice'
import ResearchAreaSlice from '../Features/ResearchAreaSlice'
import ProjectsSlice from '../Features/ProjectsSlice'
import DepartmentsLabsSlice from '../Features/DepartmentsLabsSlice'
import ResearchLabsSlice from '../Features/ResearchLabsSlice'
import FacultySlice from '../Features/UserSlice'
import AdminSlice from '../Features/AdminSlice'
import ActivitiesAndStudentNotificationsSlice from '../Features/ActivitiesAndStudentNotificationsSlice'

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
    StudentsData: StudentsSlice,
    PhdScholarsData: PhdScholarsSlice,
    StaffsData: StaffsSlice,
    CurrentTopPlacementsData: CurrentTopPlacementsSlice,
    ResearchAreaData: ResearchAreaSlice,
    ProjectsData: ProjectsSlice,
    DepartmentsLabsData: DepartmentsLabsSlice,
    ResearchLabsData: ResearchLabsSlice,
    FacultyData: FacultySlice,
    AdminData: AdminSlice,
    ActivitiesAndStudentNotificationsData: ActivitiesAndStudentNotificationsSlice

  }
})