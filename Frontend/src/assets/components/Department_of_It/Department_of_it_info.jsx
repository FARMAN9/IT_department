import React from "react";

function DepartmentOfItInfo() {
  return (
    <div className="mx-3 w-auto pt-3 h-full bg-white rounded-lg shadow-md">
      {/* Card Image */}
      <img
        src="/api/placeholder/1260/380"
        alt="Department of IT"
        className="w-full h-96 rounded-lg object-cover"
      />

      {/* Card Content */}
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          INFORMATION TECHNOLOGY
        </h2>

        {/* Scrollable Content Section */}
        <div className="text-gray-700 text-sm sm:text-base lg:text-lg mt-6 max-h-96 overflow-y-auto no-bar">
          <p>
            The Department of IT provides an array of educational and technical
            resources to equip students for a career in the tech industry. Lorem
            ipsum dolor sit amet consectetur, adipisicing elit. Nobis similique
            odit excepturi! Nihil pariatur tenetur, voluptates ipsam blanditiis
            esse porro similique praesentium tempore, mollitia provident
            distinctio. Labore sapiente natus libero.
          </p>
          <p className="mt-2">
            Our department offers advanced courses in computer science, software
            development, cybersecurity, and more, with hands-on labs and
            internship opportunities. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Dignissimos iusto, aspernatur quo aut hic itaque
            reiciendis repellendus ipsa sint corporis eius ratione totam
            sapiente, molestiae provident. Reiciendis consectetur iure in.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DepartmentOfItInfo;