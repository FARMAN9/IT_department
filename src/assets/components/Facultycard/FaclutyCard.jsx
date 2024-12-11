import React from 'react';

const FacultyCard = ({ image, name, designation, email }) => {
  return (
    <div className="w-full md:w-1/3 lg:w-1/4 p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-24 h-24 mx-auto mt-4 rounded-full object-cover"
        />
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500">{designation}</p>
          <a
            href={`mailto:${email}`}
            className="block mt-2 text-blue-500 text-sm underline"
          >
            {email}
          </a>
          <a
            href="#"
            className="block mt-2 text-blue-600 text-sm font-medium"
          >
            View Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default FacultyCard;
