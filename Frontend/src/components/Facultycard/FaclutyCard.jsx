import { Briefcase, Mail } from "lucide-react";
import React from "react";
import NoDP from "../../assets/blankProfile.png";

const FacultyCard = ({ image, name, designation, email, id, children }) => {
  return (
    <div className="card card-compact bg-base-100 w-full shadow-xl transition duration-300 hover:shadow-2xl hover:scale-105 hover:cursor-pointer hover:shadow-blue-500">
      <figure>
        <img
          className="w-60 h-48 object-cover rounded-lg border-2"
          src={image ? image : NoDP}
          alt={name}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-[#0D9488] font-bold text-center">
          {name}
        </h2>
        {designation ? (
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-gray-500" />
            {designation}
          </p>
        ) : (
          <></>
        )}
        <a
          className="text-blue-500 hover:text-blue-700 flex items-center gap-2"
          href={`mailto:${email}`}
        >
          <Mail className="w-5 h-5 text-blue-500" />
          {email}
        </a>
        <div className="card-actions">{children}</div>
      </div>
    </div>
  );
};

export default React.memo(FacultyCard);
