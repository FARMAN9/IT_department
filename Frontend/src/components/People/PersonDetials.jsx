import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import MainCard from "../Activites/MainCard";
import { FaFilePdf } from "react-icons/fa6";
import Table from "../Activites/Table";
import { Link } from "react-router-dom";

function PersonDetials() {
  const { id } = useParams();
  const location = useLocation();
  const name = location.state?.name;
  const designation = location.state?.designation;
  const email = location.state?.email;
  const image = location.state?.image;
  document.title = name;
  const favicon = document.querySelector("link[rel='icon']");
  favicon.href = image || "/favicon.ico";

  console.log(image, name, designation, email, id);

  const handleLogin = () => {
    // Implement login functionality here
    console.log("Login clicked");
  };
  const NavData = [
    "Personal Details",
    "Profile Links",
    "Research Profile",
    "Journal Publications",
    "Conference Publications",
    "Book/Chapter Publications",
    "Research Projects",
    "Research Collaboration",
    "Consultancy",
    "Events Organized",
    "Professional Affiliations",
    "PhD Supervised",
    "PG Dissertation Guided",
    "Patents/IPR",
    "Admin. Responsiblities",
    "Award and Honours",
  ];
  const [onClick, setOnClick] = useState(0);

  const handleTabClick = (index) => {
    setOnClick(index);
  };

  return (
    <MainCard title={name}>
      <div className="flex">
        <div className="card card-side  bg-base-100 w-full shadow-xl transition duration-300 flex flex-col md:flex-row lg:flex-row  xl:flex-row">
          <figure className="">
            <img
              className=" h-60 w-60 object-cover"
              src={
                image ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              loading="lazy"
              alt={name}
              decoding="async"
              draggable="false"
              fetchpriority="high"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold">{name}</h2>
            <h3 className="text-lg ">{designation}</h3>
            <p>{email}</p>
          </div>
          <div className="card-body lg:absolute lg:bottom-0 lg:right-0 sm:flex sm:flex-row lg:flex lg:flex-row ">
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md btn-error hover:bg-red-300">
              <FaFilePdf size={"auto"} color="white" />
            </button>
            <Link
              to="/login"
              state={{
                from: "Faculty login",
              }}
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md bg-blue-500 text-white hover:border-blue-600 hover:bg-blue-200 "
            >
              login
            </Link>
          </div>
        </div>
      </div>

      <div
        role="tablist"
        className="tabs tabs-boxed flex flex-wrap gap-2 mt-2 font-medium"
      >
        {NavData.map((tab, i) => (
          <a
            key={i}
            role="tab"
            className={`tab border border-base-800 hover:bg-base-200 hover:border-base-300  hover:text-base-800  ${
              onClick === i ? "tab-active" : ""
            }`}
            onClick={() => handleTabClick(i)}
          >
            {tab}
          </a>
        ))}
      </div>
      <Table title={NavData[onClick]}></Table>
    </MainCard>
  );
}

export default PersonDetials;
