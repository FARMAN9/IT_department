import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Main from './assets/components/Main/main.jsx';
import Layout from './Layout.jsx';
import HodMain from './assets/components/Main/HODMain.jsx';
import VisionAndMissionMain from './assets/components/Main/VisionAndMissionMain.jsx';


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
        element: <VisionAndMissionMain />,
      },
      {
        path:"/about/infrastructure",
        element: <VisionAndMissionMain />,
      },
      {
        path:"/about/contact",
        element: <VisionAndMissionMain />,
      }
      ,
      {
        path: "/academic/programmes",
        element: <VisionAndMissionMain />,
      },
      {
        path: "/academic/coordinators",
        element: <VisionAndMissionMain />,
      },
      {
        path: "/academic/syllabus",
        element: <VisionAndMissionMain />,
      },
      {
        path: "/academic/timetable",
        element: <VisionAndMissionMain />,
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
        element: <VisionAndMissionMain />,
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
    <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>,
)
