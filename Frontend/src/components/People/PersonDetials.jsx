import React from "react";
import { useParams, useLocation } from "react-router-dom";
import MainCard from "../Activites/MainCard";

function PersonDetials() {
  document.title = "Person Detials";
  const { id } = useParams();
  const location = useLocation();
  const name = location.state?.name;
  const designation = location.state?.designation;
  const email = location.state?.email;
  const image = location.state?.image;
  console.log(image, name, designation, email, id);

  return (
    <MainCard title={name}>
      <div className="flex">
        <div className="card card-side bg-base-100 shadow-xl">
          <figure className="h-48 w-48">
            <img
              className="object-cover h-full w-full"
              src={
                image ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt={name}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold">{name}</h2>
            <h3 className="text-lg ">{designation}</h3>
            <p>{email}</p>
          </div>
        </div>
      </div>
    </MainCard>
  );
}

export default PersonDetials;
