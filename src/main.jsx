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
        element: <VisionAndMissionMain />,
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
        element: <VisionAndMissionMain />,
      },
      {
        path: "/people/phd-scholars",
        element: <VisionAndMissionMain />,
      },
      {
        path: "/people/students",
        element: <VisionAndMissionMain />,
      },
      {
        path: "/people/alumni",
        element: <TimeTableMain />,
      },
      {
        path: "/people/staff",
        element: <VisionAndMissionMain />,
      },
      {
        path: "/research/areas",
        element: <VisionAndMissionMain />,
      },
      {
        path: "/research/labs",
        element: <VisionAndMissionMain />,
      },
      {
        path: "/research/publications",
        element: <VisionAndMissionMain />,
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
    <RouterProvider router={router}
    future={{
      v7_startTransition: true}} />
    {/* <App /> */}
  </StrictMode>,
)
