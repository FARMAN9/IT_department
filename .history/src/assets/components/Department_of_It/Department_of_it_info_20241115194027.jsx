import React from "react";

function DepartmentOfItInfo() {
  return (
    <div className="mx-auto h-full mt-3 bg-white rounded-lg shadow-lg shadow- overflow-hidden">
      {/* Card Image */}
      <img
        src="https://images.pexels.com/photos/25786569/pexels-photo-25786569/free-photo-of-a-boat-on-a-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Department of IT"
        className="w-full h-48 object-cover"
      />

      {/* Card Content */}
      <div className="p-4">
        <h2
          className="text-4xl font-semibold bg-clip-text text-transparent text-center"
          style={{
            backgroundImage: `url('https://media.tenor.com/ZK8_OgsFSvoAAAAC/blue-galaxy-universe.gif')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
          INFORMATION TECHNOLOGY
        </h2>

        {/* Scrollable Content Section */}
        <div className="text-gray-600 mt-2  overflow-y-auto">
          <p>
            The Department of IT provides an array of educational and technical
            resources to equip students for a career in the tech industry. Lorem
            ipsum dolor sit amet consectetur, adipisicing elit. Nobis similique
            odit excepturi! Nihil pariatur tenetur, voluptates ipsam blanditiis
            esse porro similique praesentium tempore, mollitia provident
            distinctio. Labore sapiente natus libero. Lorem ipsum dolor sit,
            amet consectetur adipisicing elit. Doloremque pariatur error ducimus
            accusantium sunt mollitia assumenda non sit, perferendis repellendus
            quae eaque fuga porro architecto a, asperiores soluta, saepe illum.
          </p>
          <p className="mt-2">
            Our department offers advanced courses in computer science, software
            development, cybersecurity, and more, with hands-on labs and
            internship opportunities.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DepartmentOfItInfo;
