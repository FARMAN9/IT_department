import React from "react";

const HodCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg shadow-blue-300 p-6 mt-2">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-300 mr-4"></div>
        <div>
          <h2 className="text-lg text-blue-500 font-bold">
            Dr. Shabir Ahmad Sofi
          </h2>
          <p className="text-sm font-medium text-gray-600">
            Head of Department
          </p>
        </div>
      </div>
      <div className="m-4 items-center grid">
        <p className="text-gray-700 mb-4">
          Welcome to the Department of Information Technology of NIT Srinagar.
          Our department was established in 2007, offering a four-year
          undergraduate program (B.Tech) in Information Technology. Over the
          years, we have grown our expertise and competence in the core
          Information Technology curriculum and research, holding the
          Institute's tradition of excellence as a world-class leader in IT
          education and research. Technology changes rapidly, especially in
          computing, while the science, if it changes at all, does so more
          gradually. We believe that those with a strong understanding of the
          fundamentals can adapt to rapid changes in technology relatively
          easily. We want the education imparted to our students to be the basis
          of a lifetime of learning. Our constant pursuit is to help our
          students achieve expertise and competence in the core Information
          Technology curriculum and research. Our department has produced
          hundreds of professionals and has established a reputation in various
          fields. Our students have consistently excelled in highly competitive
          industrial environments. This success is attributed to a dedicated
          faculty, a well-planned syllabus, and our hardworking students.
        </p>
        <button className="bg-blue-600 text-white font-sans h-10 px-4 hover:cursor-pointer shadow-lg shadow-blue-200 hover:bg-blue-700 rounded-lg">
          Read more
        </button>
      </div>
    </div>
  );
};

export default HodCard;
