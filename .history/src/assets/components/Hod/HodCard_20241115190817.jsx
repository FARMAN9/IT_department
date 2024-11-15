import React from "react";

const HodCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg shadow-blue-300 p-6 mt-2">
      <div className="flex items-center mb-4">
        <div className=" rounded-full size-40 bg-blue-300 mr-4"></div>
        <h2 className="text-lg text-blue-500 font-bold">
          Dr. Shabir Ahmad Sofi
          <p className="text-sm font-medium"> Head of Department </p>
        </h2>
      </div>
      <div className="flex-col">
        <p>
          Welcome to the Department of Information Technology of NIT srinagar.
          Our Department was established in 2007 offering four year
          undergraduate programme, (B.Tech) in Information Technology. Over the
          years, we have grown our expertise and competence in the core
          Information Technology curriculum and research holding the Institute's
          tradition of excellence as a world-class leader in IT education and
          research. Technology changes rapidly, especially in the field of
          computing, whereas the science, if it changes at all, does so much
          more gradually. Our understanding is that persons who are clear and
          thorough about the fundamentals can adapt to rapid changes in
          technology relatively easily. We want the education imparted to our
          students to be the basis of a life time of learning. Our constant
          pursuit is to help our students achive expertise and competence in the
          core Information Technology curriculum and research. Our Department
          has produced hundreds of professionals and has established a name for
          itself in different fields. Our students have consistently excelled in
          the highly competitive industrial environments. I attribute this
          success to the winning combination of a dedicated faculty that works
          hard at imparting quality education, a well-planned syllabus and last
          but not least, our students.
        </p>
        <button className="bg-blue-600 text-white font-sans w-10 h-hover:cursor shadow-xl shadow-blue-200 hover:bg-blue-700 rounded-lg p-2">
          More
        </button>
      </div>
    </div>
  );
};

export default HodCard;
