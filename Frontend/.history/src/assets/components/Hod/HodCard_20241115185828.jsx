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
          Established in 2013 with 30 students, now offers 120 B.Tech. seats.
          Introduced M.Tech. in Data Analytics in 2023 with 30 seats.
          Distinguished faculty, diverse learning experiences. Preferred choice
          for prospective students at NIT Jalandhar.
        </p>
        <p>Welcomes young talent who inspire the department.</p>
        <p>Head of Department: Dr. Vijay Kumar</p>
      </div>
    </div>
  );
};

export default HodCard;
