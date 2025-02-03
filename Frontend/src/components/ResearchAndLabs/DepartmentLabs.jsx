import React from "react";
import MainCard from "../Activites/MainCard";
import LabCard from "../Activites/LabCard";
import { Link } from "react-router-dom";

function DepartmentLabs() {
  const facultyData = [
    {
      image: "https://via.placeholder.com/100", // Replace with actual image URLs
      name: "IOT Lab",
      Incharge: "Associate Professor & Head",
      email: "vijayk@nitj.ac.in",
      discription:
        "The IoT Lab is focused on developing and implementing IoT applications using sensor data, machine learning, and cloud computing.",
      labmenu: "",
    },
    {
      image: "https://via.placeholder.com/100", // Replace with actual image URLs
      name: "Cyber Security Lab",
      Incharge: "Associate Professor & Head",
      email: "vijayk@nitj.ac.in",
      discription:
        "The Cyber Security Lab is focused on developing and implementing Cyber Security applications using sensor data, machine learning, and cloud computing.",
      labmenu: "",
    },
  ];
  return (
    <MainCard title="Department Labs">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {facultyData.map((faculty, index) => (
          <div className="flex flex-wrap">
            <Link
              className="w-full "
              key={index}
              to={`/people/${encodeURIComponent(
                JSON.stringify({
                  name: faculty.name,
                  email: faculty.Incharge,
                  designation: faculty.designation,
                  image: faculty.image,
                })
              )}`}
              replace
              state={{
                name: faculty.name,
                email: faculty.email,
                designation: faculty.designation,
                image: faculty.image,
              }}
            >
              <LabCard
                image={faculty.image}
                name={faculty.name}
                designation={faculty.designation}
                email={faculty.email}
              />
            </Link>
          </div>
        ))}
      </div>
    </MainCard>
  );
}

export default DepartmentLabs;
