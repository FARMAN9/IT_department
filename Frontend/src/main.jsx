import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Main from './assets/components/Main/main.jsx';
import Layout from './Layout.jsx';
import HodMain from './assets/components/Main/HODMain.jsx';
import VisionAndMissionMain from './assets/components/Main/VisionAndMissionMain.jsx';
import AchievementMain from './assets/components/Main/AchievementMain.jsx';
import ContactMain from './assets/components/Main/ContactMain.jsx';
import ProgramMain from './assets/components/Main/ProgramesMain.jsx';
import CoordinatorMain from './assets/components/Main/CoordinatorMain.jsx';
import SyllabusMain from './assets/components/Main/SyllabusMain.jsx';
import TimeTableMain from './assets/components/Main/TimeTablemain.jsx';
import FacultyList from './assets/components/Main/facultymain.jsx';
import PublishMain from './assets/components/Main/PublishMain.jsx';
import ResearchAreas from './assets/components/Main/ResearchAreaMain.jsx';
import Studentmain from './assets/components/Main/studentMain.jsx';
import Gallery from './assets/components/Gallery/Gallery.jsx';
import {Provider} from "react-redux";
import {store} from "./redux/store.js";

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
        path:"/about/vision",
        element: <VisionAndMissionMain />,
      }
      ,
      {
        path:"/about/achievements",
        element: <AchievementMain/>,
      },
      {
        path:"/about/infrastructure",
        element: <Gallery />,
      },
      {
        path:"/about/contact",
        element: <ContactMain />,
      }
      ,
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
        element: <VisionAndMissionMain />,
      },
      {
        path: "/people/faculty",
        element: <FacultyList />,
      },
      {
        path: "/people/phd-scholars",
        element:  <FacultyList />,
      },
      {
        path: "/people/students",
        element: <Studentmain/>,
      },
      {
        path: "/people/alumni",
        element: <TimeTableMain />,
      },
      {
        path: "/people/staff",
        element: <FacultyList />,
      },
      {
        path: "/research/areas",
        element: <ResearchAreas />,
      },
      {
        path: "/research/labs",
        element: <ResearchAreas />,
      },
      {
        path: "/research/publications",
        element: <PublishMain />,
      },
      {
        path: "/research/projects",
        element: <VisionAndMissionMain />,
      },
      {
        path: "/research/consultancy",
        element: <VisionAndMissionMain />,
      },
      {
        path: "/research/research-labs",
        element: <VisionAndMissionMain />,
      },
      {
        path: "/research/patents",
        element: <VisionAndMissionMain />,
      },
      {
        path: "/societies",
        element: <VisionAndMissionMain />,
      },



    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
    <RouterProvider router={router}
    future={{
      v7_startTransition: true}} />
    {/* <App /> */}
    </Provider>
  </StrictMode>,
)
