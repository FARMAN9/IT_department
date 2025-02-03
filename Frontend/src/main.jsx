import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./components/Main/main.jsx";
import Layout from "./Layout.jsx";
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
        path: "/login",
        element: <LoginForm />,
      },
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
