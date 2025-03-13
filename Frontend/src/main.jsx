import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./components/Main/main.jsx";
import Layout from "./Layouts/Layout.jsx";
import HodMain from "./components/Main/HODMain.jsx";
import VisionAndMissionMain from "./components/Main/VisionAndMissionMain.jsx";
import AchievementMain from "./components/Main/AchievementMain.jsx";
import ContactMain from "./components/Main/ContactMain.jsx";
import ProgramMain from "./components/Main/ProgramesMain.jsx";
import CoordinatorMain from "./components/Main/CoordinatorMain.jsx";
import SyllabusMain from "./components/Main/SyllabusMain.jsx";
import TimeTableMain from "./components/Main/TimeTablemain.jsx";
import Gallery from "./components/Gallery/Gallery.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import DepartmentActivitesCalender from "./components/DepartmentActivituesCalender/DepartmentActivitesCalender.jsx";
import Faculity from "./components/People/Faculity.jsx";
import PhdStudents from "./components/People/PhdStudents.jsx";
import Students from "./components/People/Students.jsx";
import Staff from "./components/People/Staff.jsx";
import ResearchArea from "./components/ResearchAndLabs/ResearchArea.jsx";
import ResearchLabs from "./components/ResearchAndLabs/Researchlabs.jsx";
import Projects from "./components/ResearchAndLabs/Projects.jsx";
import Publications from "./components/ResearchAndLabs/Publications.jsx";
import DepartmentLabs from "./components/ResearchAndLabs/DepartmentLabs.jsx";
import SocietiesClubsTeams from "./components/SocietiesClubsTeams/SocietiesClubsTeams.jsx";
import Consultancy from "./components/ResearchAndLabs/Consultancy.jsx";
import Patents from "./components/ResearchAndLabs/Patents.jsx";
import PersonDetials from "./components/People/PersonDetials.jsx";
import LoginForm from "./components/UtilityCompoments/LoginForm.jsx";
import SignupForm from "./components/UtilityCompoments/SignupForm.jsx";
import AdminLayout from "./Layouts/AdminLayout.jsx";
import FacilitiesLayout from "./Layouts/FacilitiesLayout.jsx";
import MainImageSlide from "./components/Admin/MainSlideImages/MainImageSlide.jsx";
import AdminGallery from "./components/Admin/Gallery/AdminGallery.jsx";
import Vision from "./components/Admin/VisionAndMission/Visions.jsx";
import Mission from "./components/Admin/VisionAndMission/Mission.jsx";
import Hod from "./components/Admin/Hod_information/Hod.jsx";
import Page404 from "./components/UtilityCompoments/Page404.jsx";
import Main_information from "./components/Admin/Main_information/Main_information.jsx";
import Department_information from "./components/Admin/Main_information/Department_information.jsx";
import Syllabus from "./components/Admin/Academic/Syllabus.jsx";
import Timetable from "./components/Admin/Academic/Timetable.jsx";
import AcademicCoordinator from "./components/Admin/Academic/AcademicCord.jsx";
import DepartmentActivitesCalendar from "./components/Admin/Academic/DepartmentActivitesCalendar.jsx";
import AdminStudents from "./components/Admin/People/Students.jsx";
import AdminPhdScholars from "./components/Admin/People/PhdScholars.jsx";
import AdminStaff from "./components/Admin/People/Staffs.jsx";
import TopPlacements from "./components/Admin/People/TopPlacements.jsx";
import TopPlacementCard from "./components/Placements/TopPlacementCard.jsx";
import ResearchAreaAdmin from "./components/Admin/ResearchAndLabs/ResearchAreas";
import DepartmentsLabs from "./components/Admin/ResearchAndlabs/DepartmentsLabs.jsx";
import ResearchLabsAdmin from "./components/Admin/ResearchAndlabs/ResearchLabs.jsx";
import ProjectsAdmin from "./components/Admin/ResearchAndlabs/Projects.jsx";
import LabDetails from "./components/ResearchAndLabs/LabDetails.jsx";
import AdminFaculty from "./components/Admin/People/Faculty.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/about/hod-message",
        element: <HodMain />,
      },
      {
        path: "/about/vision",
        element: <VisionAndMissionMain />,
      },
      {
        path: "/about/achievements",
        element: <AchievementMain />,
      },
      {
        path: "/about/infrastructure",
        element: <Gallery />,
      },
      {
        path: "/about/contact",
        element: <ContactMain />,
      },
      {
        path: "/academic/programmes",
        element: <ProgramMain />,
      },
      {
        path: "/academic/coordinators",
        element: <CoordinatorMain />,
      },
      {
        path: "/academic/syllabus",
        element: <SyllabusMain />,
      },
      {
        path: "/academic/timetable",
        element: <TimeTableMain />,
      },
      {
        path: "/academic/calendar",
        element: <DepartmentActivitesCalender />,
      },
      {
        path: "/people/faculty",
        element: <Faculity />,
      },
      {
        path: "/people/phd-scholars",
        element: <PhdStudents />,
      },
      {
        path: "/people/students",
        element: <Students />,
      },
      {
        path: "/people/alumni",
        element: <Faculity />,
      },
      {
        path: "/people/staff",
        element: <Staff />,
      },
      {
        path: "/research/areas",
        element: <ResearchArea />,
      },
      {
        path: "/research/labs",
        element: <DepartmentLabs />,
      },
      {
        path: "/research/publications",
        element: <Publications />,
      },
      {
        path: "/research/projects",
        element: <Projects />,
      },
      {
        path: "/research/consultancy",
        element: <Consultancy />,
      },
      {
        path: "/research/research-labs",
        element: <ResearchLabs />,
      },
      {
        path: "/research/patents",
        element: <Patents />,
      },
      {
        path: "/societies",
        element: <SocietiesClubsTeams />,
      },
      {
        path: "/people/:id",
        element: <PersonDetials />,
      },
      {
        path: "/labs/lab-details/:id",
        element: <LabDetails />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/signup",
        element: <SignupForm />,
      },
      {
        path: "/placements/top-placements",
        element: <TopPlacementCard />,
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  }, //admin routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <Main />,
      },
      {
        path: "/admin/main-image-slide",
        element: <MainImageSlide />,
      },
      {
        path: "/admin/vision",
        element: <Vision />,
      },
      {
        path: "/admin/mission",
        element: <Mission />,
      },
      {
        path: "/admin/gallery",
        element: <AdminGallery />,
      },
      {
        path: "/admin/hod",
        element: <Hod />,
      },
      {
        path: "/admin/main-information",
        element: <Main_information />,
      },
      {
        path: "/admin/department-information",
        element: <Department_information />,
      },
      {
        path: "/admin/academic/syllabus",
        element: <Syllabus />,
      },
      {
        path: "/admin/academic/timetable",
        element: <Timetable />,
      },
      {
        path: "/admin/academic/coordinator",
        element: <AcademicCoordinator />,
      },
      {
        path: "/admin/academic/department-activities-calendar",
        element: <DepartmentActivitesCalendar />,
      },
      {
        path: "/admin/academic/students",
        element: <AdminStudents />,
      },
      {
        path: "/admin/academic/phd-scholars",
        element: <AdminPhdScholars />,
      },
      {
        path: "/admin/academic/staff",
        element: <AdminStaff />,
      },
      {
        path: "/admin/academic/top-placements",
        element: <TopPlacements />,
      },
      {
        path: "/admin/labs/research-areas",
        element: <ResearchAreaAdmin />,
      },
      {
        path: "/admin/labs/departments-labs",
        element: <DepartmentsLabs />,
      },
      {
        path: "/admin/labs/research-labs",
        element: <ResearchLabsAdmin />,
      },
      {
        path: "/admin/labs/projects",
        element: <ProjectsAdmin />,
      },
      {
        path: "/admin/people/faculty",
        element: <AdminFaculty />,
      },
    ],
  },
  {
    path: "/faculty",
    element: <FacilitiesLayout />,
    children: [
      {
        path: "/faculty",
        element: <Main />,
      },
      {},
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
      {/* <App /> */}
    </Provider>
  </StrictMode>
);
