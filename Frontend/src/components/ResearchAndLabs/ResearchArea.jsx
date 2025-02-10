import React from "react";
import MainCard from "../Activites/MainCard";
import { Link } from "react-router-dom";
import LabCard from "../Activites/LabCard";

function ResearchArea() {
  document.title = "Research Area";
  const researchAreas = [
    {
      name: "Area 1",
      Incharge: "Incharge 1",
      designation: "Designation 1",
      email: "email 1",
      image: "https://placehold.co/600x400",
    },
    {
      name: "Area 2",
      Incharge: "Incharge 2",
      designation: "Designation 2",
      email: "email 2",
      image: "https://placehold.co/600x400",
    },
    {
      name: "Area 3",
      Incharge: "Incharge 3",
      designation: "Designation 3",
      email: "email 3",
      image: "https://placehold.co/600x400",
    },
  ];

  return (
    <MainCard title="Research Area">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {researchAreas.map((faculty, index) => (
          <div className="w-full ">
            <Link
              className=""
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
                Incharge={faculty.Incharge}
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

export default ResearchArea;
