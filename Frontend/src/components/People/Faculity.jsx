import React from "react";
import MainCard from "../Activites/MainCard";
import FacultyCard from "../Facultycard/FaclutyCard";
import { Link } from "react-router-dom";
import NoDP from "../../assets/blankProfile.png";

function Faculity() {
  document.title = "Faculity";
  const facultyData = [
    {
      image: "", // Replace with actual image URLs
      name: "Dr Vijay Kumar",
      designation: "Associate Professor & Head",
      email: "vijayk@nitj.ac.in",
    },
    {
      image: "",
      name: "Dr Kusum Bharti",
      designation: "Assistant Professor (Grade-I)",
      email: "bhartik@nitj.ac.in",
    },
    {
      image: "",
      name: "Dr Saniya Malik  ",
      designation: "Assistant Professor (Grade-I)",
      email: "kumarmohit@nitj.ac.in",
    },
    {
      image: "",
      name: "Dr Nisha Chaurasia",
      designation: "Assistant Professor (Grade-I)",
      email: "chaurasian@nitj.ac.in",
    },
    {
      image:
        "https://images.unsplash.com/photo-1566438480900-0609be27a4be?q=80&w=1988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
                image={faculty.image === "" ? NoDP : faculty.image}
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
