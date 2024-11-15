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
          the first year spread over
        </p>
      </div>
    </div>
  );
};

export default HodCard;
