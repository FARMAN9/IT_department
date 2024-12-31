import React from "react";

const HodCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg shadow-blue-300 p-6 mt-2">
      <div className="flex items-center mb-4">
        <div className=" rounded-full size-40 bg-blue-300 mr-4"></div>
        <h2 className="text-lg text-blue-500 font-bold">
          Dr. Shabir
          <p className="text-sm font-medium"> Head of Department </p>
        </h2>
      </div>
      <div className="flex-col">
        <p>
          The Department of Information Technology was established in 2007,
          offering four year undergraduate programme (B.Tech) in Information
          Technology. This undergraduate programme is of 4 years duration with
          the first year spread over two semesters which is common to all the
          branches. The intake capacity of the department was 40 in 2007 and
          then subsequently increased to 55 in 2009. The Department offers a
          broad curriculum including: Database Management, Software Engineering,
          Management of Information Systems, Data mining, Computer Graphics,
          Advanced Internet Technology, Computer Networks, Operating System,
          Data Structures and Algorithms as the main courses and other courses
          in collaboration with the other departments of the institute at the
          undergraduate level. The Department of Information Technology embodies
          the Institute's tradition of excellence as a world-class leader in IT
          education and research. IT sector is in a period of bloom in terms of
          growth and opportunity. In the current ever evolving industrial
          scenario contents delivered to the students are regularly updated by
          the faculty members who have themselves are well acquainted with path
          breaking research and innovations in the present technology-oriented
          world. In addition to academic courses, the department also has IT
          research programmes supported through government funding and industry
          sponsorship. Faculty research helps expand the current and future use
          of new and existing technologies.
        </p>
      </div>
    </div>
  );
};

export default HodCard;
