import React from "react";

function LabCard({ image, name, Incharge, email }) {
  return (
    <div className="card card-compact bg-base-100 w-full shadow-xl transition duration-300 hover:shadow-2xl hover:scale-105 hover:cursor-pointer hover:shadow-blue-500 ">
      <figure>
        <img
          className="w-48 h-48 object-cover"
          src={
            image === ""
              ? "https://www.contactpointe.com/wp-content/uploads/2013/08/computer-lab-rental1.png"
              : image
          }
          alt={name}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p> Incharge: {Incharge}</p>
        <p> Email: {email}</p>
      </div>
    </div>
  );
}

export default LabCard;
