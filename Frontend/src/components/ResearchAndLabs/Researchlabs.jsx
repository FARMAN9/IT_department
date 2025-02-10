import React from "react";
import MainCard from "../Activites/MainCard";
import LabCard from "../Activites/LabCard";
import { Link } from "react-router-dom";

function Researchlabs() {
  document.title = "Research Labs";

  const labsData = [
    {
      image: "",
      name: "IOT Lab",
      Incharge: "Associate Professor & Head",
      email: "vijayk@nitj.ac.in",
      discription:
        "The IoT Lab is focused on developing and implementing IoT applications using sensor data, machine learning, and cloud computing.",
      labmenu: "",
    },
    {
      image: "",
      name: "Cyber Security Lab",
      Incharge: "Associate Professor & Head",
      email: "vijayk@nitj.ac.in",
      discription:
        "The Cyber Security Lab is focused on developing and implementing Cyber Security applications using sensor data, machine learning, and cloud computing.",
      labmenu: "",
    },
  ];
  return (
    <MainCard title="Research Labs">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {labsData.map((lab, index) => (
          <div className="w-full ">
            <LabCard
              key={index}
              image={lab.image}
              name={lab.name}
              Incharge={lab.Incharge}
              email={lab.email}
              discription={lab.discription}
              labmenu={lab.labmenu}
            />
          </div>
        ))}
      </div>
    </MainCard>
  );
}

export default Researchlabs;
