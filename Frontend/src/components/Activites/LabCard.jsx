import React from "react";

function LabCard({ image, name }) {
  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl hover:shadow-2xl hover:scale-105 hover:cursor-pointer hover:shadow-blue-500">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p></p>
      </div>
    </div>
  );
}

export default LabCard;
