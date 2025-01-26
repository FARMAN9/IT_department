import { Link } from "lucide-react";
import React from "react";

const FacultyCard = ({ image, name, designation, email, id }) => {
  console.log(image, name, designation, email, id);
  return (
    <div className="card card-compact bg-base-100 w-full shadow-xl">
      <figure>
        <img
          src={
            image ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{designation}</p>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default React.memo(FacultyCard);
