import React from "react";
import MainCard from "../Activites/MainCard";
import FacultyCard from "../Facultycard/FaclutyCard";
import { Link } from "react-router-dom";

function Faculity() {
  document.title = "Faculity";
  const facultyData = [
    {
      image: "https://via.placeholder.com/100", // Replace with actual image URLs
      name: "Dr Vijay Kumar",
      designation: "Associate Professor & Head",
      email: "vijayk@nitj.ac.in",
    },
    {
      image: "https://via.placeholder.com/100",
      name: "Dr Kusum Bharti",
      designation: "Assistant Professor (Grade-I)",
      email: "bhartik@nitj.ac.in",
    },
    {
      image: "https://via.placeholder.com/100",
      name: "Dr Mohit Kumar",
      designation: "Assistant Professor (Grade-I)",
      email: "kumarmohit@nitj.ac.in",
    },
    {
      image: "https://via.placeholder.com/100",
      name: "Dr Nisha Chaurasia",
      designation: "Assistant Professor (Grade-I)",
      email: "chaurasian@nitj.ac.in",
    },
    {
      image: "https://via.placeholder.com/100",
      name: "Dr Nisha Chaurasia",
      designation: "Assistant Professor (Grade-I)",
      email: "chaurasian@nitj.ac.in",
    },
  ];
  return (
    <MainCard title="Faculity">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {facultyData.map((faculty, index) => (
          <div className="flex flex-wrap">
            <Link
              className="w-full "
              key={index}
              to={`/people/${encodeURIComponent(
                JSON.stringify({
                  name: faculty.name,
                  email: faculty.email,
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
              <FacultyCard
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

export default Faculity;
